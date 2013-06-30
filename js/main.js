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
    url: 'SoundManager/swf/soundmanager2_flash_xdomain',
    debugFlash: true,
    preferFlash: false,
    useFlashBlock: true,
    useHighPerformance: true,
    wmode: 'transparent',
    useFastPolling: true,
    onready: function(){
        var song_urls = ['http://k002.kiwi6.com/hotlink/616vszijgr/carmen.ogg',
            'http://k002.kiwi6.com/hotlink/m2ud185211/bittersunset_red.ogg',
            'http://k002.kiwi6.com/hotlink/juiz2j561f/more_soul.ogg',
            'http://k002.kiwi6.com/hotlink/f0q9kv7uq5/ghost_in_the_machine.ogg',
            'http://k002.kiwi6.com/hotlink/p90c9zah57/stairwell.ogg',
            'http://k002.kiwi6.com/hotlink/bh88ma47gm/robber_barons.ogg',
            'http://k002.kiwi6.com/hotlink/9m8ra9pys0/protocholic.ogg',
            'http://k002.kiwi6.com/hotlink/vit231zj5t/cloudbreak.ogg',
            'http://k002.kiwi6.com/hotlink/k4r1m1556l/underwater_voyage.ogg',
            'http://k002.kiwi6.com/hotlink/l7z54xfkn5/how_you_want_it.ogg',
            'http://k002.kiwi6.com/hotlink/w6bvx7mxrg/abandon_ship.ogg',
            'http://k002.kiwi6.com/hotlink/lf637a3ae3/chinese_room.ogg',
            'http://k002.kiwi6.com/hotlink/m2ud185211/bittersunset_red.ogg']
        for(i in songs){
            var song_name = songs[i];
            if(i<12){
                s = soundManager.createSound({
                    id: song_name,
                    url: song_urls[i],
                    whileplaying: function(){
                        updateSeekbar(this.position, this.durationEstimate, this.buffered);
                    },
                    whileloading: function(){
                        updateSeekbar(this.position, this.durationEstimate, this.buffered);
                    },
                    onbeforefinish: function(){
                        soundManager.load(songs[songNum+1]);
                    },
                    onfinish: function(){
                        songNum = songNum+1;
                        animateToSong(songNum);
                        soundManager.play(songs[songNum]);
                    }
                });
            }else{
                s = soundManager.createSound({
                    id: song_name,
                    url: song_urls[i],
                    whileplaying: function(){
                        updateSeekbar(this.position, this.durationEstimate, this.buffered);
                    },
                    whileloading: function(){
                        updateSeekbar(this.position, this.durationEstimate, this.buffered);
                    },
                    onfinish: function(){
                        soundManager.stopAll();
                        $('#playpause').attr('class', 'play');
                        $('#player').slideUp(300);
                        mainPlayHit = false;
                        songNum = -1;
                        animateToSong(-1);
                        scaleToWindow();
                        setTimeout(function(){
                            $('#album_art_mouse_target').fadeIn('300')
                        }, 3000);
                        albumTimeoutSet = true;
                        albumTimeout = window.setTimeout(function(){
                            $('#album_art').fadeOut("fast");
                            albumTimeoutSet = false;
                        },2000);
                    }
                });
            }


        }
    }
});

function scaleToWindow() {
    var w = $(window).width();
    var h = $(window).height();
    repositionTo(x, y, scale, w, h)
}
function repositionTo(newX, newY, newScale, w, h){
    x = newX;
    y = newY;
    scale = newScale;
    var windowScale = Math.max(w/imW, h/imH);
    W = imW*scale*windowScale;
    H = imH*scale*windowScale;
    var left = parseFloat((.5*w-x*W));
    var bottom = parseFloat((.5*h-(1-y)*H));
    I.css("left",left);
    I.css("bottom",bottom);
    I.css("width",W);
    I.css("height",H);
    $('#album_art_mouse_target').css('width',W/3);
    $('#album_art_mouse_target').css('height',H/3);
    $('#album_art_mouse_target').css('left','50%');
    $('#album_art_mouse_target').css('top','50%');
    $('#album_art_mouse_target').css('margin-left',-W/6);
    $('#album_art_mouse_target').css('margin-top',-W/6);
    var playSize = W/18.5;
    $('#main_play').css('border-top-width',playSize);
    $('#main_play').css('border-left-width',1.6*playSize);
    $('#main_play').css('border-bottom-width',playSize);
    var downloadSize = W/19;
    $('#triangle_down').css('border-left-width',downloadSize);
    $('#triangle_down').css('border-right-width',downloadSize);
    $('#triangle_down').css('border-top-width',downloadSize);
    $('#album_art_mouse_target').css('height',H/3);
    $('#album_art_mouse_target').css('left','50%');
    $('#album_art_mouse_target').css('top','50%');
    $('#album_art_mouse_target').css('margin-left',-W/6);
    $('#album_art_mouse_target').css('margin-top',-W/6);
}
var existingRegions = {};
function updateSeekbar(position, duration, buffered){
    playFraction =  parseFloat(position)/duration;
//    console.log($('#progress').width())
    $('#progress').css('width', playFraction*100+'%');
    $('#song-title').html(songs[songNum].replace(/_/g, ' ').toUpperCase());
    for(var i in buffered){
        region = buffered[i];
        if(i in existingRegions){
            regionDiv = $('#buffer'+i)
        }else{
            existingRegions[i] = true;
            var regionDiv = jQuery('<div/>', {id:'#buffer'+i, class: 'buffered'});
            $('#seekbar').append(regionDiv)
        }
        regionDiv.css('left',region.start/duration*100+'%');
        regionDiv.css('right',region.start/duration*100+'%')

    }

}

function animateToSong(songNum){
    I.stop();
    x = xs[songNum+1];
    y = ys[songNum+1];
    scale = scales[songNum+1];
    w = $(window).width();
    h = $(window).height();
    var windowScale = Math.max(w/imW, h/imH);
    W = imW*scale*windowScale;
    H = imH*scale*windowScale;
    left = parseFloat((.5*w-x*W));
    bottom = parseFloat((.5*h-(1-y)*H));
    I.animate({
        left:left,
        bottom:bottom,
        width:W,
        height:H
    },3000);
}

$(document).ready(function(){
    I = $('#image').hide();
    $('#player').hide();
    $('#album_art').hide();
    albumTimeoutSet = false;

    $('#album_art_mouse_target').mouseenter(function(){
        $('#album_art').fadeIn("fast");
        $('#album_art_mouse_target').mouseleave(function(){
            $('#album_art').fadeOut("fast")
        });
    });
    $('#download_button').click(function () {
        $('#download_frame').fadeIn('slow');
        $('#album_art').hide();

    });
    I.load(function() {
        imW = I.width();
        imH = I.height();
        I.show();
        scaleToWindow();
    });
    xs = [.5, 0.149667405764967, 0.885809312638581, 0.493348115299335, 0.537694013303769, 0.75609756097561, 0.319844789356984, 0.26219512195122, 0.85920177383592, 0.882414079822616, 0.67419623059867, 0.392184035476718, 0.893500554323725, 0.554878048780488];
    ys = [.5, 0.66019955654102, 0.129711751662971, 0.536585365853659, 0.297671840354767, 0.320537694013304, 0.176829268292683, 0.416574279379157, 0.282012195121951, 0.679739467849224, 0.314232261640798, 0.437222838137472, 0.516213968957871, 0.51330376940133];
    scales = [1, 5.156832298136646, 4.912721893491124, 4.512228260869565, 5.973021582733813, 7.983173076923077, 4.296248382923674, 8.060679611650485, 3.856023222060958, 5.16887159533074, 3.806303724928367, 4.91090573012939, 5.652765957446808, 2.202254641909814];
    songNum = 0;
    songs = ['Carmen','Bittersunset_Red','More_Soul','Ghost_in_the_Machine','Stairwell','Robber_Barons', 'Protocholic', 'Cloudbreak','Underwater_Voyage','How_You_Want_It','Abandon_Ship','Chinese_Room', 'Baktun'];
    $('#ff').click(function(){
        songNum = (songNum+1)%13;
        animateToSong(songNum);
    });
    $('#rw').click(function(){
        //TODO: Some code that checks if you're in the first three seconds of the song
        songNum = (songNum-1)%13;
        animateToSong(songNum);
    });
    x = .5;
    y = .5;
    scale = 1;
    $( window ).bind( "resize", scaleToWindow );
    mainPlayHit = false;
    $('#main_play').click(function(){
        $('#album_art_mouse_target').fadeOut('300');
        songNum = 0;
        soundManager.play(songs[songNum]);
        animateToSong(0);
        $('#player').slideDown(300);
        $('#playpause').attr('class', 'pause');
        mainPlayHit = true;
    });
    $('#download_button').mouseenter(function(){
        $('#triangle_down').css('border-top-color', 'rgba(255,255,255,.9)');
        $('#rectangle').css('background-color','rgba(255,255,255,.9)');
        $('#download_button').mouseleave(function(){
            $('#triangle_down').css('border-top-color', 'rgba(255,255,255,.5)');
            $('#rectangle').css('background-color','rgba(255,255,255,.5)');
        });
    });
    timeOutSet = false;
    $( "#player_mouse_target" ).mousemove(
        function( event ){
            if(mainPlayHit){
                if(timeOutSet){
                    window.clearTimeout(slideTimeout)
                }
                if(!$('#player').is(":visible")){
                    $('#player').slideDown(300)
                }
                timeOutSet = true;
                slideTimeout = window.setTimeout(function(){
                    $('#player').slideUp(300);
                    timeOutSet = false;
                },2000);
            }
        }
    );
    $( "#player_mouse_target" ).click(
        function( event ){
            if(timeOutSet){
                window.clearTimeout(slideTimeout)
            }
            if(!$('#player').is(":visible")){
                $('#player').slideDown(300)
            }
            timeOutSet = true;
            slideTimeout = window.setTimeout(function(){
                $('#player').slideUp(300);
                timeOutSet = false;
            },2000);
        }
    );

    $('#playpause').click(function(){
        soundManager.togglePause(songs[songNum])

        $('#playpause').toggleClass('play');
        $('#playpause').toggleClass('pause');

    });

    $('.stop').click(function(){
        soundManager.stopAll();
        $('#playpause').attr('class', 'play');
        $('#player').slideUp(300);
        mainPlayHit = false;
        songNum = -1;
        animateToSong(-1);
        scaleToWindow();
        setTimeout(function(){
            $('#album_art_mouse_target').fadeIn('300')
        }, 3000);
        albumTimeoutSet = true;
        albumTimeout = window.setTimeout(function(){
            $('#album_art').fadeOut("fast");
            albumTimeoutSet = false;
        },2000);
    });

    $('.ff').click(function(){
        soundManager.stopAll();
        if(songNum< 12){
            songNum ++;
            soundManager.play(songs[songNum]);
            if($('#playpause').is('.play')){
                soundManager.pause(songs[songNum]);
            }
            animateToSong(songNum)
        }else{
            soundManager.stopAll();
            $('#playpause').attr('class', 'play');
            $('#player').slideUp(300);
            mainPlayHit = false;
            songNum = -1;
            animateToSong(-1);
            scaleToWindow();
            setTimeout(function(){
                $('#album_art_mouse_target').fadeIn('300')
            }, 3000);
            albumTimeoutSet = true;
            albumTimeout = window.setTimeout(function(){
                $('#album_art').fadeOut("fast");
                albumTimeoutSet = false;
            },2000);
        }

    });

    $('.rw').click(function(){


        if(soundManager.getSoundById(songs[songNum]).position < 3000){
            soundManager.stopAll();
            if(songNum>0){
                songNum --;
            }

            soundManager.play(songs[songNum]);
            if($('#playpause').is('.play')){
                soundManager.pause(songs[songNum])
            }
            animateToSong(songNum)
        }else{
            soundManager.getSoundById(songs[songNum]).setPosition(0);
        }

    });
    $('#seekbar').mousedown(function(e){
        var sound = soundManager.getSoundById(songs[songNum]);
        var newPos = Math.round((e.pageX - $('#seekbar').offset().left) / $('#seekbar').width() * sound.durationEstimate);
        playFromPoint(sound, newPos)
    });
    function playFromPoint(sound, offset) {
        if (!sound.isHTML5 && !sound.readyState) {
            // sound hasn't started loading yet.
            sound.load({
                whileloading: function() {
                    if (!this.playState && this.duration > offset + 1000) {
                        // we've loaded enough that this should work. Go!
                        sound.setPosition(offset);
                    }
                }
            });
        } else {
            // this function has already been called (or, it's an HTML5 sound.)
            sound.setPosition(offset);
        }
    }





});