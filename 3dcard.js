var mousePosX;
var mousePosY;
var elem = document.getElementById('multidimensional-card');
var elembody = document.getElementById('multidimensional-card-body');
var originX = elem.offsetWidth;
var originY = elem.offsetHeight;

elem.addEventListener('mousemove', onMousemove, false);
elem.addEventListener('mouseout', mOut, false);

function onMousemove(e){
    var m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0, obj = this;
    //get mouse position on document crossbrowser
    if (!e){e = window.event;}
    if (e.pageX || e.pageY){
        m_posx = e.pageX;
        m_posy = e.pageY;
    } else if (e.clientX || e.clientY){
        m_posx = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        m_posy = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }
    //get parent element position in document
    if (obj.offsetParent){
        do{
            e_posx += obj.offsetLeft;
            e_posy += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    mousePosX = m_posx-e_posx;
    mousePosY = m_posy-e_posy;
    var rotateX = -(((originX / 2) - mousePosX) * 0.035);
    var rotateY = ((originY / 2) - mousePosY) * 0.035;

    if(rotateY < 0) {
        rotateY = -1 * rotateY;
    }

    elem.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) rotateZ(0deg) scale(1)";

    if(elembody){
        elembody.addEventListener('mouseover', mOverCardBody(elembody), false);
    }
}

function mOverCardBody(obj) {
    var translateX = -(((originX / 2) - mousePosX) * 0.01);
    var translateY = -((originY / 2) - mousePosY) * 0.01;
    obj.style.transform = "TranslateX(" + translateX + "px) TranslateY(" + translateY + "px)";
}

function mOut() {
    elembody.style.transform = "TranslateX(0px) TranslateY(0px)";
    elem.style.transform = "rotateY(1deg) rotateX(0deg) rotateZ(0deg) scale(1)";
}