/**
 * Created with JetBrains WebStorm.
 * User: headradio
 * Date: 9/21/13
 * Time: 9:26 PM
 * To change this template use File | Settings | File Templates.
 */

x = .5;
y = .5;
scale = 1;

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
}
function showHiddenDiv(element){
    var new_item = element.siblings("div");
//    element.append(new_item);
    new_item.show('fast');
    container = new_item.parents("td");
    container.mouseleave(function(){
        new_item.hide('fast');

    });
}

$(document).ready(function(){
    I = $('#image');
    $( window ).bind( "resize", scaleToWindow );
    I.load(function() {
        imW = I.width();
        imH = I.height();
        I.show();
        scaleToWindow();
    });

    $('h2').mouseenter(function(){
        showHiddenDiv($(this));
    });
    $('#signup').click(function() {
        name = $('#name').val();
        email_adress = $('#email').val();
        options = 'email='+email_adress+'&name='+name;
        $.get('email_script.php?functionName=signup&'+options);
    });

});
