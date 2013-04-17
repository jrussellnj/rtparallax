<html>
<head>

    <title>RT+Parallax Demo</title>

    <!-- jQuery 1.9.1 -->
    <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>

    <!-- jQuery easing plugin -->
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>

    <!-- The RT+Parallax plugin -->
    <script type="text/javascript" src="js/rtparallax.js"></script>

    <script type="text/javascript">
    $(document).ready(function() {
        var parallaxingdiv = $('#parallaxingdiv').rtparallax({
            'images': [ '/images/timeline-bg1.jpg', '/images/timeline-bg2.png', '/images/timeline-bg3.png' ],
            'height': 400,
            'slideDistance': [ 784, 671, 535, 864, 1090, 865, 468, 664, 778, 1097, 757, 584, 896 ],
			'speed': 1250,
            'width': 1024,
			'onLoadComplete': function() {
				
				var _this = this;

				// This is how the pagination is set up for our year range clickable tags. It is a mapping for
				// those tags to the first page in the range in the slider.
				var yearRangeToPages = [ 0, 4, 5, 9, 12 ];

				$('.rtp-by-year').click(function(ev) {
					ev.preventDefault();

					var thisIndex = $(this).parent().children().index(this);
					_this.slideToPage(yearRangeToPages[thisIndex]);
				});
			}
         });
    });
    </script>
</head>

<body>
    <div id="parallaxingdiv"></div>

    <div style="width: 1024px; margin-top: 25px; text-align: center;">
        <a href="#" class="rtp-prev">&laquo; Previous</a>
        <a href="#" class="rtp-next">Next &raquo;</a>
    </div>

    <div style="width: 1024px; margin-top: 25px; text-align: center;">
        <a href="#" class="rtp-by-year">1996 - 1998</a>
        <a href="#" class="rtp-by-year">1999 - 2001</a>
        <a href="#" class="rtp-by-year">2002 - 2005</a>
        <a href="#" class="rtp-by-year">2006 - 2010</a>
        <a href="#" class="rtp-by-year">2011 - 2013</a>
    </div>

    <div id="pagination"> </div>
</body>
</html>
