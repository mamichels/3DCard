/**
 * Created by PhpStorm.
 * User: Philipnormal
 * Date: 08.11.18
 * Time: 17:14
 * License: MIT
 */

let mousePosX;
let mousePosY;
let element = document.getElementById('multidimensional-card');
let elembody = document.getElementById('multidimensional-card-body');
let originX = element.offsetWidth;
let originY = element.offsetHeight;
let rotateX;
let rotateY;
let translateX;
let translateY;

//elem.addEventListener('mouseenter', mIn, false);
element.addEventListener('mousemove', onMousemove, false);
element.addEventListener('mouseout', mOut, false);

function onMousemove(e){
    let m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0, obj = this;
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
    rotateX = -(((originX / 2) - mousePosX) * 0.035);
    rotateY = ((originY / 2) - mousePosY) * 0.035;

    if(rotateY < 0) {
        rotateY = -1 * rotateY;
    }

    element.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) rotateZ(0deg) scale(1.03)";

    if(elembody){
        translateX = -(((originX / 2) - mousePosX) * 0.01);
        translateY = -((originY / 2) - mousePosY) * 0.01;
        elembody.style.transform = "TranslateX(" + translateX + "px) TranslateY(" + translateY + "px)";
    }
}

/*
function mIn() {
    elem.style.animation = "shiftCard 0.25s";
    elembody.style.animation = "shiftCardBody 0.25s";
}
*/

function mOut() {
    if(elembody) {
        elembody.style.transform = "none";
    }
    element.style.transform = "rotateY(1deg) rotateX(0deg) rotateZ(0deg) scale(1)";
    element.style.animation = "";
}