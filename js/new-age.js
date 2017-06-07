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
    
    $( document ).ready(function() {
        
        for(var i = 0; i < comicsDownloaded.length; i++) {
            $("#comicsBody").append('<tr><td><img src="https://comicsdb.cz' + comicsDownloaded[i].cover + '" height="100px" /></td><td>' + comicsDownloaded[i].url + '</td><td><a href="https://comicsdb.cz/' + comicsDownloaded[i].url + '" target="_blank">' + comicsDownloaded[i].name + '</a></td><td>' + comicsDownloaded[i].price + '</td><td>' + comicsDownloaded[i].publisher + '</td><td>' + comicsDownloaded[i].publish + '</td><td>' + comicsDownloaded[i].type + '</td><td>' + comicsDownloaded[i].format + '</td><td>' + comicsDownloaded[i].pages + '</td></tr>');
        }
        
        var t = $('#comics').DataTable({
            responsive: true,
            "order": [[ 1, "desc" ]],
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Czech.json"
            },
            'sDom': '<"top"f>t<"bottom"p>'
        });
        
        var column = t.column(1);
        column.visible(! column.visible());
        
        var t = $('#harmonogram-table').DataTable({
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.childRowImmediate,
                    type: ''
                }
            },
            "order": [],
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Czech.json"
            },
            'sDom': 't'
        });
        
        setInterval(updateRealese, 1000);

    });

})(jQuery); // End of use strict

function getContentTypeOfUrl(url, find, index, callbackFnc) {
    
    if(url === "") {
        callbackFnc("", find, index);
    }
    else {
    
        url = "https://crossorigin.me/https://comicsdb.cz" + url;
        var xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                callbackFnc(this.getResponseHeader("Content-Type"), find, index);
            }
        };
        xhttp.send();
    
    }
    
}

function downloadSourceOfHtml(url, url_part, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(xhttp.responseText, url_part);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function search(urlKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].url === urlKey) {
            return i;
        }
    }
    return null;
}