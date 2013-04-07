// RT + Parallax; A lightweight plugin that sets up the bare minimum HTML structure necessary for turning an 
// empty block-level element into a parallaxing window with public methods for binding to your own HTML elements.
//
// Written for Red Tettemer + Partners by Joseph Russell
; (function($) {

    $.fn.rtparallax = function(options) {

        /* ---------- Private internal variables */

        // The default options
        var _defaults = {
            'images': [],
            'height': 300,
            'width': '100%'
        };

        // Overwrite the default options with any user-provided options
        var _options = $.extend({}, _defaults, options);

        // The HTML element the plugin was called on
        var _element = this;


        /* ---------- Internal methods */

        // Set up the initial plugin structure
        var initialize = function() { 
        
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
                        $('<div></div>', { 'id': 'rtp-bg1' })
                            .css({ 
                                'background': "url('" + value + "') top left no-repeat",
                                'height': rtpcontainer.height() + 'px',
                                'left': 0,
                                'position': 'absolute',
                                'top': 0,
                                'width': '100%'
                            })
                    );
            });
        };


        /* ---------- Publicly-available methods */

        // Slide everything to the right
        this.slideRight = function() { };

        // Slide everything to the left
        this.slideLeft = function() { };


        /* ---------- Initialize the plugin */
        initialize();


        /* ---------- Return this object so people can actually call our methods */
        return this;
    }
})(jQuery);
