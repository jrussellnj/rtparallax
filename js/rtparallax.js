// RT + Parallax; A lightweight plugin that sets up the bare minimum HTML structure necessary for turning an 
// empty block-level element into a parallaxing window with public methods for binding to your own HTML elements.
//
// Written for Red Tettemer + Partners by Joseph Russell
; (function($) {

    $.fn.rtparallax = function(options) {

		// Constructor for the RTParallax object
		function RTParallax(element, options) {

			/* ---------- Private internal variables */

			// The default options
			var _defaults = {

				// The images to parallax slide through in the element. The earlier an image appears
				// in the array, the further into the background it is inside.
				'images': [],

				// A default height of 300px
				'height': 300,

				// By default, the next and previous buttons will be any
				// element with the class "rtp-next" and "rtp-prev"
				'nextButton': $('.rtp-next'),
				'prevButton': $('.rtp-prev'),

				// This gets called after slider initialization
				'onLoadComplete': $.noop,

				// This gets called right before a call to _slide occurs
				'onSlideBegin': $.noop,

				// This gets called after a slide has completed
				'onSlideComplete': $.noop,

				// How far in pixels to slide each time the next or previous button is hit
				'slideDistance': '',

				// The amount of time the animation will take (in milliseconds)
				'speed': 1000,

				// A default width of 100%
				'width': '100%'
			};

			// Overwrite the default options with any user-provided options
			var _options = $.extend({}, _defaults, options);

			// The HTML element the plugin was called on
			var _element = element;

			// The width of the furthest down image, used in various calculations below
			var _backgroundImageWidth = 0;

			// Used to resolve the correct scope inside the methods below
			var _this = this;


			/* ---------- Publicly available variables */

			// The number of "pages" the scroller will have, i.e., how many times we need 
			// to slide to see the entire image furthest in the background
			this.pages = 1;

			// What the current "page" of the slider is
			this.currentPage = 1


			/* ---------- Internal methods */

			// Set up the initial plugin structure
			var _initialize = function() {
			
				// Apply base level default CSS styling to the div
				_element.css({
					'height': _options.height,
					'width': _options.width
				});

				// Create an HTML structure to be used for the parallax div
				var newStructure = 
					$('<div></div>', { 'id': 'rtp-container' })
						.css({ 
							'height': '100%',
							'position': 'relative'
						});

				// Empty out the div and append the structure created above
				_element.empty().append(newStructure);

				// Add in the images to the container div
				var rtpcontainer = $('#rtp-container', _element);

				$.each(_options.images, function(index, value) {
					rtpcontainer
						.append(
							$('<div></div>', { 'id': 'rtp-bg' + (index + 1) })
								.css({ 
									'height': rtpcontainer.height() + 'px',
									'left': 0,
									'overflow': 'hidden',
									'position': 'absolute',
									'top': 0,
									'width': '100%'
								})
								.append($('<img></img>', { 'src': value }))
						);
				});

				// Figure out the number of "pages" in the slider based either on the distance to slide
				// that the user provided or, if that wasn't specified, the width of the background image
				var tempImage = new Image();
				tempImage.src = _options.images[0];
				_backgroundImageWidth = tempImage.width;

				if (_options.slideDistance != '') {
					_this.pages = Math.ceil(_backgroundImageWidth / _options.slideDistance);
				}
				else {
					_this.pages = Math.ceil(_backgroundImageWidth / $('#rtp-container').width());
				}

				// Bind the next and previous buttons to sliding left and right
				_options.nextButton.bind('click', function(ev) {
					ev.preventDefault();
					_this.slideRight();
				});

				_options.prevButton.bind('click', function(ev) {
					ev.preventDefault();
					_this.slideLeft();
				});

				// If the user has provided a function to call after initialization, call it here
				_options.onLoadComplete.call(_this);
			};

			// Calculate how far to slide the images in the given direction and then carry out the slide
			var _slide = function(direction) {

				// If the user has provided a function to call before the slide begins, call it here
				_options.onSlideBegin.call(_this);

				// Either the pixel width of the element that contains the divs whose images 
				// we want to slide or the value in pixels that was provided by the user
				var amountToSlide = _options.slideDistance ? _options.slideDistance : $('#rtp-container').width();

				// Cache the parallax container for use below
				var rtpcontainer = $('#rtp-container');

				// Slide each image in the parallax containing element to the right, increasing
				// the speed by double as we get closer to the top layer.
				rtpcontainer.children().each(function(index, element) {

					// Get the image to slide and its current left margin
					var thisImage = $('img', this);
					var currentLeftMargin = parseInt(thisImage.css('margin-left').replace("px", ""));

					// Figure out what the new margin to slide to should be based on which direction we're sliding
					if (direction == 'right') {
						if (_this.currentPage == _this.pages) {
							var newMarginToSlideTo = 0;
						}
						else {
							var newMarginToSlideTo = (currentLeftMargin - parseInt(amountToSlide * (index + 1)));

							// Make sure the right side of the furthest down background image won't slide past the right side of the container
							if (((Math.abs(newMarginToSlideTo) + rtpcontainer.width()) > _backgroundImageWidth) && (index == 0)) {
								var newMarginToSlideTo = (_backgroundImageWidth - rtpcontainer.width()) * (index + 1) * -1;
							} 
						}
					}
					else {
						if (_this.currentPage == 1) {
							var newMarginToSlideTo = (thisImage.width() - (!isNaN(_options.width) ? _options.width : rtpcontainer.width())) * -1;
						}
						else {
							var newMarginToSlideTo = (currentLeftMargin == 0) ? 0 : (currentLeftMargin + parseInt(amountToSlide * (index + 1)));

							// Make sure the left side of both images are flush up against the left side of the container if we're sliding
							// an uneven amount of pixels back to the left
							if ((currentLeftMargin < 0) && (newMarginToSlideTo > 0)) {
								newMarginToSlideTo = 0;
							}
						}
					}

					// Carry out the sliding animation
					thisImage.stop(true, true).animate( { 'margin-left': newMarginToSlideTo + 'px' }, _options.speed, 'jswing', function() { _options.onSlideComplete.call(_this) });
				});

				// Update what the current page is
				if (direction == 'right') {
					if (_this.currentPage < _this.pages) {
						_this.currentPage++;
					}
					else {
						_this.currentPage = 1;
					}
				}
				else {
					if (_this.currentPage > 1) {
						_this.currentPage--;
					}
					else {
						_this.currentPage = _this.pages;
					}
				}
			};


			/* ---------- Publicly-available methods */

			// Slide everything to the right
			this.slideRight = function() {
				if (!$('#rtp-container').find('img:animated').length) {
					_slide('right');
				}
			}

			// Slide everything to the left
			this.slideLeft = function() {
				if (!$('#rtp-container').find('img:animated').length) {
					_slide('left');
				}
			}

			/* ---------- Initialize the plugin */
			_initialize();
		}

		/* ---------- Return this object so people can actually call our methods */
		return new RTParallax(this, options);
    }
})(jQuery);
