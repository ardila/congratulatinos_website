var x;
var y;
var scale;
var xs = [ 0.149667405764967, 0.885809312638581, 0.493348115299335,
    0.537694013303769, 0.75609756097561, 0.319844789356984, 0.26219512195122,
    0.85920177383592, 0.882414079822616, 0.67419623059867, 0.392184035476718,
    0.893500554323725, 0.554878048780488 ];
var ys = [ 0.66019955654102, 0.129711751662971, 0.536585365853659,
    0.297671840354767, 0.320537694013304, 0.176829268292683, 0.416574279379157,
    0.282012195121951, 0.679739467849224, 0.314232261640798, 0.437222838137472,
    0.516213968957871, 0.51330376940133 ];
var scales = [ 5.156832298136646, 4.912721893491124, 4.512228260869565,
    5.973021582733813, 7.983173076923077, 4.296248382923674, 8.060679611650485,
    3.856023222060958, 5.16887159533074, 3.806303724928367, 4.91090573012939,
    5.652765957446808, 2.202254641909814 ];
var songNum;
var I;
var imH;
var imW;

function positionImage(x, y) {
  //x,y are the image coordinates to center onscreen
}

function scaleToWindow() {
  var w = $(window).width();
  var h = $(window).height();
  repositionTo(x, y, scale, w, h);
}

function repositionTo(newX, newY, newScale, w, h) {
  x = newX;
  y = newY;
  scale = newScale;
  var windowScale = Math.max(w / imW, h / imH);
  var width = imW * scale * windowScale;
  var height = imH * scale * windowScale;
  var left = parseFloat((.5 * w - x * width));
  var bottom = parseFloat((.5 * h - y * height));
  I.css("left", left);
  I.css("bottom", bottom);
  I.css("width", width);
  I.css("height", height);
}

function animateToSong(songNum) {
  I.stop();
  x = xs[songNum];
  y = ys[songNum];
  scale = scales[songNum];
  w = $(window).width();
  h = $(window).height();
  var windowScale = Math.max(w / imW, h / imH);
  width = imW * scale * windowScale;
  height = imH * scale * windowScale;
  left = parseFloat((.5 * w - x * width));
  bottom = parseFloat((.5 * h - y * height));

  I.animate({
    right : left,
    top : bottom,
    width : width,
    height : height
  }, 3000);
}

$(document).ready(
    function() {
      I = $('#image');
      I.load(function() {
        imW = I.width();
        imH = I.height();
      });
      xs = [ .25, .3, .7, .9, .1, .5, .8, .9, .4, .3, .2, .1, .6 ];
      ys = [ .8, .9, .4, .3, .2, .1, .6, .25, .3, .7, .9, .1, .5 ];
      scales = [ 5.156832298136646, 4.912721893491124, 4.512228260869565,
          5.973021582733813, 7.983173076923077, 4.296248382923674,
          8.060679611650485, 3.856023222060958, 5.16887159533074,
          3.806303724928367, 4.91090573012939, 5.652765957446808,
          2.202254641909814 ];
      
      songNum = 0;
      I.click(function() {
        songNum = (songNum + 1) % 13;
        animateToSong(songNum);
      });
      
      x = .5;
      y = .5;
      scale = 1;
      scaleToWindow();
      $(window).bind("resize", scaleToWindow);

      $("#player_mouse_target").mousemove(function(event) {
        $("#player").stop();
        if ($('#player').is(":visible")) {

        } else {
          $("#player").slideDown(300);
        }
        $("#player").animate(3000);
        $("#player").slideUp(300);

      });

    });