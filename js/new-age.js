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
    
    function getSecondsToRelease() {
        var releaseDate = new Date();
        releaseDate.setDate(releaseDate.getDate() + (1 + 7 - releaseDate.getDay()) % 7);
        releaseDate.setHours(20);
        releaseDate.setMinutes(0);
        releaseDate.setSeconds(0);
        var diff = Math.abs(releaseDate - new Date());
        diff = diff / 1000;
        
        return diff;
    }
    
    function updateRealese() {
        var diff = getSecondsToRelease();
        var days = Math.floor(diff / 86400);
        diff = diff - (days * 86400);
        var hours = Math.floor(diff / 3600);
        diff = diff - (hours * 3600);
        var minutes = Math.floor(diff / 60);
        diff = diff - (minutes * 60);
        var seconds = Math.floor(diff);

        $("#releaseDate").text(days + "d " + hours + "h " + minutes + "m " + seconds + "s");
    }
    
    function updateRealeseFlipClock() {
        var clock;

        FlipClock.Lang.Czech = {

            'years'   : 'Roky',
            'months'  : 'Měsíce',
            'days'    : 'Dny',
            'hours'   : 'Hodiny',
            'minutes' : 'Minuty',
            'seconds' : 'Sekundy'

        };

        /* Create various aliases for convenience */

        FlipClock.Lang['cs']      = FlipClock.Lang.Czech;
        FlipClock.Lang['cs-cz']   = FlipClock.Lang.Czech;
        FlipClock.Lang['czech'] = FlipClock.Lang.Czech;

        clock = $('.clock').FlipClock({
            clockFace: 'DailyCounter',
            autoStart: false,
            language: "cs",
            callbacks: {
                    stop: function() {
                            $('.message').html('The clock has stopped!')
                    }
            }
        });

        clock.setTime(getSecondsToRelease());
        clock.setCountdown(true);
        clock.start();
    }
    
    $( document ).ready(function() {
        
        for(var i = 0; i < comicsDownloaded.length; i++) {
            $("#comicsBody").append('<tr><td><img class="lazy" data-original="https://comicsdb.cz' + (comicsDownloaded[i].cover === "" ? "/piccomics/noicon.gif" : comicsDownloaded[i].cover) + '" max-width="100px" max-height="100px" height="100px" /></td><td>' + comicsDownloaded[i].url + '</td><td><a href="https://comicsdb.cz/' + comicsDownloaded[i].url + '" target="_blank">' + comicsDownloaded[i].name + '</a>' + (typeof(comicsDownloaded[i].audio) !== "undefined" && comicsDownloaded[i].audio !== null ? '<br /><audio controls controlsList="nodownload" preload="none"><source src="/audio/' + comicsDownloaded[i].audio + '" type="audio/mpeg">Your browser does not support the audio element.</audio>' : '') + '</td><td>' + comicsDownloaded[i].price + '</td><td>' + comicsDownloaded[i].publisher + '</td><td>' + comicsDownloaded[i].publish + '</td><td>' + comicsDownloaded[i].type + '</td><td>' + comicsDownloaded[i].format + '</td><td>' + comicsDownloaded[i].pages + '</td><td><a href="https://comicsdb.cz/' + comicsDownloaded[i].url + '" target="_blank">' + (typeof(comicsDownloaded[i].comments) !== "undefined" ? comicsDownloaded[i].comments : 0) + '</a></td></tr>');
        }
        
        var t = $('#comics').DataTable({
            responsive: true,
            "order": [[ 1, "desc" ]],
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Czech.json"
            },
            'sDom': '<"top"f>t<"bottom"p>',
            "drawCallback": function() {
                $("img.lazy").lazyload();
            }
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
        
        var defaultCovers = -1;
        
        for(var i = 0; i < coversDB.length; i++) {
            if(coversDB[i].active === "true") {
                if(defaultCovers == -1) defaultCovers = i;
                $(".selectpicker").append('<option value="' + i + '">#' + coversDB[i].week + ' Hlasování</option>');
            }
        }

        reloadCovers(defaultCovers);
        
        $('.selectpicker').on('changed.bs.select', function (event, clickedIndex, newValue, oldValue) {
            reloadCovers(event.target.value);
        });
        
        //setInterval(updateRealese, 1000);
        
        updateRealeseFlipClock();

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

function reloadCovers(index) {
    
    $("#coversContainer").empty();
    
    for(var i = 0; i < coversDB[index].covers.length; i++) {
        var column = "";
        if(i == coversDB[index].covers.length - 1 && coversDB[index].covers.length == 5) {
            column = "col-lg-4 col-lg-offset-0 col-md-4 col-md-offset-0 col-sm-6 col-sm-offset-3";
        }
        else if(i == coversDB[index].covers.length - 2 && coversDB[index].covers.length == 5) {
            column = "col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2 col-sm-6 col-sm-offset-0";
        }
        else {
            column = "col-lg-4 col-md-4 col-sm-6";
        }
        $("#coversContainer").append('<div class="' + column + ' text-center"><div class="cover-box ' + coversDB[index].covers[i].reaction + '"><a href="' + coversDB[index].covers[i].link + '" target="_blank"><img class="choose" src="/img/covers/' + coversDB[index].week + "/" + coversDB[index].covers[i].emoji + '.jpg" /></a><h3 class="cover-title">' + coversDB[index].covers[i].comics + '</h3><p>' + coversDB[index].covers[i].author + '</p><div class="rank"><img class="emoji" src="' + siteRewrite + 'img/emojis/' + coversDB[index].covers[i].emoji + '.png"><span class="counter">0</span></div></div></div>');
    }

    $('#coversContainer').imagesLoaded( function() {

        var maxHeight = 0;

        $(".choose").each(function() {
            var scale = 400 / $(this).outerHeight();
            $(this).css("width", ($(this).outerWidth() * scale)  + "px");
            $(this).css("height", 400  + "px");;
        });

        $(".cover-box").each(function() {
            if($(this).outerHeight() > maxHeight) maxHeight = $(this).outerHeight() + 50;
        });

        $(".cover-box").each(function() {
            $(this).css("height", maxHeight + "px");
        });

    });

    var access_token = '1335593173145160|slQ8coHyj5qzQzfa9-Kw1saCziQ'; // PASTE HERE YOUR FACEBOOK ACCESS TOKEN
    var pageID = '434506730255602'; // PASTE HERE YOUR POST ID 
    var defaultCount = 0; // Default count to start with
    
    var reactions = ['LIKE', 'LOVE', 'WOW', 'HAHA', 'SAD', 'ANGRY'].map(function (e) {
        var code = 'reactions_' + e.toLowerCase();
        return 'reactions.type(' + e + ').limit(0).summary(total_count).as(' + code + ')'
    }).join(',');
    
    var v1 = $('.likes .counter'),
        v2 = $('.happy .counter'),
        v3 = $('.sad .counter'),
        v4 = $('.fml .counter'),
        v5 = $('.angry .counter'),
        v6 = $('.shock .counter');

        if(coversDB[index].fbPostId > -1) {

            var url = 'https://graph.facebook.com/v2.9/?ids=' + pageID + '_' + coversDB[index].fbPostId + '&fields=' + reactions + '&access_token=' + access_token;
            $.getJSON(url, function(res){
                var values = [];
                values.push({selector: "likes", count: defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_like.summary.total_count});
                values.push({selector: "happy", count: defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_love.summary.total_count});
                values.push({selector: "sad", count: defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_sad.summary.total_count});
                values.push({selector: "fml", count: defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_haha.summary.total_count});
                values.push({selector: "angry", count: defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_angry.summary.total_count});
                values.push({selector: "shock", count: defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_wow.summary.total_count});
                
                values.sort(function(a, b)
                {
                    if (a.count === b.count) { return 0; }
                    if (a.count < b.count) { return 1; }
                    else { return -1; }
                });
                
                $("." + values[0].selector).addClass("cover-box-winning");
                
                v1.text(defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_like.summary.total_count);
                v2.text(defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_love.summary.total_count);
                v3.text(defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_sad.summary.total_count);
                v4.text(defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_haha.summary.total_count);
                v5.text(defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_angry.summary.total_count);
                v6.text(defaultCount + res[pageID + '_' + coversDB[index].fbPostId].reactions_wow.summary.total_count);
            });
    
        }
    
}

document.addEventListener("DOMContentLoaded", function() {
    var div, n,
        v = document.getElementsByClassName("youtube-player");
    for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        var objects = [];
        objects.push(v[n]);
        objects.push(div);
        labnolThumb(v[n].dataset.id, objects, function(html, objects) {
            objects[1].innerHTML = html;
            objects[1].onclick = labnolIframe;
            objects[0].appendChild(objects[1]);
        });
    }
});

function labnolThumb(id, objects, callback) {
    
    downloadSourceOfHtml("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=" + id + "&key=AIzaSyAZXbPZGV_3ZmR-aIPeB8H1XdY8OCqgsw0", objects, function(source, objects) {
        
        //var url = "https://i.ytimg.com/vi/ID/hqdefault.jpg";
        //url.replace("ID", id);
        var url = JSON.parse(source).items[0].snippet.thumbnails.standard.url;
        
        var thumb = '<img src="' + url + '">',
            play = '<div class="play"></div>';
        callback(thumb + play, objects);
        
    });
    
}

function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/videoseries?list=ID&autoplay=1";
    //var embed = "https://www.youtube.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}