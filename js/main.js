var x;
var y;
var scale;
var songs;
var xs;
var ys;
var scales;
var songNum;
var I;
var imH;
var imW;
var W;
var H;

soundManager.setup({
    url: 'SoundManager/swf',
    preferFlash: false,
    onready: function () {
        var mySound = soundManager.createSound({
            id: 'rain',
            url: 'rain.wav'
        });
    }
});

function positionImage(x, y) {
    //x,y are the image coordinates to center onscreen
}

function scaleToWindow() {
    var w = $(window).width();
    var h = $(window).height();
    repositionTo(x, y, scale, w, h)
}

function repositionTo(newX, newY, newScale, w, h) {
    x = newX;
    y = newY;
    scale = newScale;
    var windowScale = Math.max(w / imW, h / imH);
    W = imW * scale * windowScale;
    H = imH * scale * windowScale;
    var left = parseFloat((.5 * w - x * W));
    var bottom = parseFloat((.5 * h - (1 - y) * H));

    I.css("left", left);
    I.css("bottom", bottom);
    I.css("width", W);
    I.css("height", H);

    $('#album_art_mouse_target').css('width', W / 3);
    $('#album_art_mouse_target').css('height', H / 3);
    $('#album_art_mouse_target').css('left', '50%');
    $('#album_art_mouse_target').css('top', '50%');
    $('#album_art_mouse_target').css('margin-left', -W / 6);
    $('#album_art_mouse_target').css('margin-top', -W / 6);

    var playSize = w / 18;

    $('#main_play').css('border-top-width', playSize);
    $('#main_play').css('border-left-width', 2 * playSize);
    $('#main_play').css('border-bottom-width', playSize);
    $('#album_art_mouse_target').css('height', H / 3);
    $('#album_art_mouse_target').css('left', '50%');
    $('#album_art_mouse_target').css('top', '50%');
    $('#album_art_mouse_target').css('margin-left', -W / 6);
    $('#album_art_mouse_target').css('margin-top', -W / 6);
}

function animateToSong(songNum) {
    I.stop();
    x = xs[songNum];
    y = ys[songNum];
    scale = scales[songNum];
    w = $(window).width();
    h = $(window).height();
    var windowScale = Math.max(w / imW, h / imH);
    W = imW * scale * windowScale;
    H = imH * scale * windowScale;
    left = parseFloat((.5 * w - x * W));
    bottom = parseFloat((.5 * h - (1 - y) * H));
    I.animate({
        left: left,
        bottom: bottom,
        width: W,
        height: H
    }, 3000);
}
$(document).ready(function () {
    I = $('#image').hide();
    $('#player').hide();
    $('#album_art').hide();
    albumTimeoutSet = false;
    $('#album_art_mouse_target').mousemove(function () {
        if (albumTimeoutSet) {
            window.clearTimeout(albumTimeout)
        }
        if (!$('#album_art').is(":visible")) {
            $('#album_art').fadeIn("fast")
        }
        albumTimeoutSet = true;
        albumTimeout = window.setTimeout(function () {
            $('#album_art').fadeOut("fast");
            albumTimeoutSet = false;
        }, 2000);
    });
    I.load(function () {
        imW = I.width();
        imH = I.height();
        I.show();
        scaleToWindow();
    });
    xs = [.5, 0.149667405764967, 0.885809312638581, 0.493348115299335, 0.537694013303769,
          0.75609756097561, 0.319844789356984, 0.26219512195122, 0.85920177383592,
          0.882414079822616, 0.67419623059867, 0.392184035476718, 0.893500554323725,
          0.554878048780488]; /* 13 is prime, fuck you */

    ys = [.5, 0.66019955654102, 0.129711751662971, 0.536585365853659, 0.297671840354767,
          0.320537694013304, 0.176829268292683, 0.416574279379157, 0.282012195121951,
          0.679739467849224, 0.314232261640798, 0.437222838137472, 0.516213968957871,
          0.51330376940133];

    scales = [1, 5.156832298136646, 4.912721893491124, 4.512228260869565, 5.973021582733813,
              7.983173076923077, 4.296248382923674, 8.060679611650485, 3.856023222060958,
              5.16887159533074, 3.806303724928367, 4.91090573012939, 5.652765957446808,
              2.202254641909814];;

    songNum = -1;
    songs = ['rain', 'rain', 'rain', 'rain', 'rain', 'rain', 'rain', 'rain', 'rain', 'rain', 'rain', 'rain', 'rain']
    I.click(function () {
        songNum = (songNum + 1) % 13;
        animateToSong(songNum);
    });

    x = .5;
    y = .5;
    scale = 1;

    $(window).bind("resize", scaleToWindow);

    mainPlayHit = false;

    $('#main_play').click(function () {
        $('#album_art_mouse_target').fadeOut('300')
        songNum = 1
        soundManager.play(songs[songNum])
        $('#player').slideDown(300)
        $('#playpause').attr('class', 'pause');
        mainPlayHit = true;
    });

    timeOutSet = false;

    $("#player_mouse_target").mousemove(
        function (event) {
            if (mainPlayHit) {
                if (timeOutSet) {
                    window.clearTimeout(slideTimeout)
                }
                if (!$('#player').is(":visible")) {
                    $('#player').slideDown(300)
                }
                timeOutSet = true;
                slideTimeout = window.setTimeout(function () {
                    $('#player').slideUp(300);
                    timeOutSet = false;
                }, 2000);
            }
        }
    );

    $("#player_mouse_target").click(
        function (event) {
            if (timeOutSet) {
                window.clearTimeout(slideTimeout)
            }
            if (!$('#player').is(":visible")) {
                $('#player').slideDown(300)
            }
            timeOutSet = true;
            slideTimeout = window.setTimeout(function () {
                $('#player').slideUp(300);
                timeOutSet = false;
            }, 2000);
        }
    );

    $('#playpause').click(function () {
        if ($('#playpause').attr('class') == 'play') {
            soundManager.play(songs[songNum]);
        } else {
            soundManager.pause(songs[songNum])
        }
        $('#playpause').toggleClass('play');
        $('#playpause').toggleClass('pause');
    });

    $('.stop').click(function () {
        soundManager.stop('rain');
        $('#playpause').attr('class', 'play');
        $('#player').slideUp(300);
        mainPlayHit = false;
        songNum = 0;
        animateToSong(songNum);
        $('#album_art_mouse_target').fadeIn('300')
    });
});
