var isMobile = false;
        
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
        
        if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) isMobile = true;
        
        initCoverGame();
    
        var loadFromSpreadSheet = true;
        var withAudio = false;
        
        if(loadFromSpreadSheet) {
        
            var url = "https://docs.google.com/spreadsheets/pub?key=1kbeDv93WTK6KOR2W0fH29JTJFNp9tw9H8q_rPT-FVwA&output=html";
            var googleSpreadsheet = new GoogleSpreadsheet();
            googleSpreadsheet.url(url);
            googleSpreadsheet.load(function(result) {

                for(var i = 0; i < result.items.length; i++) {

                    var item = result.items[i];

                    if(typeof(item.name) !== "undefined") { 
                        item.name = item.name.replace(/<comma>/gm,",");
                        item.name = item.name.replace(/<colon>/gm,":");
                    }
                    if(typeof(item.description) !== "undefined") { 
                        item.description = item.description.replace(/<comma>/gm,",");
                        item.description = item.description.replace(/<colon>/gm,":");
                    }
                    if(typeof(item.type) !== "undefined") item.type = item.type.replace(/<comma>/gm,",");

                    if(withAudio) {

                        urlExists(window.location.origin + '/audio/' + item.audio, item, i, function(audioExist, item, pos) {

                            addRow(item, loadFromSpreadSheet, audioExist);

                            if(pos === result.items.length - 1) {
                                initDataTables();
                            }

                        });

                    }
                    else {

                        addRow(item, loadFromSpreadSheet, withAudio);
                        if(i === result.items.length - 1) {
                            initDataTables();
                        }
                    }

                }

            });
        
        }
        else {
        
            for(var i = 0; i < comicsDownloaded.length; i++) {
                
                var item = comicsDownloaded[i];
                addRow(item, loadFromSpreadSheet, false);
                
            }
            
            initDataTables();
        
        }
        
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
        
        initGaleries();
        
    });

})(jQuery); // End of use strict

function initDataTables() {
    
    if($('#comics').length > 0) {
    
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
    
    }

    if($('#harmonogram-table').length > 0) {

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
    
    }
    
    if($('#cover-plan-table').length > 0) {
    
        var t = $('#cover-plan-table').DataTable({
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
            'sDom': 't<"bottom"p>'
        });
    
    }
    
    if($('#cover-week-points-table').length > 0) {
    
        var t = $('#cover-week-points-table').DataTable({
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
            'sDom': 't<"bottom"p>'
        });
    
    }
    
    if($('#cover-all-points-table').length > 0) {
    
        var t = $('#cover-all-points-table').DataTable({
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
    
    }
    
    if($('#cover-all-fair-points-table').length > 0) {
    
        var t = $('#cover-all-fair-points-table').DataTable({
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
    
    }
    
}

function addRow(item, spreadSheet, audioExist) {
    
    if(spreadSheet) {
    
        $("#comicsBody").append('<tr><td><img class="lazy" data-original="https://comicsdb.cz' + (item.cover === "null" ? "/piccomics/noicon.gif" : item.cover) + '" style="max-width: 100px; max-height: 100px;" /></td><td>' + item.id + '</td><td><a href="https://comicsdb.cz/' + item.id + '" target="_blank">' + item.name + '</a>' + (audioExist ? '<br /><audio controls controlsList="nodownload" preload="none"><source src="/audio/' + item.audio + '" type="audio/mpeg">Your browser does not support the audio element.</audio>' : '') + '</td><td>' + (item.price !== "null" ? item.price : "") + '</td><td>' + (item.publisher !== "null" ? item.publisher : "") + '</td><td>' + (item.publish !== "null" ? item.publish : "") + '</td><td>' + (item.type !== "null" ? item.type : "") + '</td><td>' + (item.format !== "null" ? item.format : "") + '</td><td>' + (item.pages !== "null" ? item.pages : "") + '</td><td><a href="https://comicsdb.cz/' + item.id + '" target="_blank">' + item.comments + '</a></td></tr>');
    
    }
    else {
        
        $("#comicsBody").append('<tr><td><img class="lazy" data-original="https://comicsdb.cz' + (item.cover === "" ? "/piccomics/noicon.gif" : item.cover) + '" style="max-width: 100px; max-height: 100px;" /></td><td>' + item.url + '</td><td><a href="https://comicsdb.cz/' + item.url + '" target="_blank">' + item.name + '</a>' + (typeof(item.audio) !== "undefined" && item.audio !== null ? '<br /><audio controls controlsList="nodownload" preload="none"><source src="/audio/' + item.audio + '" type="audio/mpeg">Your browser does not support the audio element.</audio>' : '') + '</td><td>' + item.price + '</td><td>' + item.publisher + '</td><td>' + item.publish + '</td><td>' + item.type + '</td><td>' + item.format + '</td><td>' + item.pages + '</td><td><a href="https://comicsdb.cz/' + item.url + '" target="_blank">' + (typeof(item.comments) !== "undefined" ? item.comments : 0) + '</a></td></tr>');
        
    }
    
}

function urlExists(url, item, pos, callback){
  $.ajax({
    type: 'HEAD',
    url: url,
    success: function(){
      callback(true, item, pos);
    },
    error: function() {
      callback(false, item, pos);
    }
  });
}

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

function initGaleries() {
    
    if($( "#gallery" ).length == 0) return;
    
    var albums = [];
    
    var url = "https://docs.google.com/spreadsheets/pub?key=1nS0HRoXlLDilySgiYqtPvnCvz1LUDar9Sn8CGWwRYZ0&gid=1&output=html";
    var googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url(url);
    googleSpreadsheet.load(function(result) {

        var url = "https://docs.google.com/spreadsheets/pub?key=1nS0HRoXlLDilySgiYqtPvnCvz1LUDar9Sn8CGWwRYZ0&gid=2&output=html";
        var googleSpreadsheet = new GoogleSpreadsheet();
        googleSpreadsheet.url(url);
        googleSpreadsheet.load(function(resultImages) {
            
            for(var i = 0; i < result.items.length; i++) {

                var albumId = result.items[i].id;
                var albumImages = [];
                
                for(var j = resultImages.items.length - 1; j >= 0; j--) {
                    
                    if(resultImages.items[j].albumid === albumId) {
                        
                        resultImages.items[j].name = resultImages.items[j].name.replace(/<comma>/gm,",");
                        resultImages.items[j].name = resultImages.items[j].name.replace(/<colon>/gm,":");
                        
                        var youtubeStart = resultImages.items[j].name.indexOf("Video: ") + 7;
                        var youtubeEnd = resultImages.items[j].name.indexOf("Koupit: ");
                        var buyStart = resultImages.items[j].name.indexOf("Koupit: ") + 8;
                        
                        var youtubeText = resultImages.items[j].name.substring(youtubeStart, youtubeEnd);
                        var buyText = resultImages.items[j].name.substring(buyStart);
                        
                        resultImages.items[j].name = resultImages.items[j].name.replace(/Scénář/gm,"<br />Scénář");
                        resultImages.items[j].name = resultImages.items[j].name.replace(/Video/gm,"<br />Video");
                        resultImages.items[j].name = resultImages.items[j].name.replace(/Koupit/gm,"<br />Koupit");
                        
                        resultImages.items[j].name = resultImages.items[j].name.replace(youtubeText,'<a href=' + youtubeText + ' target="_blank">' + youtubeText + '</a>');
                        resultImages.items[j].name = resultImages.items[j].name.replace(buyText,'<a href=' + buyText + ' target="_blank">' + buyText + '</a>');
                        
                        albumImages.push({
                            url: resultImages.items[j].picture,
                            thumbUrl: resultImages.items[j].picture,
                            title: resultImages.items[j].name
                        });
                    }
                    
                }
                
                result.items[i].name = result.items[i].name.replace(/<comma>/gm,",");
                result.items[i].name = result.items[i].name.replace(/<colon>/gm,":");
                        
                
                albums.push({
                    title: result.items[i].name,
                    images: albumImages
                });

            }
            
            $( "#gallery" ).jGallery( {
                "transition":"moveToLeftEasing_moveFromRight",
                "transitionBackward":"moveToRightEasing_moveFromLeft",
                "transitionCols":"1",
                "transitionRows":"1",
                "thumbnailsPosition":"bottom",
                "thumbType":"image",
                "backgroundColor":"337AB7",
                "textColor":"FFFFFF",
                "mode":"standard",
                canChangeMode: false,
                canMinimalizeThumbnails: false,
                titleExpanded: true,
                tooltipSeeAllPhotos: 'Zobrazit všechny fotky',
                tooltipSeeOtherAlbums: 'Zobrazit další čtenářské deníky',
                width: isMobile ? '100%' : '90%',
                height: "750px",
                items: albums,
                browserHistory: false,
                swipeEvents: isMobile
            } );
            
        });

    });
    
}

function reloadCovers(index) {
    
    if($("#coversContainer").length === 0) return;
    
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

function initCoverGame() {
    
    if($("#cover-plan-table").length === 0) return;
    
    var weekOfYear = function(){
        var d = new Date();
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
    };

    var week = weekOfYear();

    $("#actual-week").text(week);
    
    var url = "https://docs.google.com/spreadsheets/pub?key=1qDHWMYtiPr0TbU9BtfRKhyhLp9EwwnQY00iajhVR10w&gid=2&output=html";
    var googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url(url);
    googleSpreadsheet.load(function(result) {

        for(var i = 0; i < result.items.length; i++) {

            if(result.items[i].id === result.items[i].week2) {
                var className = ((parseInt(result.items[i].id) - parseInt(result.items[i].year)) === week) ? ' class="voting-first"' : '';
                
                $("#coverPlanBody").append('<tr><td' + className + '>' + (parseInt(result.items[i].id) - parseInt(result.items[i].year)) + "/" + result.items[i].year + '</td><td' + className + '>' + result.items[i].group1.replace(/;/gm,", ") + '</td></tr>');
            }
            else {
                var className = ((parseInt(result.items[i].week2) - parseInt(result.items[i].year)) === week) ? ' class="voting-first"' : '';
                
                $("#coverPlanBody").append('<tr><td' + className + '>' + (parseInt(result.items[i].week2) - parseInt(result.items[i].year)) + "/" + result.items[i].year + '</td><td' + className + '>' + result.items[i].group2.replace(/;/gm,", ") + '</td></tr>');
                
                var className = ((parseInt(result.items[i].id) - parseInt(result.items[i].year)) === week) ? ' class="voting-first"' : '';
                
                $("#coverPlanBody").append('<tr><td' + className + '>' + (parseInt(result.items[i].id) - parseInt(result.items[i].year)) + "/" + result.items[i].year + '</td><td' + className + '>' + result.items[i].group1.replace(/;/gm,", ") + '</td></tr>');
            }

        }
            
    });
    
    var url = "https://docs.google.com/spreadsheets/pub?key=1qDHWMYtiPr0TbU9BtfRKhyhLp9EwwnQY00iajhVR10w&gid=1&output=html";
    var googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url(url);
    googleSpreadsheet.load(function(result) {

        var portyAll = 0;
        var jakubAll = 0;
        var honzaAll = 0;
        var vojtaAll = 0;
        var ondřejAll = 0;
        var walomeAll = 0;
        var shialAll = 0;
        
        var portyAllFair = 0;
        var jakubAllFair = 0;
        var honzaAllFair = 0;
        var vojtaAllFair = 0;
        var ondřejAllFair = 0;
        var walomeAllFair = 0;
        var shialAllFair = 0;

        for(var i = 0; i < result.items.length; i++) {

            if(parseInt(result.items[i].id) >= 8) {
                portyAllFair += parseInt(result.items[i].portybody);
                jakubAllFair += parseInt(result.items[i].jakubbody);
                honzaAllFair += parseInt(result.items[i].honzabody);
                vojtaAllFair += parseInt(result.items[i].vojtabody);
                ondřejAllFair += parseInt(result.items[i].ondřejbody);
                walomeAllFair += parseInt(result.items[i].walomebody);
                shialAllFair += parseInt(result.items[i].shialbody);
            }

            portyAll += parseInt(result.items[i].portybody);
            jakubAll += parseInt(result.items[i].jakubbody);
            honzaAll += parseInt(result.items[i].honzabody);
            vojtaAll += parseInt(result.items[i].vojtabody);
            ondřejAll += parseInt(result.items[i].ondřejbody);
            walomeAll += parseInt(result.items[i].walomebody);
            shialAll += parseInt(result.items[i].shialbody);

            var portyClass = (parseInt(result.items[i].portybody) === 5 ? ' class="voting-first"' : (parseInt(result.items[i].portybody) === 3 ? ' class="voting-second"' : (parseInt(result.items[i].portybody) === 1 ? ' class="voting-third"' : '')));
            var jakubClass = (parseInt(result.items[i].jakubbody) === 5 ? ' class="voting-first"' : (parseInt(result.items[i].jakubbody) === 3 ? ' class="voting-second"' : (parseInt(result.items[i].jakubbody) === 1 ? ' class="voting-third"' : '')));
            var honzaClass = (parseInt(result.items[i].honzabody) === 5 ? ' class="voting-first"' : (parseInt(result.items[i].honzabody) === 3 ? ' class="voting-second"' : (parseInt(result.items[i].honzabody) === 1 ? ' class="voting-third"' : '')));
            var vojtaClass = (parseInt(result.items[i].vojtabody) === 5 ? ' class="voting-first"' : (parseInt(result.items[i].vojtabody) === 3 ? ' class="voting-second"' : (parseInt(result.items[i].vojtabody) === 1 ? ' class="voting-third"' : '')));
            var ondřejClass = (parseInt(result.items[i].ondřejbody) === 5 ? ' class="voting-first"' : (parseInt(result.items[i].ondřejbody) === 3 ? ' class="voting-second"' : (parseInt(result.items[i].ondřejbody) === 1 ? ' class="voting-third"' : '')));
            var walomeClass = (parseInt(result.items[i].walomebody) === 5 ? ' class="voting-first"' : (parseInt(result.items[i].walomebody) === 3 ? ' class="voting-second"' : (parseInt(result.items[i].walomebody) === 1 ? ' class="voting-third"' : '')));
            var shialClass = (parseInt(result.items[i].shialbody) === 5 ? ' class="voting-first"' : (parseInt(result.items[i].shialbody) === 3 ? ' class="voting-second"' : (parseInt(result.items[i].shialbody) === 1 ? ' class="voting-third"' : '')));
            
            $("#coverWeekPointsBody").append('<tr><td>' + result.items[i].id + '</td><td' + portyClass + '>Hlasy: ' + (result.items[i].porty === "-1" ? "N/A" : result.items[i].porty) + '<br />Body: ' + result.items[i].portybody + '</td><td' + jakubClass + '>Hlasy: ' + (result.items[i].jakub === "-1" ? "N/A" : result.items[i].jakub) + '<br />Body: ' + result.items[i].jakubbody + '</td><td' + honzaClass + '>Hlasy: ' + (result.items[i].honza === "-1" ? "N/A" : result.items[i].honza) + '<br />Body: ' + result.items[i].honzabody + '</td><td' + vojtaClass + '>Hlasy: ' + (result.items[i].vojta === "-1" ? "N/A" : result.items[i].vojta) + '<br />Body: ' + result.items[i].vojtabody + '</td><td' + ondřejClass + '>Hlasy: ' + (result.items[i].ondřej === "-1" ? "N/A" : result.items[i].ondřej) + '<br />Body: ' + result.items[i].ondřejbody + '</td><td' + walomeClass + '>Hlasy: ' + (result.items[i].walome === "-1" ? "N/A" : result.items[i].walome) + '<br />Body: ' + result.items[i].walomebody + '</td><td' + shialClass + '>Hlasy: ' + (result.items[i].shial === "-1" ? "N/A" : result.items[i].shial) + '<br />Body: ' + result.items[i].shialbody + '</td></tr>');
            
        }
        
        $("#coverAllPointsBody").append('<tr><td>' + portyAll + ' b.</td><td>' + jakubAll + ' b.</td><td>' + honzaAll + ' b.</td><td>' + vojtaAll + ' b.</td><td>' + ondřejAll + ' b.</td><td>' + walomeAll + ' b.</td><td>' + shialAll + ' b.</td></tr>');
        
        $("#coverAllFairPointsBody").append('<tr><td>' + portyAllFair + ' b.</td><td>' + jakubAllFair + ' b.</td><td>' + honzaAllFair + ' b.</td><td>' + vojtaAllFair + ' b.</td><td>' + ondřejAllFair + ' b.</td><td>' + walomeAllFair + ' b.</td><td>' + shialAllFair + ' b.</td></tr>');
            
    });
    
}

document.addEventListener("DOMContentLoaded", function() {
    var div, n,
        v = document.getElementsByClassName("youtube-player");
    for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        div.setAttribute("data-name", v[n].dataset.name);
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
    ga('send', {
        hitType: 'event',
        eventCategory: 'Youtube Videos',
        eventAction: 'play',
        eventLabel: this.dataset.name
    });
    
    this.parentNode.replaceChild(iframe, this);
}