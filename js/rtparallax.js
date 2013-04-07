// RT + Parallax; A lightweight plugin that sets up the bare minimum HTML structure necessary for turning an 
// empty block-level element into a parallaxing window with public methods for binding to your own HTML elements.
//
// Written for Red Tettemer + Partners by Joseph Russell
; (function($) {

    $.fn.rtparallax = function(options) {

        /* ---------- Private internal variables */

        // The default options
        var _defaults = { };

        // Overwrite the default options with any user-provided options
        var _options = $.extend({}, _defaults, options);

        // The HTML element the plugin was called on
        var _element = this;


        /* ---------- Internal methods */

        // Set up the initial plugin structure
        var initialize = function(options) { };


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
