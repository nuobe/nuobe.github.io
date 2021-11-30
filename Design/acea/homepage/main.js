/******************************* helper functions ***************************************** */
// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
          window.setTimeout(callback, 1000 / 60);
        };
  })();
  
/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
  
window.requestTimeout = function(fn, delay) {
    if( !window.requestAnimationFrame       && 
        !window.webkitRequestAnimationFrame && 
        !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !window.oRequestAnimationFrame      && 
        !window.msRequestAnimationFrame)
        return window.setTimeout(fn, delay);
        
    var start = new Date().getTime(),
        handle = new Object();
        
    function loop(){
        var current = new Date().getTime(),
        delta = current - start;
        
        delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
    };

    handle.value = requestAnimFrame(loop);
    return handle;
};
/***************************************** */
function testBrowserSupportPassive_05nuo(){
    let supportsPassive = false;

    // modern Chrome requires { passive: false } when adding event
    //test if browser supports passive option
    try {
        let options = {
            get passive(){
                supportsPassive = true;
                return false;
            }
        }  
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
    } catch(e) {
        supportsPassive = false;
    }

    return supportsPassive;
}

const supportPassive_05nuo = testBrowserSupportPassive_05nuo();
const eventListenerOption_05nuo = supportPassive_05nuo ? { passive: false } : false;

function lerp_05nuo(v1, v2, speed, delta){
    return v1 + (v2 - v1) * (1 - Math.pow(speed, delta));
}

function getScrollbarWidth_05nuo() {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

const scrollBarWidth_05nuo = getScrollbarWidth_05nuo();

window.mobileAndTabletCheck_05nuo = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

const isMobileOrTablet_05nuo = mobileAndTabletCheck_05nuo();

function swipeDetect_05nuo(el, btns, callback){
    //variables for swipes
    let touchsurface = el,
    swipedir = "none",
    startX,
    startY,
    distX,
    distY,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 50, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 700, // maximum time allowed to travel that distance
    elapsedTime,
    startTime;

    //varibales for moves
    let movedir = "none", 
    previousMove = undefined, 
    currentMove = undefined, 
    moveDistX = 0, 
    moveDistY = 0, 
    moveRestraint = 10;

    let canDetectTouchMove = true;
    let handleswipe = callback || function(swipedir, movedir){};

    if(Array.isArray(btns)){
        for(let i = 0; i < btns.length; i++){
            btns[i].addEventListener('touchstart', ()=>{
                canDetectTouchMove = false;
            }, eventListenerOption_05nuo);

            btns[i].addEventListener('touchend', ()=>{
                canDetectTouchMove = true;
            });
            window.addEventListener('touchend', ()=>{
                canDetectTouchMove = true;
            })
        }
    }

    touchsurface.addEventListener('touchstart', function(e){
        let touchobj = e.changedTouches[0];
        swipedir = `none`;
        movedir = `none`;
        moveDistX = 0;
        moveDistY = 0;
        distX = 0;
        distY = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }, eventListenerOption_05nuo)

    touchsurface.addEventListener('touchmove', function(e){
        if(canDetectTouchMove){
            let touches = e.changedTouches;
            let l = touches.length;
            for (let i = 0; i < l; i++){
                if(previousMove === undefined) previousMove = touches[i];
                currentMove = touches[i];
                moveDistX = currentMove.pageX - previousMove.pageX;
                moveDistY = currentMove.pageY - previousMove.pageY;
                movedir = "none";
                if(Math.abs(moveDistX) <= moveRestraint){ 
                    if(movedir !== 0){
                        movedir = (moveDistY < 0) ? `up` : `down`;
                    }
                }
                previousMove = currentMove;
                handleswipe(swipedir, movedir);
            }
        }
        else{
            movedir = "none";
            handleswipe(swipedir, movedir);
        }
    }, eventListenerOption_05nuo);

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        // first condition for awipe met
        swipedir = "none";
        movedir = "none";
        if (elapsedTime <= allowedTime){
            if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){
                // if dist traveled is negative, it indicates up swipe
                swipedir = (distY < 0)? 'up' : 'down';
            }
        }
        handleswipe(swipedir, movedir);
    }, eventListenerOption_05nuo);
}

/************************************************************************************************************* 
 ***************************** responsive feature for svg, title div and texts ******************************* 
 ************************************************************************************************************* 
*/

/** CHANGE LINKS URL HERE: links for cta buttons */
let employerLink_05nuo = "/",
    institutionLink_05nuo = "/",
    associationLink_05nuo = "/",
    educatorLink_05nuo = "/";

const headerTitle_05nuo = document.getElementById("header-title-05nuo");

const svg_05nuo = document.getElementById("header-svg-05nuo");
const fullHeader_05nuo = document.getElementById("header-container-05nuo");
const navButtonContainer_05nuo = document.getElementById("nav-buttons-05nuo");

//variables for the three main text sections
const enterprisePanel_05nuo = document.getElementById("enterprise-panel-05nuo");
const institutionPanel_05nuo = document.getElementById("institution-panel-05nuo");
const associationPanel_05nuo = document.getElementById("association-panel-05nuo");
const ascFlexContainer_05nuo = associationPanel_05nuo.children.item(0);
const ascHalfPanel_05nuo = document.getElementById("asc-half-panel-05nuo");
const eduHalfPanel_05nuo = document.getElementById("edu-half-panel-05nuo");
const ascTitle_05nuo = ascHalfPanel_05nuo.children.item(0);
const ascText_05nuo = ascHalfPanel_05nuo.children.item(1);
const eduTitle_05nuo = eduHalfPanel_05nuo.children.item(0);
const eduText_05nuo = eduHalfPanel_05nuo.children.item(1);

const ctaBtn1Bg_05nuo = document.getElementById("cta-btn1-bg-05nuo");
const ctaBtn2Bg_05nuo = document.getElementById("cta-btn2-bg-05nuo");
const ctaBtn3Bg_05nuo = document.getElementById("cta-btn3-bg-05nuo");
const ctaBtn4Bg_05nuo = document.getElementById("cta-btn4-bg-05nuo");

const ctaBtn1_05nuo = ctaBtn1Bg_05nuo.parentElement;
const ctaBtn2_05nuo = ctaBtn2Bg_05nuo.parentElement;
const ctaBtn3_05nuo = ctaBtn3Bg_05nuo.parentElement;
const ctaBtn4_05nuo = ctaBtn4Bg_05nuo.parentElement;


const widthLimit_05nuo = 1050;
let whRatio_05nuo = 2.3;

// svg width height ratio & min width in responsive mode
const minSVGW_H_05nuo = 1160;
const svgWRatioH_05nuo = 0.7;

//store svg width, height, left, top values after resize
let svgHeight_05nuo = 0;
let svgWidth_05nuo = 0;
let svgLeft_05nuo = 0;
let svgTop_05nuo = 0;

//detect if svg is in scroll mode
let isSvgScroll_05nuo = false;

//set static title responsively
function responsiveHeaderTitle(headerTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const subtitle = headerTitle.children.item(0);
    const subtitleItem1 = subtitle.children.item(1);
    const subtitleLine1 = subtitle.children.item(0);
    const subtitleLine2 = subtitle.children.item(2);

    if(width < widthLimit_05nuo && width < height){
        subtitle.style.setProperty("display", "flex");
        subtitleLine1.style.setProperty("width", "4px");
        subtitle.style.setProperty("gap", "20px");
        subtitle.style.setProperty("width", "100%");
        subtitle.style.setProperty("font-size", "40px");
        subtitle.style.setProperty("justify-content", "center");
        subtitle.style.setProperty("text-align", "center");
        subtitleItem1.innerHTML = "Manage Continuing Education<br><em>without</em> the Admin Work";
        subtitleLine1.innerHTML = `<span style="opacity: 0;user-select: none;">B</span>`;
        subtitleLine2.innerHTML = `<span style="opacity: 0;user-select: none;">B</span>`;
        subtitleItem1.style.setProperty("margin-right", `0`);
        subtitleItem1.style.setProperty("line-height", 'normal');

        if(width < 680){
            subtitle.style.setProperty("text-align", "left");
            subtitleLine1.style.setProperty("width", "0");
            subtitle.style.setProperty("gap", "5px");
            subtitle.style.setProperty("justify-content", "flex-start");
            subtitleItem1.innerHTML = "Continuing Education<br>Without the Admin Work";
            subtitleLine2.innerHTML = `<span style="opacity: 0;user-select: none;">B<br>B</span>`;

            let fsize = 40/540 * width;
            let lineH = fsize * 1.35;
            if(width < 500){
                lineH = fsize * 1.75;
            } 
            if(width < 360){
                fsize =26/360 * width;
            }
            if(width < 220){
                subtitleItem1.innerHTML = "Continuing<br>Education<br>without<br>the Admin Work";
            }
            fsize = fsize > 45 ? 45 : fsize;
            fsize = fsize < 16 ? 16 : fsize;


            subtitle.style.setProperty("font-size", `${fsize}px`);
            subtitleItem1.style.setProperty("margin-right", `10px`);
            subtitleItem1.style.setProperty("line-height", `${lineH}px`);
        }
    }
    else{
        let titleSize = 45;

        if(width > 1920 && width <= 2300){
            titleSize = 51;
        }
        else if(width > 2300 && width <= 2700){
            titleSize = 57;
        }
        else if(width > 2700 && width <= 3300){
            titleSize = 61;
        }
        else if(width > 3300 && width <= 3700){
            titleSize = 75;
        }
        else if(width > 3700){
            titleSize = 80;
        }

        subtitle.style.setProperty("justify-content", "center");
        subtitle.style.setProperty("text-align", "center");
        subtitle.style.setProperty("font-size", `${titleSize}px`);
        subtitle.style.setProperty("display", "flex");      
        subtitleLine1.style.setProperty("width", "4px");
        subtitle.style.setProperty("gap", "20px");
        subtitleItem1.style.setProperty("margin-right", `0`);
        subtitleItem1.style.setProperty("line-height", 'normal');

        if(width < 1420 && width >= 1250){
            subtitle.style.setProperty("font-size", "37px");    
        }
        else if(width < 1250 && width >= 880){
            subtitle.style.setProperty("font-size", "34px");    
        }
        else if(width < 880 && width >= 600 ){
            subtitle.style.setProperty("font-size", "30px");
        }
        else if(width < 600 && width >= 400){
            subtitle.style.setProperty("font-size", "25px");
        }
        else if(width < 400){
            subtitle.style.setProperty("font-size", "17px");
        }

        if(width < 880){
            headerTitle.style.setProperty("flex-direction", "column");
            headerTitle.style.setProperty("gap", "5px");
        }

        if(width < widthLimit_05nuo){
            subtitleItem1.innerHTML = "Manage Continuing Education<br><span class='title-stress-05nuo'>without</span> the Admin Work";
            subtitleLine1.innerHTML = `<span style="opacity: 0;user-select: none;">B<br>B</span>`;
            subtitleLine2.innerHTML = `<span style="opacity: 0;user-select: none;">B<br>B</span>`;
        }
        else{
            subtitleItem1.innerHTML = "Manage Continuing Education <span class='title-stress-05nuo'>without</span> the Admin Work";
            subtitleLine1.innerHTML = `<span style="opacity: 0;user-select: none;">B</span>`;
            subtitleLine2.innerHTML = `<span style="opacity: 0;user-select: none;">B</span>`;
        }
    }
}

//make svg and its container responsive in horizontal mode
function responsiveSVG_05nuo(container, svg, headerTitle, state=0){
    const width = window.innerWidth;
    const height = window.innerHeight;
    let w = width;
    let h;
    let top;
    let left;
    let svgW;
    let svgH;

    let titleHeight = headerTitle.offsetHeight;

    //before svg is in scroll mode(this will always be run first when refreshed)
    if(!isSvgScroll_05nuo){
        if(width < widthLimit_05nuo && width < height){
            svgH = ( height - titleHeight - headerTitle.offsetTop ) * 0.9;
            svgW = svgH * 1.604;
            left = (svgW - w) / -2;
        }
        else{
            svgW = w * svgWRatioH_05nuo;
            if(svgW < minSVGW_H_05nuo / window.devicePixelRatio){
                svgW = minSVGW_H_05nuo / window.devicePixelRatio;
            }
            svgH = svgW / 1.604;
            left = (w - svgW) / 2;
        }
        top = (titleHeight + headerTitle.offsetTop) * 1.15;
        h = svgH + top;
    }
    //after svg is in scroll
    else{
        if(width < widthLimit_05nuo && width < height){
            svgW = w * 1.2;
            svgH = svgW / 1.604;

            top = (titleHeight + headerTitle.offsetTop) * 1.15;
            svg.classList.add("svg-mobile-clip-path-05nuo");
            svg.classList.remove("svg-clip-path-05nuo");
        }
        else{
            svgW = w * 0.67;
            svgH = svgW / 1.604;
            top = (titleHeight + headerTitle.offsetTop) * 1.15;
            svg.classList.add("svg-clip-path-05nuo");
            svg.classList.remove("svg-mobile-clip-path-05nuo");
        }
        //set svg left in scroll mode based on scroll state
        if(state === 0){
            let dist = w - scrollBarWidth_05nuo - svgW;
            left = dist - 120 / 1920 * w;
        }
        else if(state === 1){
            left = w * 0.05;
        }
        else if(state === 2){
            let dist = w - scrollBarWidth_05nuo - svgW;
            left = dist / 2 - 0.02 * svgW;
        }
    }

    svgHeight_05nuo = svgH;
    svgWidth_05nuo = svgW;
    svgLeft_05nuo = left;
    svgTop_05nuo = top;

    container.style.width = `${w}px`;  
    container.style.height = `${h}px`;
    svg.style.width = `${svgW}px`;
    svg.style.height = `${svgH}px`;
    svg.style.top = `${top}px`;
    svg.style.left = `${left}px`;
}

function responsiveNavButton_05nuo(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    let top;
    let left;
    let w;
    let h;

    let buttonW;
    let buttonH;
    let gap;

    const smallScreenAdapt = function(){
        buttonH = buttonW = `clamp(15px, 2vmax, 25px)`;
        gap = 30;

        navButtonContainer_05nuo.style.setProperty("height", `${buttonH}`);
        w = navButtonContainer_05nuo.offsetHeight * 4 + gap * 3;
        navButtonContainer_05nuo.style.setProperty("width", `${w}px`);
        navButtonContainer_05nuo.style.setProperty("flex-direction", `row`);

        top = (height - navButtonContainer_05nuo.offsetHeight) * 0.95;
        left = (width - navButtonContainer_05nuo.offsetWidth) * 0.5;
    }
    const normalScreenAdapt = function(){
        buttonW = buttonH = `clamp(20px, 1.15vmax, 80px)`;
        gap = 20;

        navButtonContainer_05nuo.style.setProperty("width", `${buttonW}`);
        h = navButtonContainer_05nuo.offsetWidth * 4 + gap * 3;
        navButtonContainer_05nuo.style.setProperty("height", `${h}px`);
        navButtonContainer_05nuo.style.setProperty("flex-direction", `column`);

        top = (height - navButtonContainer_05nuo.offsetHeight) * 0.95;
        left = navButtonContainer_05nuo.offsetWidth * 1.5;
    }

    if(width < widthLimit_05nuo && width < height){
        smallScreenAdapt();
    }
    else{
        normalScreenAdapt();
        if(height < 550){
            smallScreenAdapt();
        }
    }

    navButtonContainer_05nuo.style.setProperty("gap", `${gap}px`);
    let children = navButtonContainer_05nuo.children
    for(let i = 0; i < children.length; i++){
        children.item(i).style.setProperty("width", `${buttonW}`);
        children.item(i).style.setProperty("height", `${buttonH}`);
    }

    navButtonContainer_05nuo.style.setProperty("top", `${top}px`);
    navButtonContainer_05nuo.style.setProperty("left", `${left}px`);
}

// responsive font size for the three panels: enterprise, institution, association
function getSectionFontSize_05nuo(width, height){
    let titleSize, paragraphSize;

    if(width < widthLimit_05nuo){
        if(width < height){
            if(width >= 590){
                titleSize = 31;
                paragraphSize = 25;
                //when screen narrow in height
                if(height < 850 && height >= 700){
                    titleSize = 26;
                    paragraphSize = 20;
                }
                else if(height < 700){
                    titleSize = 24;
                    paragraphSize = 18;
                }
            }
            else if(width < 590 && width >= 450){
                titleSize = 28;
                paragraphSize = 22;
                //when screen narrow in height
                if(height < 700 && height >= 600){
                    titleSize = 27;
                    paragraphSize = 20;
                }
                else if(height < 600){
                    titleSize = 22;
                    paragraphSize = 16;
                }
            }
            else if(width < 450){
                titleSize = 25/450 * width;
                paragraphSize = 19/450 * width;
                //when screen narrow in height
                if(height < 650 && height >= 550){
                    titleSize = 23.5/450 * width;
                    paragraphSize = 17/450 * width;
                }
                else if(height < 550){
                    titleSize = 19/450 * width;
                    paragraphSize = 13/450 * width;
                }
            }
        }
        //when screen is narrow in height
        else{
            titleSize = 30;
            paragraphSize = 23;

            if(height < 600 && height >= 400){
                titleSize = 26;
                paragraphSize = 20;
            }
            else if(height < 400){
                titleSize = 26/1050 * width;
                paragraphSize = 20/1050 * width;
            }
        }
        titleSize = titleSize < 18 ? 18 : titleSize;
        paragraphSize = paragraphSize < 12 ? 12 : paragraphSize;
    }
    else{
        titleSize = 38;
        paragraphSize = 30;

        if(width < 1200){
            titleSize = 30;
            paragraphSize = 24;
        }

        if(width > 1920 && width <= 2300){
            titleSize = 44;
            paragraphSize = 38;
        }
        else if(width > 2300 && width <= 2700){
            titleSize = 48;
            paragraphSize = 42;
        }
        else if(width > 2700 && width <= 3300){
            titleSize = 53;
            paragraphSize = 47;
        }
        else if(width > 3300 && width <= 3700){
            titleSize = 56;
            paragraphSize = 50;
        }
        else if(width > 3700){
            titleSize = 65;
            paragraphSize = 59;
        }

        //when screen is narrow in height
        if(height < 550){
            titleSize = 29;
            paragraphSize = 23;
            if(width < 1150){
                titleSize = 25;
                paragraphSize = 19;
            }
        }
    }
    return {titleSize, paragraphSize};
}

// responsive title and paragraph for enterprise and institution panel
function responsiveSectionText_05nuo(section, idx, btnBg){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const content = section.children;
    const title = content.item(0);
    const paragraph = content.item(1);
    const ctaBtn = btnBg.parentElement;

    //the part of svg that is not in view (clip path)
    let svgWPortion;
    let hGapToSet = "";
    // let animGapToSet = "";
    if(idx === 0){
        svgWPortion = 0.72;
        hGapToSet = "padding-right";
    }
    else if(idx === 1){
        svgWPortion = 0.345;
        hGapToSet = "padding-left";
    }

    //padding sizes for title, paragraph and anim
    let titleTop = 0,
        titleRight = 0,
        pTop = 0,
        pRight = 0;

    //get font sizes for title and paragraph
    let {titleSize, paragraphSize} = getSectionFontSize_05nuo(width, height);

    //set cta btn font size
    let btnFontSize = paragraphSize * 0.85;

    //smaller vertical screen cases
    if(width < widthLimit_05nuo && width < height){
        let svgW = width * 1.2;
        let svgLeft = 0;

        if(idx === 0){
            let dist = width - scrollBarWidth_05nuo - svgW;
            svgLeft = dist - 120 / 1920 * width;

            section.style.setProperty("text-align", "left");
            ctaBtn.classList.add("btn-align-left-05nuo");
            ctaBtn.classList.remove("btn-align-right-05nuo");

            title.innerHTML = `<i class="far fa-building"></i> Employers<br>& Enterprise`;
            titleRight = section.offsetWidth - svgW * svgWPortion - svgLeft + 50/1050*width;
        }
        else if(idx === 1){
            svgLeft = width * 0.05;

            title.innerHTML = `<i class="far fa-hospital"></i> Healthcare<br>Institutions`;
            titleRight = svgW * svgWPortion + svgLeft + 50/1050*width;
        }

        titleTop = (section.offsetHeight - title.offsetHeight - pTop - paragraph.offsetHeight) * 0.35;

        pRight = titleRight;
        pTop = titleSize - 5/1000 * width;
    }
    //wider screen cases
    else{
        let rightGap = 150/1920*width;
        rightGap = rightGap > 220 ? 220 : rightGap;

        let svgW = width * 0.67;
        let svgLeft = 0;
        if(idx === 0){
            let dist = width - scrollBarWidth_05nuo - svgW;
            svgLeft = dist - 120 / 1920 * width;

            section.style.setProperty("text-align", "right");
            ctaBtn.classList.add("btn-align-right-05nuo");
            ctaBtn.classList.remove("btn-align-left-05nuo");

            title.innerHTML = `<i class="far fa-building"></i> Employers & Enterprise`;
            titleRight = pRight = section.offsetWidth - svgW * svgWPortion - svgLeft + rightGap;
        }
        else if(idx === 1){
            svgLeft = width * 0.05;

            title.innerHTML = `<i class="far fa-hospital"></i> Healthcare Institutions`;
            titleRight = pRight = svgW * svgWPortion + svgLeft + rightGap;
        }

        //set paragraph margin top
        pTop = titleSize - 5/55*titleSize;

        //set title margin top
        titleTop = (section.offsetHeight - title.offsetHeight - pTop - paragraph.offsetHeight) * 0.45;
    }

    title.style.setProperty("margin-top", `${titleTop}px`);
    title.style.setProperty(hGapToSet, `${titleRight}px`);
    title.style.setProperty("font-size", `${titleSize}px`);

    paragraph.style.setProperty(hGapToSet, `${pRight}px`);
    paragraph.style.setProperty("margin-top", `${pTop}px`);
    paragraph.style.setProperty("font-size", `${paragraphSize}px`);
    section.style.setProperty("--btn-font-size-05nuo", `${btnFontSize}px`);

    //set cta btn background paddings
    let paddingH = parseFloat(window.getComputedStyle(ctaBtn).getPropertyValue("padding-left")) * 0.8;

    const bgText = btnBg.querySelector(".btn-bg-text-05nuo");
    let paddingV = (btnBg.offsetHeight - bgText.offsetHeight) / 2;

    btnBg.style.setProperty("padding-top", `${paddingV}px`);
    btnBg.style.setProperty("padding-bottom", `${paddingV}px`);
    btnBg.style.setProperty("--narrow-padding-05nuo",`${paddingH}px`);
}

// responsive title and paragraph for association panel
function responsiveAscText_05nuo(section, gap){
    const width = window.innerWidth;
    const height = window.innerHeight;

    const ascCtaBtn = ctaBtn3Bg_05nuo.parentElement;
    const eduCtaBtn = ctaBtn4Bg_05nuo.parentElement;

    let ascWidth, eduWidth = 0;
    let ascTop, eduTop = 0;
    let ascPTop, ascPBottom, eduPTop, eduPBottom = 0;
    //left & right padding
    let padding, padding_large = 0;
    let ascHeight = 0;
    let eduHeight = 0;

    //set title size
    let {titleSize, paragraphSize} = getSectionFontSize_05nuo(width, height);
    let btnFontSize;

    ascHalfPanel_05nuo.children.item(0).style.setProperty("font-size", `${titleSize}px`);
    ascHalfPanel_05nuo.children.item(1).style.setProperty("font-size", `${paragraphSize}px`);
    eduHalfPanel_05nuo.children.item(0).style.setProperty("font-size", `${titleSize}px`);
    eduHalfPanel_05nuo.children.item(1).style.setProperty("font-size", `${paragraphSize}px`);

    const ascChildren = ascHalfPanel_05nuo.children;
    const eduChildren = eduHalfPanel_05nuo.children;

    //narrow screen
    if(width < widthLimit_05nuo && width < height){
        btnFontSize = paragraphSize * 0.75;
        ascWidth = eduWidth = width;
        //set association flex item height
        ascHeight = (section.offsetHeight*0.9 - gap) / 2;
        eduHeight = (section.offsetHeight*0.9 - gap) / 2;
        ascHalfPanel_05nuo.style.setProperty("height", `${ascHeight}px`);
        eduHalfPanel_05nuo.style.setProperty("height", `${eduHeight}px`);

        //set padding top and bottom
        eduPTop = eduPBottom = 0.025 * section.offsetHeight;
        ascPBottom = 0.035 * section.offsetHeight;
        ascPTop = ascHeight - (ascChildren.item(0).offsetHeight + ascChildren.item(1).offsetHeight + ascPBottom);
        //set flex items left and right paddings
        padding = padding_large = 0.05 * ascWidth;
        padding = padding < 50 ? 50 : padding;
        padding_large = padding_large < 50 ? 50 : padding_large;
        //set flex items marign top
        eduTop = ascTop = 0;
    }
    //wide screen
    else{
        btnFontSize = paragraphSize * 0.85;
        //set padding top and bottom
        ascPTop = ascPBottom = eduPTop = eduPBottom = 0.02 * section.offsetHeight;
        //set flex items width
        let totalSpace = section.offsetWidth - gap;
        //set association flex item height
        ascHeight = ascChildren.item(0).offsetHeight + ascChildren.item(1).offsetHeight + ascPTop + ascPBottom;
        eduHeight = eduChildren.item(0).offsetHeight + eduChildren.item(1).offsetHeight + eduPTop + eduPBottom;
        ascHalfPanel_05nuo.style.setProperty("height", `${ascHeight}px`);

        ascWidth = eduWidth = totalSpace / 2;
        //set flex items left and right paddings
        padding = padding_large = 0.03 * ascWidth;
        padding = padding < 30 ? 30 : padding;
        padding_large = padding_large < 50 ? 50 : padding_large;
        //set flex items margin top
        let svgH = width * 0.67 / 1.604;
        ascTop = (section.offsetHeight - svgH) / 1.5;
        if(width < 1600 && width >= widthLimit_05nuo){
            ascTop = (section.offsetHeight - svgH) / 2.5;
        }
        else if(width < widthLimit_05nuo){
            ascTop = (section.offsetHeight - svgH) / 3;
        }
        ascTop = ascTop < 20 ? 20: ascTop;
            //the portion of svg image viewable 
        let viewableImgH = svgH > section.offsetHeight ? section.offsetHeight : svgH;
        eduTop = (section.offsetHeight - viewableImgH) / 2 + viewableImgH / 2.5;
        if(eduTop + eduHalfPanel_05nuo.offsetHeight > section.offsetHeight){
            eduTop = section.offsetHeight - eduHalfPanel_05nuo.offsetHeight - 40;
        }
        eduTop = eduTop < 20 ? 20: eduTop;
    }

    associationPanel_05nuo.style.setProperty("--btn-font-size-05nuo", `${btnFontSize}px`);

    ascHalfPanel_05nuo.style.setProperty("width", `${ascWidth}px`);
    eduHalfPanel_05nuo.style.setProperty("width", `${eduWidth}px`);

    ascHalfPanel_05nuo.style.setProperty("margin-top", `${ascTop}px`);
    eduHalfPanel_05nuo.style.setProperty("margin-top", `${eduTop}px`);

    ascHalfPanel_05nuo.style.setProperty("padding-top", `${ascPTop}px`);
    ascHalfPanel_05nuo.style.setProperty("padding-bottom", `${ascPBottom}px`);
    eduHalfPanel_05nuo.style.setProperty("padding-top", `${eduPTop}px`);
    eduHalfPanel_05nuo.style.setProperty("padding-bottom", `${eduPBottom}px`);

    ascHalfPanel_05nuo.style.setProperty("padding-left", `${padding}px`);
    ascHalfPanel_05nuo.style.setProperty("padding-right", `${padding_large}px`);
    eduHalfPanel_05nuo.style.setProperty("padding-left", `${padding_large}px`);
    eduHalfPanel_05nuo.style.setProperty("padding-right", `${padding}px`);

    //set cta btn paddings
    const ascBgText = ctaBtn3Bg_05nuo.querySelector(".btn-bg-text-05nuo");
    let ascPaddingV = (ctaBtn3Bg_05nuo.offsetHeight - ascBgText.offsetHeight) / 2;

    const eduBgText = ctaBtn4Bg_05nuo.querySelector(".btn-bg-text-05nuo");
    let eduPaddingV = (ctaBtn4Bg_05nuo.offsetHeight - eduBgText.offsetHeight) / 2;

    let ascPaddingH = parseFloat(window.getComputedStyle(ascCtaBtn).getPropertyValue("padding-left"));
    let eduPaddingH = parseFloat(window.getComputedStyle(eduCtaBtn).getPropertyValue("padding-left"));

    ctaBtn3Bg_05nuo.style.setProperty("padding-top", `${ascPaddingV}px`);
    ctaBtn3Bg_05nuo.style.setProperty("padding-bottom", `${ascPaddingV}px`);
    ctaBtn3Bg_05nuo.style.setProperty("--narrow-padding-05nuo", `${ascPaddingH}px`);

    ctaBtn4Bg_05nuo.style.setProperty("padding-top", `${eduPaddingV}px`);
    ctaBtn4Bg_05nuo.style.setProperty("padding-bottom", `${eduPaddingV}px`);
    ctaBtn4Bg_05nuo.style.setProperty("--narrow-padding-05nuo", `${eduPaddingH}px`);
}

function responsiveEnterprisePanel_05nuo(){
    responsiveSectionText_05nuo(enterprisePanel_05nuo, 0, ctaBtn1Bg_05nuo);
}
function responsiveInstitutionPanel_05nuo(){
    responsiveSectionText_05nuo(institutionPanel_05nuo, 1, ctaBtn2Bg_05nuo);
}

function responsiveAssociationPanel_05nuo(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    let gap = 0;
    let dir = "";
    
    if(width < widthLimit_05nuo && width < height){
        let svgH = width * 1.2 / 1.604;
        gap = 0.54 * svgH;
        dir="column";
    }
    else{
        let svgW = width * 0.67;
        gap = 0.31 * svgW;
        dir="row";
    }

    ascFlexContainer_05nuo.style.setProperty("gap", `${gap}px`);
    ascFlexContainer_05nuo.style.setProperty("flex-direction", `${dir}`);

    responsiveAscText_05nuo(associationPanel_05nuo, gap);
}

function resizeHero_05nuo(state=0){
    if(svgScrollTriggerPoints_05nuo){
        state = svgScrollTriggerPoints_05nuo.scrollState;
    }
    responsiveSVG_05nuo(fullHeader_05nuo, svg_05nuo, headerTitle_05nuo,state);
}

function responsiveTitle_05nuo(){
    responsiveHeaderTitle(headerTitle_05nuo);
}

/*************************************************************************************************
 * ********************************** transition for button, in between texts**************************
 * ***************************************************************************************************
 */

/** set navigation buttons hover and click effects*/
let navButtonClicked_05nuo = [true, false, false, false],
    navButtonHover_05nuo = [false, false, false, false],
    normalBtnColor_05nuo = "rgb(127, 133, 216)",
    hoverBtnColor_05nuo = "rgb(93, 93, 187)";

function updateBtnColors_05nuo(curPanel, btnIdx){
    let children = navButtonContainer_05nuo.children;
    if(curPanel === 2){
        normalBtnColor_05nuo = "rgb(209, 206, 218)";
        hoverBtnColor_05nuo = "rgb(233, 234, 240)";

    }
    else{
        normalBtnColor_05nuo = "rgb(127, 133, 216)";
        hoverBtnColor_05nuo = "rgb(93, 93, 187)";
    }

    if(navButtonHover_05nuo[btnIdx]){
        children[btnIdx].style.setProperty("background", `${hoverBtnColor_05nuo}`);
    }
    else{
        children[btnIdx].style.setProperty("background", `${normalBtnColor_05nuo}`);
    }
}

function enterNavButton_05nuo(btn){
    btn.style.setProperty("transform", "scale(1.7)");
    btn.style.setProperty("border-radius", "100%");
    btn.style.setProperty("background", `${hoverBtnColor_05nuo}`);
}
function leaveNavButton_05nuo(btn){
    btn.style.setProperty("transform", "scale(1)");
    btn.style.setProperty("border-radius", "20%");
    btn.style.setProperty("background", `${normalBtnColor_05nuo}`);
}
function clickNavButton_05nuo(btn){
    btn.style.setProperty("transform", "scale(0.5)");
    btn.style.setProperty("cursor", "default");
    btn.style.setProperty("border-radius", "20%");
    btn.style.setProperty("background", `${normalBtnColor_05nuo}`);
    btn.setAttribute("aria-pressed", "true");
}
function unClickNavButtonHover_05nuo(btn){
    btn.style.setProperty("transform", "scale(1.7)");
    btn.style.setProperty("border-radius", "100%");
    btn.style.setProperty("cursor", "pointer");
    btn.style.setProperty("background", `${hoverBtnColor_05nuo}`);
    btn.setAttribute("aria-pressed", "false");
}
function unClickNavButtonNoHover_05nuo(btn){
    btn.style.setProperty("transform", "scale(1)");
    btn.style.setProperty("border-radius", "20%");
    btn.style.setProperty("cursor", "pointer");
    btn.style.setProperty("background", `${normalBtnColor_05nuo}`);
    btn.setAttribute("aria-pressed", "false");
}

function setNavButtonsHoverClick_05nuo(){
    let children = navButtonContainer_05nuo.children;
    for(let i = 0; i < children.length; i++){
        let btn = children.item(i);
        btn.addEventListener("mouseenter", ()=>{
            if(!navButtonClicked_05nuo[i]){
                navButtonHover_05nuo[i] = true;
                enterNavButton_05nuo(btn);
            }
        });
        btn.addEventListener("touchstart", ()=>{
            if(!navButtonClicked_05nuo[i]){
                navButtonHover_05nuo[i] = true;
                enterNavButton_05nuo(btn);
            }
        });
        btn.addEventListener("mouseleave", ()=>{
            if(!navButtonClicked_05nuo[i]){
                navButtonHover_05nuo[i] = false;
                leaveNavButton_05nuo(btn);
            }
        });
        btn.addEventListener("touchend", ()=>{
            if(!navButtonClicked_05nuo[i]){
                navButtonHover_05nuo[i] = false;
                leaveNavButton_05nuo(btn);
                controlScroll_05nuo.snapScroll(i);            }
        });
        window.addEventListener("touchend", ()=>{
            if(!navButtonClicked_05nuo[i]){
                navButtonHover_05nuo[i] = false;
                leaveNavButton_05nuo(btn);
            }
        });

        btn.addEventListener("click", ()=>{
            if(!navButtonClicked_05nuo[i]){
                controlScroll_05nuo.snapScroll(i);
                btn.setAttribute("aria-pressed", "true");
            }
        })
    }
}

function setButtonClick_05nuo(curPanel){
    let children = navButtonContainer_05nuo.children;
    navButtonClicked_05nuo[curPanel] = true;
    navButtonHover_05nuo[curPanel] = false;
    clickNavButton_05nuo(children.item(curPanel));

    for(let i = 0; i < children.length; i++){
        if(i !== curPanel){
            if(navButtonHover_05nuo[i]){
                unClickNavButtonHover_05nuo(children.item(i));
            }
            else{
                unClickNavButtonNoHover_05nuo(children.item(i));        
            }
            navButtonClicked_05nuo[i] = false;
        }

        updateBtnColors_05nuo(curPanel, i);
    }
}

/**set cta btn hover effects */
function enterCtaBtnRight_05nuo(btn, isNarrow=false){
    if(isNarrow){
        btn.style.setProperty("animation", "btn-narrow-bg-slide-right-start-05nuo 0.3s ease 0s 1 normal both");
    }
    else{
        btn.style.setProperty("animation", "btn-bg-slide-right-start-05nuo 0.3s ease 0s 1 normal both");
    }
    btn.querySelector(".btn-bg-content-05nuo").style.setProperty("animation", "arrow-slide-right-start-05nuo 0.3s ease 0.27s 1 normal both");
}
function leaveCtaBtnRight_05nuo(btn, isNarrow=false){
    if(isNarrow){
        btn.style.setProperty("animation", "btn-narrow-bg-slide-right-end-05nuo 0.3s ease 0s 1 normal both");
    }
    else{
        btn.style.setProperty("animation", "btn-bg-slide-right-end-05nuo 0.3s ease 0s 1 normal both");
    }
    btn.querySelector(".btn-bg-content-05nuo").style.setProperty("animation", "arrow-slide-right-end-05nuo 0.35s ease 0s 1 normal both");
}

function setCtaBtnHover_05nuo(btn, isNarrow=false){
    //cta btn 1
    btn.parentElement.addEventListener("mouseenter", ()=>{
        enterCtaBtnRight_05nuo(btn, isNarrow);
    }, eventListenerOption_05nuo);
    btn.parentElement.addEventListener("mouseleave", ()=>{
        leaveCtaBtnRight_05nuo(btn, isNarrow);
    }, eventListenerOption_05nuo);
    btn.parentElement.addEventListener("touchstart", ()=>{
        enterCtaBtnRight_05nuo(btn, isNarrow);
    }, eventListenerOption_05nuo);
    btn.parentElement.addEventListener("touchend", ()=>{
        leaveCtaBtnRight_05nuo(btn, isNarrow);
    }, eventListenerOption_05nuo);
    window.addEventListener("touchend", ()=>{
        leaveCtaBtnRight_05nuo(btn, isNarrow);
    }, eventListenerOption_05nuo);
}

function setAllCtaBtnHover_05nuo(){
    setCtaBtnHover_05nuo(ctaBtn1Bg_05nuo);
    setCtaBtnHover_05nuo(ctaBtn2Bg_05nuo);
    setCtaBtnHover_05nuo(ctaBtn3Bg_05nuo, true);
    setCtaBtnHover_05nuo(ctaBtn4Bg_05nuo, true);
}


/**set cta btn click */
function ctaBtnLinkRedirect(link){
    window.location.assign(link);
}
function setCtaBtnClick_05nuo(btn, link){
    btn.setAttribute("href", link);
}
function setAllCtaBtnClick_05nuo(){
    setCtaBtnClick_05nuo(ctaBtn1_05nuo, employerLink_05nuo);
    setCtaBtnClick_05nuo(ctaBtn2_05nuo, institutionLink_05nuo);
    setCtaBtnClick_05nuo(ctaBtn3_05nuo, associationLink_05nuo);
    setCtaBtnClick_05nuo(ctaBtn4_05nuo, educatorLink_05nuo);
}

/**set section text and button transitions */
function transitionSectionTextBtn_05nuo(section, action, dir){
    const content = section.children;
    const title = content.item(0);

    const p = content.item(1).children;
    const pText = p.item(0);
    const btn = p.item(1);

    let toAddAction, toAddDir = "";
    let toRemoveAction, toRemoveDir = "";
    //action 1: show 0: hide
    // dir 1: up 0: down
    if(action === 0){
        toAddAction = "hide";
        toRemoveAction = "show";
    }
    else if(action === 1){
        toAddAction = "show";
        toRemoveAction = "hide";
    }

    if(dir === 0){
        toAddDir = "down";
        toRemoveDir = "up";
    }
    else if(dir === 1){
        toAddDir = "up";
        toRemoveDir = "down";
    }

    title.classList.remove(`title-${toRemoveAction}-up-05nuo`);
    title.classList.remove(`title-${toRemoveAction}-down-05nuo`);
    title.classList.remove(`title-${toAddAction}-${toRemoveDir}-05nuo`);
    title.classList.add(`title-${toAddAction}-${toAddDir}-05nuo`);

    pText.classList.remove(`p-${toRemoveAction}-up-05nuo`);
    pText.classList.remove(`p-${toRemoveAction}-down-05nuo`);
    pText.classList.remove(`p-${toAddAction}-${toRemoveDir}-05nuo`);
    pText.classList.add(`p-${toAddAction}-${toAddDir}-05nuo`);

    btn.classList.remove(`btn-${toRemoveAction}-up-05nuo`);
    btn.classList.remove(`btn-${toRemoveAction}-down-05nuo`);
    btn.classList.remove(`btn-${toAddAction}-${toRemoveDir}-05nuo`);
    btn.classList.add(`btn-${toAddAction}-${toAddDir}-05nuo`);
}

function setSectionTextBtnTransition(curPanel, lastPanel){
    if(curPanel === 0){
        if(lastPanel > curPanel){
            transitionSectionTextBtn_05nuo(enterprisePanel_05nuo, 0, 0); 
        }
    }
    else if(curPanel === 1){
        if(lastPanel < curPanel){
           transitionSectionTextBtn_05nuo(enterprisePanel_05nuo, 1, 1); 
        }
        else if(lastPanel > curPanel){
            transitionSectionTextBtn_05nuo(enterprisePanel_05nuo, 1, 0); 
            transitionSectionTextBtn_05nuo(institutionPanel_05nuo, 0, 0); 
        }
    }
    else if(curPanel === 2){
        if(lastPanel < curPanel){
            transitionSectionTextBtn_05nuo(enterprisePanel_05nuo, 0, 1); 
            transitionSectionTextBtn_05nuo(institutionPanel_05nuo, 1, 1); 
         }
         else if(lastPanel > curPanel){
             transitionSectionTextBtn_05nuo(institutionPanel_05nuo, 1, 0);
             transitionSectionTextBtn_05nuo(ascHalfPanel_05nuo, 0, 0);
             transitionSectionTextBtn_05nuo(eduHalfPanel_05nuo, 0, 1);
         }
    }
    else if(curPanel === 3){
        transitionSectionTextBtn_05nuo(ascHalfPanel_05nuo, 1, 1);
        transitionSectionTextBtn_05nuo(eduHalfPanel_05nuo, 1, 0);
        transitionSectionTextBtn_05nuo(institutionPanel_05nuo, 0, 1);
    }
}
/************************************************************************************************************ 
 * ****************************************** svg pan *******************************************************
 * **********************************************************************************************************
*/
let svgTranslateX_05nuo = 0;
let svgPrevTranslateX_05nuo = 0;
let svgPanAnim_05nuo = undefined;
let svgPanAnimLastTime_05nuo = undefined;
let svgPanDir_05nuo = 1;
let svgPanSpeed_05nuo = 0.2;
let stopSvgPan_05nuo = true;
let canCheckSvgPan_05nuo = true;
let svgPanInFocus_05nuo = true;

//check svg width to know if need to pan svg translate x
function svgPanCheck_05uo(){
    const svgWidth = svgWidth_05nuo;
    const width = window.innerWidth;

    if(svgWidth >= width * 1.15){
        stopSvgPan_05nuo = false;
    }
    else{
        stopSvgPan_05nuo = true;
    }
}

//set svg pan direction, translateX target and check to switch direction 
function svgPan_05nuo(svg, deltaTime){
    const svgLeft = svgLeft_05nuo;
    const svgWidth = svgWidth_05nuo;
    const width = window.innerWidth;

    let target;

    let totalDistance = svgLeft + svgTranslateX_05nuo;
    if((svgPanDir_05nuo > 0) && (totalDistance >= -80) 
    || ((svgPanDir_05nuo < 0) && (svgWidth + totalDistance) <= width + 40) ){
        svgPanDir_05nuo *= -1;
        svgTranslateX_05nuo = 0;
    }
    svgPanSpeed_05nuo = svgPanDir_05nuo < 0 ? 0.2 : 0.3;

    let traveled = Math.abs(svgTranslateX_05nuo + (svgWidth_05nuo - width)/2);
    if(svgPanDir_05nuo > 0){
        target = 0 - svgLeft - traveled/2;
    }
    else{
        target = svgWidth - width - Math.abs(svgWidth_05nuo - width - traveled);
    }

    let move =  target * svgPanSpeed_05nuo * svgPanDir_05nuo * deltaTime;
    svgTranslateX_05nuo = svgPrevTranslateX_05nuo + move;
    svgPrevTranslateX_05nuo = svgTranslateX_05nuo;

    let matrix = window.getComputedStyle(svg).getPropertyValue("transform");
    let matrixSplits = matrix.split(',');
    let ty = parseFloat(matrixSplits[matrixSplits.length - 1]);

    svg.style.setProperty(`transform`, `translateX(${svgTranslateX_05nuo}px) translateY(${ty}px)`);
}

//animate svg pan through request animation
function svgPanAnimate_05nuo(timestamp){
    if(svgPanAnimLastTime_05nuo === undefined){
        svgPanAnimLastTime_05nuo = timestamp;
    }

    let deltaTime = (timestamp - svgPanAnimLastTime_05nuo) / 1000;
    svgPanAnimLastTime_05nuo = timestamp;

    if(!stopSvgPan_05nuo){
        svgPan_05nuo(svg_05nuo, deltaTime);
        cancelAnimationFrame(svgPanAnim_05nuo);
        svgPanAnim_05nuo = requestAnimFrame(svgPanAnimate_05nuo);
    }
    else{
        cancelAnimationFrame(svgPanAnim_05nuo);
        svgPanAnimLastTime_05nuo = undefined;
    }
}

//set svg to pan back to original pos if pan is stopped
function svgStopPan_05nuo(svg, deltaTime){
    const speed = 1.5;
    let target = 0;
    let move = (target - svgPrevTranslateX_05nuo) * speed * deltaTime; 

    svgTranslateX_05nuo = svgPrevTranslateX_05nuo + move;
    svgPrevTranslateX_05nuo = svgTranslateX_05nuo;

    let matrix = window.getComputedStyle(svg).getPropertyValue("transform");
    let matrixSplits = matrix.split(',');
    let ty = parseFloat(matrixSplits[matrixSplits.length - 1]);
    svg.style.transform = `translateX(${svgTranslateX_05nuo}px) translateY(${ty}px)`;
}

//animate svg to pan back through request animation
function svgStopPanAnimate_05nuo(timestamp){
    if(svgPanAnimLastTime_05nuo === undefined){
        svgPanAnimLastTime_05nuo = timestamp;
    }

    let deltaTime = (timestamp - svgPanAnimLastTime_05nuo) / 1000;
    svgPanAnimLastTime_05nuo = timestamp;

    const svgLeft = svgLeft_05nuo;
    if(Math.abs((svgLeft + svgTranslateX_05nuo) - svgLeft) > 0.1){
        svgStopPan_05nuo(svg_05nuo, deltaTime);
        cancelAnimationFrame(svgPanAnim_05nuo);
        svgPanAnim_05nuo = requestAnimFrame(svgStopPanAnimate_05nuo);
        svgPanAnimLastTime_05nuo = timestamp;
    }
    else{
        cancelAnimationFrame(svgPanAnim_05nuo);
        svgPanAnimLastTime_05nuo = undefined;
    }
}

//the function to call to start check/initiate/stop svg pan
const svgPanStartCheck = function(){
    if(canCheckSvgPan_05nuo && svgPanInFocus_05nuo){
        svgPanCheck_05uo();
        if(!stopSvgPan_05nuo){
            cancelAnimationFrame(svgPanAnim_05nuo);
            svgPanAnim_05nuo = requestAnimFrame(svgPanAnimate_05nuo);
        }
        else{
            cancelAnimationFrame(svgPanAnim_05nuo);
            requestTimeout(()=>{
                svgPanAnim_05nuo = requestAnimFrame(svgStopPanAnimate_05nuo);
            }, 10);
        }
    }
    else{
        cancelAnimationFrame(svgPanAnim_05nuo);
        requestTimeout(()=>{
            svgPanAnim_05nuo = requestAnimFrame(svgStopPanAnimate_05nuo);
        }, 10);
    }
}

/* ************************************************************************************************************
*****************************************scroll control svg ***************************************************
*************************************************************************************************************** 
*/

const svgScrollBg_05nuo = document.getElementById("scroll-bg-05nuo");
const svgBgGradient_05nuo = document.getElementById('scroll-bg-gradient-05nuo');

//svg scroll animation
const svgScrollTriggerPoints_05nuo = {
    start1: 0,
    end1: 0,
    start2: 0,
    end2: 0,
    start3: 0,
    end3: 0,
    init: function(s1, e1, s2, e2, s3, e3){
        this.start1 = s1;
        this.end1 = e1;
        this.start2 = s2;
        this.end2 = e2;
        this.start3 = s3;
        this.end3 = e3;
    },
    scrollState: 0,
    updateScrollState: function(scrollY){
        if(scrollY < this.start2){
            this.scrollState = 0;
        }
        else if(scrollY >= this.start2 && scrollY < this.start3){
            this.scrollState = 1;
        }
        else if(scrollY >= this.start3){
            this.scrollState = 2;
        }
    }
};

let lastScrollTarget_05nuo = 0;
let curScrollMove_05nuo = 0;

//scrollY values
let lastScrollY_05nuo = 0;

//clip path animation
let curClipAnimSeek_05nuo = 0;
let lastClipAnimSeek_05nuo = 0;

//svg scroll background gradient values
let svgHideScrollBg_05nuo = true;
let svgBgGradientY2_05nuo = 400;
let svgBgGradientY1_05nuo = 0;
let svgBgGradientFactor_05nuo = 300;

//svgScroll lerp values
let lastScrollSVGLerpTime_05nuo = undefined;
let scrollLerpAnim_05nuo = undefined;

let hasReduceSvgOnScroll_05nuo = false;

//get svg scroll start end positions and targets based on state
function getScrollStartEndTargets(state){
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let startSvgScroll_05nuo;
    let endSvgScroll_05nuo;
    let startPosY_05nuo;
    let targetPosY_05nuo;
    
    if(state === 0){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start1;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end1;
        startPosY_05nuo = svgTop_05nuo;
        if(width < widthLimit_05nuo && width < height){
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.45 - svgHeight_05nuo * 0.5;
        }
        else{
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
        }
    }
    else if(state === 1){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start2;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end2;

        if(width < widthLimit_05nuo && width < height){
            startPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.45 - svgHeight_05nuo * 0.5;
            targetPosY_05nuo = institutionPanel_05nuo.offsetTop + institutionPanel_05nuo.offsetHeight * 0.45 - svgHeight_05nuo * 0.5;
        }
        else{
            startPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
            targetPosY_05nuo = institutionPanel_05nuo.offsetTop + (institutionPanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
        }
    }
    else if(state === 2){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start3;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end3;

        if(width < widthLimit_05nuo && width < height){
            startPosY_05nuo = institutionPanel_05nuo.offsetTop + institutionPanel_05nuo.offsetHeight * 0.45 - svgHeight_05nuo * 0.5;
            targetPosY_05nuo = associationPanel_05nuo.offsetTop + associationPanel_05nuo.offsetHeight * 0.45 - svgHeight_05nuo * 0.295;
        }
        else{
            startPosY_05nuo = institutionPanel_05nuo.offsetTop + (institutionPanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
            targetPosY_05nuo = associationPanel_05nuo.offsetTop + (associationPanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
        }
    }

    return {startSvgScroll_05nuo, endSvgScroll_05nuo, startPosY_05nuo, targetPosY_05nuo}
}

//set start, end scroll animation position and scroll animation targets
function scrollSvg_05nuo(){
    //init start and end points
    svgScrollTriggerPoints_05nuo.init(
        svgTop_05nuo + svgHeight_05nuo * 0.15, enterprisePanel_05nuo.offsetTop*0.9,
        enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.15, institutionPanel_05nuo.offsetTop*0.9,
        institutionPanel_05nuo.offsetTop + institutionPanel_05nuo.offsetHeight * 0.15, associationPanel_05nuo.offsetTop*0.9);

    svgScrollTriggerPoints_05nuo.updateScrollState(window.scrollY);
    let state = svgScrollTriggerPoints_05nuo.scrollState;

    //get start end points and start target pos based on scroll state
    let {startSvgScroll_05nuo, endSvgScroll_05nuo, startPosY_05nuo, targetPosY_05nuo} = getScrollStartEndTargets(state);
    resizeHero_05nuo();
    //detect if svg is in scroll mode (scrollY is larger than the begin scroll point)
    {
        //get the very beginning pos value where svg starts to scroll
        if(!isSvgScroll_05nuo && window.scrollY >= svgScrollTriggerPoints_05nuo.start1){
            isSvgScroll_05nuo = true;
            canCheckSvgPan_05nuo = false;
            svgPanStartCheck(svg_05nuo);
        }
        else if(isSvgScroll_05nuo && window.scrollY < svgScrollTriggerPoints_05nuo.start1){
            isSvgScroll_05nuo = false;
            canCheckSvgPan_05nuo = true;
            requestTimeout(()=>{
                if(!isSvgScroll_05nuo){
                    svgPanStartCheck(svg_05nuo);
                }
            }, 300); 
            resizeHero_05nuo();
        }

        if(!hasReduceSvgOnScroll_05nuo && window.scrollY >= svgScrollTriggerPoints_05nuo.end1 * 0.8){
            hasReduceSvgOnScroll_05nuo = true;
            resizeHero_05nuo();
        }
        else if(hasReduceSvgOnScroll_05nuo && window.scrollY < svgScrollTriggerPoints_05nuo.end1 * 0.8){
            hasReduceSvgOnScroll_05nuo = false;
        }
    }

    //set scrollY values
    let getScrollY = function(){
        let scrollY = window.scrollY;
        if(window.scrollY < startSvgScroll_05nuo){
            scrollY = startSvgScroll_05nuo;
        }
        else if(window.scrollY > endSvgScroll_05nuo){
            scrollY = endSvgScroll_05nuo;
        }
        return scrollY;
    }

    lastScrollY_05nuo = getScrollY();

    //show and hide svg scroll bg
    {
        if(!svgHideScrollBg_05nuo && window.scrollY < startSvgScroll_05nuo){
            requestTimeout(()=>{
                if(!svgHideScrollBg_05nuo && window.scrollY < startSvgScroll_05nuo){
                    svgHideScrollBg_05nuo = true;
                    svgScrollBg_05nuo.style.opacity = "0";
                }
            }, 300);
        }
        else if(svgHideScrollBg_05nuo && window.scrollY >= startSvgScroll_05nuo && window.scrollY < endSvgScroll_05nuo){
            svgHideScrollBg_05nuo = false;
            svgScrollBg_05nuo.style.opacity = "1";
        }
        else if(!svgHideScrollBg_05nuo && window.scrollY >= endSvgScroll_05nuo){
            requestTimeout(()=>{
                if(!svgHideScrollBg_05nuo && window.scrollY >= endSvgScroll_05nuo){
                    svgHideScrollBg_05nuo = true;
                    svgScrollBg_05nuo.style.opacity = "0";
                }
            }, 300);
        }
    }

    let scrollPercent = (lastScrollY_05nuo - startSvgScroll_05nuo) / (endSvgScroll_05nuo - startSvgScroll_05nuo); 
    lastScrollTarget_05nuo = scrollPercent * (targetPosY_05nuo - startPosY_05nuo) + startPosY_05nuo - svgTop_05nuo;
    //scroll animate svg clip path
    lastClipAnimSeek_05nuo = scrollPercent / 3 + state / 3;

    //change gradient pos y1 y2 values
    let gradient_y1 = svgBgGradientY1_05nuo - svgBgGradientFactor_05nuo * lastClipAnimSeek_05nuo;
    let gradient_y2 = svgBgGradientY2_05nuo - svgBgGradientFactor_05nuo * lastClipAnimSeek_05nuo;
    svgBgGradient_05nuo.setAttribute("y1", `${gradient_y1}%`);
    svgBgGradient_05nuo.setAttribute("y2", `${gradient_y2}%`); 

    cancelAnimationFrame(scrollLerpAnim_05nuo);
    scrollLerpAnim_05nuo = requestAnimFrame(scrollSvgLerp_05nuo);
}

//lerp svg translateY and clip path animtion
function scrollSvgLerp_05nuo(timestamp){
    if(lastScrollSVGLerpTime_05nuo === undefined){
        lastScrollSVGLerpTime_05nuo = timestamp;
    }

    let deltaTime = (timestamp - lastScrollSVGLerpTime_05nuo) / 1000;
    lastScrollSVGLerpTime_05nuo = timestamp;

    curScrollMove_05nuo = lerp_05nuo(curScrollMove_05nuo, lastScrollTarget_05nuo, 0.02, deltaTime);
    curClipAnimSeek_05nuo = lerp_05nuo(curClipAnimSeek_05nuo, lastClipAnimSeek_05nuo, 0.1, deltaTime);

    let matrix = window.getComputedStyle(svg_05nuo).getPropertyValue("transform");
    let matrixSplits = matrix.split(',');
    let tx = parseFloat(matrixSplits[matrixSplits.length - 2]);

    svg_05nuo.style.setProperty("transform", `translateX(${tx}px) translateY(${curScrollMove_05nuo}px)`);
    svg_05nuo.style.setProperty("--animation-seek-05nuo", curClipAnimSeek_05nuo);
    
    if(Math.abs(curScrollMove_05nuo - lastScrollTarget_05nuo) <= 0.1 && 
    Math.abs(curClipAnimSeek_05nuo - lastClipAnimSeek_05nuo) <= 0.1){
        cancelAnimationFrame(scrollLerpAnim_05nuo);
    }
    else{
        cancelAnimationFrame(scrollLerpAnim_05nuo);
        scrollLerpAnim_05nuo = requestAnimFrame(scrollSvgLerp_05nuo);
    }
}

//snap scroll and precent default scroll
class ControlScroll_05nuo{
    constructor(){
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        this.keys = {ArrowLeft: 1, ArrowUp: 1, ArrowRight: 1, ArrowDown: 1};
        this.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

        //disable normal scroll function
        this.disableScroll();
        window.scrollTo(0, 0);
        //scroll status for scrolling in each panel
        this.currentStats = {
            getTargetPos: function (target){
                if(target === 0){
                    return 0;
                }
                else if(target === 1){
                    return enterprisePanel_05nuo.offsetTop;
                }
                else if(target === 2){
                    return institutionPanel_05nuo.offsetTop;
                }
                else if(target === 3){
                    return associationPanel_05nuo.offsetTop;
                }
            },
            lastPanel:0,
            curPanel:0,
            updateCurPanel: function(scrollY){
                let p0End = enterprisePanel_05nuo.offsetTop * 0.65,
                    p1End = institutionPanel_05nuo.offsetTop - enterprisePanel_05nuo.offsetHeight * 0.65,
                    p2End = associationPanel_05nuo.offsetTop - institutionPanel_05nuo.offsetHeight * 0.65;

                this.lastPanel = this.curPanel;
                if(scrollY < p0End){
                    this.curPanel = 0;
                }
                else if(scrollY >= p0End && scrollY < p1End){
                    this.curPanel = 1;
                }
                else if(scrollY >= p1End && scrollY < p2End){
                    this.curPanel = 2;
                }
                else{
                    this.curPanel = 3;
                }
            }
        }

        this.scrollMethod = {
            mouse:0,
            key:1,
            touch:2
        }

        this.currentScrollPos = window.scrollY;
        this.targetScrollPos = this.currentScrollPos;
        this.scrollLerpSpeed = 0.05;
        this.scrollLerpLastTime = undefined;
        this.scrollLerpAnim = undefined;

        this.cumulativeMoveY = 0;
        this.cumulativeMoveYLimit = 500;

        this.touchdir ={
            movedir:"none",
            swipedir:"none"
        }

        this.currentStats.updateCurPanel(window.scrollY);
        
        let btnArr = Array.prototype.concat(Array.prototype.slice.call(navButtonContainer_05nuo.children), [ctaBtn1Bg_05nuo.parentElement, ctaBtn2Bg_05nuo.parentElement, ctaBtn3Bg_05nuo.parentElement, ctaBtn4Bg_05nuo.parentElement]);
        swipeDetect_05nuo(window, btnArr, function(swipedir, movedir){
            this.movedir = movedir;
            this.swipedir = swipedir;
        }.bind(this));

    }

    preventDefault(e) {
        e.preventDefault();
    }

    preventDefaultForScrollKeys(e) {
        if (this.keys[e.key]) {
            this.preventDefault(e);
            return true;
        }
        return false;
    }

    /*****************************helper functions for controlScroll ***************************/
    //make lerped scroll animation
    scrollLerp(timestamp){
        if(this.scrollLerpLastTime === undefined){
            this.scrollLerpLastTime = timestamp;
        }

        let deltaTime = (timestamp - this.scrollLerpLastTime) / 1000;
        this.scrollLerpLastTime = timestamp;

        this.currentScrollPos = lerp_05nuo(this.currentScrollPos, this.targetScrollPos, this.scrollLerpSpeed, deltaTime);

        window.scrollTo(0, Math.round(this.currentScrollPos));
        if(Math.abs(this.currentScrollPos - this.targetScrollPos) <= 0.2){
            cancelAnimationFrame(this.scrollLerpAnim);
            this.currentStats.updateCurPanel(window.scrollY);
            this.scrollLerpLastTime = undefined;
        }
        else{
            if(Math.abs(this.currentScrollPos - this.targetScrollPos) > 20){
                this.cumulativeMoveY = 0;
            }
            cancelAnimationFrame(this.scrollLerpAnim);
            this.scrollLerpAnim = requestAnimFrame(this.scrollLerp.bind(this));
        }
    }

    //set different lerp speed for mobile and tablet devices
    setLerpSpeedForMobile(slow){
        if(slow){
            if(isMobileOrTablet_05nuo){
                this.scrollLerpSpeed = 0.1;
            }
        }
        else{
            if(isMobileOrTablet_05nuo){
                this.scrollLerpSpeed = 0.05;
            } 
        }
    }

    //get different scroll move distance for different methods of scrolling: mouse, keyboard and touch screen
    getScrollDelta(e, scrollMethod){
        let moveY = 0;
        if(scrollMethod === this.scrollMethod.mouse){
            if(e.deltaY > 35){
                moveY = 150;
            }
            else if(e.deltaY < -35){
                moveY = -150;
            }
            else{
                moveY = 0;
            }
        }
        else if(scrollMethod === this.scrollMethod.key){
            //up arrow
            if(e.key === "ArrowUp"){
                moveY = -300;
            }
            //down arrow
            else if(e.key === "ArrowDown"){
                moveY = 300;
            }
        }
        else if(scrollMethod === this.scrollMethod.touch){
            if(this.movedir === "up"){
                moveY = 110;
            }
            else if(this.movedir === "down"){
                moveY = -110;
            }

            if(this.swipedir !== "none"){
                if(this.swipedir === "up"){
                    moveY = 500;
                }
                else if(this.swipedir === "down"){
                    moveY = -500;
                }
            }
        }

        return moveY;
    }
    /*********************************end of helper functions*********************************** */

    //control the scroll bar behavior with snap-to-scroll effects
    controlScroll(e, scrollMethod){
        //simulate normal scroll
        let moveY = this.getScrollDelta(e, scrollMethod);
        //normal scroll for intro and enterprise panel

        let startSnapScroll = fullHeader_05nuo.offsetHeight - window.innerHeight;
        startSnapScroll = startSnapScroll < 0 ? 0 : startSnapScroll;

        // if(this.targetScrollPos < enterprisePanel_05nuo.offsetTop){
        if(this.targetScrollPos < startSnapScroll){
            this.targetScrollPos += moveY;
            this.targetScrollPos = this.targetScrollPos < 0 ? 0 : this.targetScrollPos;
            this.targetScrollPos = this.targetScrollPos > startSnapScroll ? startSnapScroll : this.targetScrollPos;
            //normal scroll speed for mobile in first two panels
            this.setLerpSpeedForMobile(false);
        }
        //snap scroll in other sections
        else{
            //slow scroll for mobile
            this.setLerpSpeedForMobile(true);
            //snap scroll to enterprise panel if scrolling down
            if(this.currentScrollPos < enterprisePanel_05nuo.offsetTop * 0.98){
                if(moveY > 0){
                    if(this.cumulativeMoveY < 0){ this.cumulativeMoveY = 0;}
                    this.cumulativeMoveY += moveY;
                    if(Math.abs(this.cumulativeMoveY) >= this.cumulativeMoveYLimit){
                        this.targetScrollPos = enterprisePanel_05nuo.offsetTop;
                        this.cumulativeMoveY = 0;
                    } 
                }
                else if(moveY < 0){
                    this.setLerpSpeedForMobile(false);
                    if(this.currentScrollPos <= startSnapScroll * 1.1 && this.targetScrollPos < enterprisePanel_05nuo.offsetTop ){
                        this.targetScrollPos += moveY;
                    }
                }
            }
            //snap scroll to institution panel if scrolling down
            // normal scroll back up if scrolling up
            else if(this.currentScrollPos >= enterprisePanel_05nuo.offsetTop * 0.98 && this.currentScrollPos < institutionPanel_05nuo.offsetTop * 0.98){
                if(moveY > 0){
                    if(this.cumulativeMoveY < 0){ this.cumulativeMoveY = 0;}
                    this.cumulativeMoveY += moveY;
                    if(Math.abs(this.cumulativeMoveY) >= this.cumulativeMoveYLimit){
                        this.targetScrollPos = institutionPanel_05nuo.offsetTop;
                        this.cumulativeMoveY = 0;
                    }
                }
                else if(moveY < 0){
                    // if(this.currentScrollPos <= enterprisePanel_05nuo.offsetTop * 1.1 && this.targetScrollPos < institutionPanel_05nuo.offsetTop ){
                    //     this.targetScrollPos += moveY;
                    // }
                    if(this.cumulativeMoveY > 0){ this.cumulativeMoveY = 0;}
                    this.cumulativeMoveY += moveY;
                    if(Math.abs(this.cumulativeMoveY) >= this.cumulativeMoveYLimit){
                        this.targetScrollPos = 0;
                    }
                }
            }
            //snap scroll to association panel
            else if(this.currentScrollPos >= institutionPanel_05nuo.offsetTop * 0.98){
                if(moveY > 0){
                    //snap scroll to association panel from institution panel
                    if(this.targetScrollPos < associationPanel_05nuo.offsetTop){
                        if(this.cumulativeMoveY < 0){ this.cumulativeMoveY = 0;}
                        this.cumulativeMoveY += moveY;
                        if(Math.abs(this.cumulativeMoveY) >= this.cumulativeMoveYLimit){
                            this.targetScrollPos = associationPanel_05nuo.offsetTop;
                            this.cumulativeMoveY = 0;
                        }
                    }
                    //if already at association panel, normal scroll to view overflow content downward
                    else{
                        if(this.currentScrollPos >= associationPanel_05nuo.offsetTop * 0.98){
                            this.setLerpSpeedForMobile(false);
                            let end = associationPanel_05nuo.offsetTop + associationPanel_05nuo.offsetHeight - window.innerHeight;
                            this.targetScrollPos += moveY;
                            this.targetScrollPos = this.targetScrollPos >= end ? end : this.targetScrollPos;
                        }
                    }
                }
                else if(moveY < 0){
                    //snap scroll back to either institution panel or enterprise panel
                    if(this.targetScrollPos <= associationPanel_05nuo.offsetTop){
                        if(this.cumulativeMoveY > 0){ this.cumulativeMoveY = 0;}
                        this.cumulativeMoveY += moveY;
                        if(Math.abs(this.cumulativeMoveY) >= this.cumulativeMoveYLimit){
                            if(this.targetScrollPos <= institutionPanel_05nuo.offsetTop){
                                this.targetScrollPos = enterprisePanel_05nuo.offsetTop;
                            }
                            else if(this.targetScrollPos <= associationPanel_05nuo.offsetTop && this.targetScrollPos > institutionPanel_05nuo.offsetTop){
                                this.targetScrollPos = institutionPanel_05nuo.offsetTop;
                            }
                            this.cumulativeMoveY = 0;
                        }
                    }
                    // if at the overflow sections of the association panel, normal scroll up until reach
                    // the top of association panel
                    else{
                        this.setLerpSpeedForMobile(false);
                        this.targetScrollPos += moveY;
                        this.targetScrollPos = this.targetScrollPos <= associationPanel_05nuo.offsetTop ?
                        associationPanel_05nuo.offsetTop : this.targetScrollPos;
                    }
                }
            }
        }

        //lerp animation
        cancelAnimationFrame(this.scrollLerpAnim);
        this.scrollLerpAnim = requestAnimFrame(this.scrollLerp.bind(this));
    }
    
    //apply control scroll to mouse wheel scroll, keyboard, and touch screen scroll
    controlScrollForAll(){
        // older FF
        window.addEventListener('DOMMouseScroll', function(e){
            this.controlScroll(e, this.scrollMethod.mouse);
        }.bind(this), eventListenerOption_05nuo);
        
        // modern desktop
        window.addEventListener(this.wheelEvent, function(e){
            this.controlScroll(e, this.scrollMethod.mouse);  
        }.bind(this), eventListenerOption_05nuo);

        // mobile
        window.addEventListener('touchmove', function(e){
            this.controlScroll(e, this.scrollMethod.touch);  
        }.bind(this), eventListenerOption_05nuo);
        window.addEventListener('touchend', function(e){
            this.controlScroll(e, this.scrollMethod.touch);  
        }.bind(this), eventListenerOption_05nuo);

        //keyboard
        window.addEventListener('keydown', function(e){
            this.controlScroll(e, this.scrollMethod.key);  
        }.bind(this), eventListenerOption_05nuo);    
    }

    //used for navigation button to navigate between panels
    snapScroll(targetPanelIdx){
        //update target scroll pos
        this.targetScrollPos = this.currentStats.getTargetPos(targetPanelIdx);

        cancelAnimationFrame(this.scrollLerpAnim);
        this.scrollLerpAnim = requestAnimFrame(this.scrollLerp.bind(this));
    }

    adjustScrollAfterResize(){
        const pos = [0, enterprisePanel_05nuo.offsetTop, institutionPanel_05nuo.offsetTop, associationPanel_05nuo.offsetTop];
        let scrollY = window.scrollY;
        let smallestDist = window.innerHeight;
        let scrollTo = 0;
        for(let i = 0; i < pos.length; i++){
            let dist = Math.abs(scrollY - pos[i]);
            if(dist < smallestDist){
                smallestDist = dist;
                scrollTo = pos[i];
            }
        }

        smallestDist = window.innerHeight;
        this.targetScrollPos = scrollTo;

        cancelAnimationFrame(this.scrollLerpAnim);
        this.scrollLerpAnim = requestAnimFrame(this.scrollLerp.bind(this));
    }

    disableScroll() {
        // older FF
        window.addEventListener('DOMMouseScroll', this.preventDefault, eventListenerOption_05nuo);
        // modern desktop
        window.addEventListener(this.wheelEvent, this.preventDefault, eventListenerOption_05nuo);
        // mobile
        window.addEventListener('touchmove', this.preventDefault, eventListenerOption_05nuo);
        window.addEventListener('touchend', this.preventDefault, eventListenerOption_05nuo);
        // keybaord
        window.addEventListener('keydown', this.preventDefaultForScrollKeys.bind(this), eventListenerOption_05nuo);
    }

    enbaleScroll(){
        // older FF
        window.removeEventListener('DOMMouseScroll', this.preventDefault, eventListenerOption_05nuo);
        // modern desktop
        window.removeEventListener(this.wheelEvent, this.preventDefault, eventListenerOption_05nuo); 
        // mobile
        window.removeEventListener('touchmove', this.preventDefault, eventListenerOption_05nuo);
        window.removeEventListener('touchend', this.preventDefault, eventListenerOption_05nuo);
        // keyboard
        window.removeEventListener('keydown', this.preventDefaultForScrollKeys.bind(this), eventListenerOption_05nuo);  
    }
}
    
let controlScroll_05nuo = new ControlScroll_05nuo();

function scrollFunc_05nuo(){
    window.addEventListener("scroll", scrollSvg_05nuo, eventListenerOption_05nuo);
    window.addEventListener("scroll", ()=>{
        controlScroll_05nuo.currentStats.updateCurPanel(window.scrollY);
        setButtonClick_05nuo(controlScroll_05nuo.currentStats.curPanel);
        setSectionTextBtnTransition(controlScroll_05nuo.currentStats.curPanel, controlScroll_05nuo.currentStats.lastPanel)
    }, eventListenerOption_05nuo);
}

/* ********************************************************************************************************
*********************************** prevent choppy anim after focus out ***********************************
*********************************************************************************************************** */

let vis_05nuo = (function(){
    var stateKey, 
        eventKey, 
        keys = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
  })();
  // check if current tab is active or not
vis_05nuo(function(){
    if(vis_05nuo() == false) {
    // tab not focused
        svgPanAnimLastTime_05nuo = undefined;
        lastScrollSVGLerpTime_05nuo = undefined;
        controlScroll_05nuo.lastScrollSVGLerpTime_05nuo = undefined;
    }
});

let notIE_05nuo = (document.documentMode === undefined),
    isChromium_05nuo = window.chrome;
if (notIE_05nuo && !isChromium_05nuo) {
    // checks for Firefox and other  NON IE Chrome versions
    window.addEventListener("focusout", function () {
        // blur
        svgPanAnimLastTime_05nuo = undefined;
        lastScrollSVGLerpTime_05nuo = undefined;
        controlScroll_05nuo.lastScrollSVGLerpTime_05nuo = undefined;
    });
} 
else {
    // checks for IE and Chromium versions
    // bind blur event
    window.addEventListener("blur", function () {
        // blur
        svgPanAnimLastTime_05nuo = undefined;
        lastScrollSVGLerpTime_05nuo = undefined;
        controlScroll_05nuo.lastScrollSVGLerpTime_05nuo = undefined;
    });
}


/* *******************************************************************************************************
*************************************************start ***************************************************
***********************************************************************************************************/
function mobileCheckSvgScrollBg_05nuo(){
    if(isMobileOrTablet_05nuo){
        document.getElementById("svg-scroll-bg-container-05nuo").style.setProperty("display", "none");
    }
}

const responsiveFunc_05nuo = function(){
    responsiveNavButton_05nuo();
    responsiveTitle_05nuo();
    resizeHero_05nuo();
    responsiveEnterprisePanel_05nuo();
    responsiveInstitutionPanel_05nuo();
    responsiveAssociationPanel_05nuo();
    svgPanStartCheck(svg_05nuo);
    scrollSvg_05nuo();
    controlScroll_05nuo.adjustScrollAfterResize();
}

const startTitleAnim_05nuo = function(){
    const subtitle = headerTitle_05nuo.children.item(0);
    const subtitleLine1 = subtitle.children.item(0);
    const subtitleLine2 = subtitle.children.item(2);

    requestTimeout(()=>{
        subtitleLine1.style.setProperty("background", "rgba(247, 247, 247, 0.5)")
        subtitleLine2.style.setProperty("background", "rgba(247, 247, 247, 0.5)")
    }, 1300);
}

window.addEventListener("resize", () => {
    responsiveFunc_05nuo();
    requestTimeout(responsiveFunc_05nuo, 30);
}, eventListenerOption_05nuo);

document.addEventListener('DOMContentLoaded', ()=>{
    requestTimeout(responsiveFunc_05nuo, 0);
    requestTimeout(responsiveFunc_05nuo, 100);
    //add control scroll events handlers
    controlScroll_05nuo.controlScrollForAll();
    //hide svg gradient bg if its mobile
    mobileCheckSvgScrollBg_05nuo()
    //start animation for titles
    startTitleAnim_05nuo();
    //start listen to scroll events
    scrollFunc_05nuo();
    //initiate nav button click state
    setButtonClick_05nuo(0);
    //add hover and click event listeners to nav buttons
    setNavButtonsHoverClick_05nuo();
    //set cta btn hover
    setAllCtaBtnHover_05nuo();
    //set cta btn click
    setAllCtaBtnClick_05nuo();
    controlScroll_05nuo.currentStats.updateCurPanel(window.scrollY);
});
