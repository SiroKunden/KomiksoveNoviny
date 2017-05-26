(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    });
    
    $( document ).ready(function() {
        
        setInterval(updateRealese, 1000);

        function updateRealese() {
            var releaseDate = new Date();
            releaseDate.setDate(releaseDate.getDate() + (1 + 7 - releaseDate.getDay()) % 7);
            releaseDate.setHours(20);
            releaseDate.setMinutes(0);
            releaseDate.setSeconds(0);
            var diff = Math.abs(releaseDate - new Date());
            diff = diff / 1000;
            var days = Math.floor(diff / 86400);
            diff = diff - (days * 86400);
            var hours = Math.floor(diff / 3600);
            diff = diff - (hours * 3600);
            var minutes = Math.floor(diff / 60);
            diff = diff - (minutes * 60);
            var seconds = Math.floor(diff);
           
            $("#releaseDate").text(days + "d " + hours + "h " + minutes + "m " + seconds + "s");
        }
        
    });

})(jQuery); // End of use strict
