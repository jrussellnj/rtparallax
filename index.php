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
            'width': 1024
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

    <div id="pagination"> </div>
</body>
</html>
