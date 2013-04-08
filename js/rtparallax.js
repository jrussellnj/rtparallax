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

				// The amount of time the animation will take (in milliseconds)
				'speed': 1000,

				// A default width of 100%
				'width': '100%'
			};

			// Overwrite the default options with any user-provided options
			var _options = $.extend({}, _defaults, options);

			// The HTML element the plugin was called on
			var _element = element;

			// The number of "pages" the scroller will have, i.e., how many times we need 
			// to slide to see the entire image furthest in the background
			var _pages = 1;

			// What the current "page" of the slider is
			var _currentPage = 1

			var _this = this;


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

				// Get the size of the image the furthest in the background to use 
				// as the basis for how many pages there are in the slider
				var tempImage = new Image();
				tempImage.src = _options.images[0];
				_pages = Math.ceil(tempImage.width / $('#rtp-container').width());

				// Bind the next and previous buttons to sliding left and right
				_options.nextButton.bind('click', function(ev) {
					ev.preventDefault();
					_this.slideRight();
				});

				_options.prevButton.bind('click', function(ev) {
					ev.preventDefault();
					_this.slideLeft();
				});
			};

			// Calculate how far to slide the images in the given direction and then carry out the slide
			var _slide = function(direction) {

				// The pixel width of the element that contains the divs whose images we want to slide
				var amountToSlide = $('#rtp-container').width();

				// Slide each image in the parallax containing element to the right, increasing
				// the speed by double as we get closer to the top layer.
				$('#rtp-container').children().each(function(index, element) {

					// Get the image to slide and its current left margin
					var thisImage = $('img', this);
					var currentLeftMargin = parseInt(thisImage.css('margin-left').replace("px", ""));

					// Figure out what the new margin to slide to should be based on which direction we're sliding
					if (direction == 'right') {
						if (_currentPage == _pages) {
							var newMarginToSlideTo = 0;
						}
						else {
							var newMarginToSlideTo = (currentLeftMargin - parseInt(amountToSlide * (index + 1)));
						}
					}
					else {
						if (_currentPage == 1) {
							var newMarginToSlideTo = (thisImage.width() - _options.width) * -1;
						}
						else {
							var newMarginToSlideTo = (currentLeftMargin == 0) ? 0 : (currentLeftMargin + parseInt(amountToSlide * (index + 1)));
						}
					}

					// Carry out the sliding animation
					thisImage.animate({ 'margin-left': newMarginToSlideTo + 'px' }, _options.speed, 'jswing');
				});

				// Update the current page
				if (direction == 'right') {
					if (_currentPage < _pages) {
						_currentPage++;
					}
					else {
						_currentPage = 1;
					}
				}
				else {
					if (_currentPage > 1) {
						_currentPage--;
					}
					else {
						_currentPage = _pages;
					}
				}
			};


			/* ---------- Publicly-available methods */

			// Slide everything to the right
			this.slideRight = function() {
				_slide('right');
			}

			// Slide everything to the left
			this.slideLeft = function() {
				_slide('left');
			}

			/* ---------- Initialize the plugin */
			_initialize();
		}

		/* ---------- Return this object so people can actually call our methods */
		return new RTParallax(this, options);
    }
})(jQuery);
