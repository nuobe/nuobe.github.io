/*******************************request time out***************************************** */
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
  
  /**
   * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
   * @param {int|object} fn The callback function
   */
  window.clearRequestTimeout = function(handle) {
    if(handle === undefined){handle = {value: undefined};}
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearTimeout(handle);
  };

/*************************************************/

// RESOURCE LOADING
// ================
function loadImage(url, callback) {
    console.log()
    var image = new Image();
    image.src = url;
    image.onload = callback;
    return image;
 }
 function loadImages(urls, callback) {
    const images = [];
    var imagesToLoad = urls.length;
   
    // Called each time an image finished loading.
    var onImageLoad = function() {
      --imagesToLoad;
        // If all the images are loaded call the callback.
        if (imagesToLoad == 0) {
            callback(images);
        }
    };
   
    for (var ii = 0; ii < imagesToLoad; ++ii) {
      var image = loadImage(urls[ii], onImageLoad);
      images.push(image);
    }
 }
 
 /************** */

 let imgs = [];
 let jpgbase = 'bg';
 let jpgpost = 's';
 let ext = '.jpg';
 let folder = "./imgs/"


let rx = [90, -90, 90, -90, 90];
let ry = [-135, 45, -166, 20, -80];
let sx = [-1.2, 0.95, -1.5, 0.8, 0.4];
let sy = [-1, -0.85, 0.35, -0.8, 1.5];

let curIndex = 4;
let numofItems = 5;
let items;
let bgs;

let $bg;
let $btntint;
let $menuli;
let $btntext;
let tintLight = "rgba(194, 217, 255, 0.5)";
let tintDark = "rgba(255, 243, 78, 0.35)";
let brightnessContrastLight = "1";
let brightnessDark = "1.2";
let contrastDark = "1.1";
let invertLight = "0";
let invertDark = "1";
let blurLight = "0";
let blurDark = "0.35rem";
let saturateLight = "1";
let saturateDark = "0.4"
let fontLight = "rgba(0, 0, 0, 0.75)"
let fontDark = "rgba(255, 255, 255, 0.75)"
let btnfontLight = "rgb(58, 53, 44)"
let btnfontDark = "rgb(94, 113, 145)"
let bgBrightness = brightnessContrastLight;
let bgContrast = brightnessContrastLight;
let bgInvert = invertLight;
let bgBlur = blurLight;
let bgSaturate = saturateLight;
let tint = tintLight;
let fontColor = fontLight;
let btnfontColor = btnfontLight;
let isLight = true;
let changeLightAnimStart;
let switchLightDuration = 20000;
let switchLightRand = Math.random() + 0.5;

let canClick = false;
let userClicked = false;

let autoFlipStart;
let autoFlipInterval = 6000;

function startHide(){
    for(var i = 0; i < numofItems; i++){
        var v1 = "--rx" + (i+1);
        var v2 = "--ry" + (i+1);
        items[i].css(v1, rx[i]+"deg");
        items[i].css(v2, ry[i]+"deg");
    }
}

function hideItem(toget){
    var v1 = "--rx" + toget;
    var v2 = "--ry" + toget;
    var s1 = "--sx" + toget;
    var s2 = "--sy" + toget;
    items[toget-1].css(s1, "0em"); 
    items[toget-1].css(s2, "0em");

    items[toget-1].removeClass("cloudy");

    requestTimeout(()=>{
        items[toget-1].css(v1, rx[toget - 1]+"deg");
        items[toget-1].css(v2, ry[toget - 1]+"deg");
    }, 450);

    requestTimeout(()=>{
        canClick = true;
    }, 1000);

}

function showItem(toget){
    var v1 = "--rx" + toget;
    var v2 = "--ry" + toget;
    var s1 = "--sx" + toget;
    var s2 = "--sy" + toget;
    items[toget-1].css(v1, "0deg");
    items[toget-1].css(v2, "0deg");

    items[toget-1].addClass("cloudy");

    requestTimeout(()=>{
        items[toget-1].css(s1, sx[toget - 1] + "em"); 
        items[toget-1].css(s2, sy[toget - 1] + "em");
    }, 450);
}

function flipmenu(){
    if(canClick){
        canClick = false;
        var next = ((curIndex - 1) + numofItems) % numofItems;
        
        hideItem(curIndex + 1);

        requestTimeout(()=>{
            showItem(next + 1);
            bgs[next].css("opacity", 1);
            bgs[curIndex].css("opacity", 0);
            curIndex = next;

            userClicked = false;
        }, 450);
    }
}

function autoFlip(timestamp){
    if(autoFlipStart === undefined){
        autoFlipStart = timestamp;
    }

    if(userClicked){
        autoFlipStart = timestamp;
    }

    if(timestamp - autoFlipStart >= autoFlipInterval){
        autoFlipStart = timestamp;
        flipmenu();
    }

    window.requestAnimFrame(autoFlip);
}

function changeLight(timestamp){
    if(changeLightAnimStart === undefined){
        changeLightAnimStart = timestamp;
    }

    if(timestamp - changeLightAnimStart >= switchLightDuration * switchLightRand){
        if(!isLight){
            bgBrightness = brightnessContrastLight;
            bgContrast = brightnessContrastLight;
            bgBlur = blurLight;
            bgSaturate = saturateLight;
            tint = tintLight;
            fontColor = fontLight;
            btnfontColor = btnfontLight;
            bgInvert = invertLight;
            isLight = true;
        }
        else{
            bgBrightness = brightnessDark;
            bgContrast = contrastDark;
            bgBlur = blurDark;
            bgSaturate = saturateDark;
            tint = tintDark;
            fontColor = fontDark;
            btnfontColor = btnfontDark;
            bgInvert = invertDark;
            isLight = false; 
        }
        switchLightRand = Math.random() + 0.5;
        changeLightAnimStart = timestamp;
    }

    $bg.css("--bgBrightness", bgBrightness);
    $bg.css("--bgContrast", bgContrast);
    $bg.css("--bginvert", bgInvert);
    $bg.css("--bgblur", bgBlur);
    $bg.css("--bgsaturate", bgSaturate);
    $btntint.css("--tintalpha", tint);
    $menuli.css("--fontcolor", fontColor);
    $btntext.css("--btntextColor", btnfontColor);

    window.requestAnimFrame(changeLight);
}

function main(){
    loadImages(imgs, ()=>{
        $("#button").removeClass("btn");
        $("#loader").css("opacity", "0");

        // requestTimeout(()=>{
        //     startHide();
        // },100);
    
        //start menu and set button and menu
        requestTimeout(()=>{
            $(".menu li").css("--sblur", "0.75em");
            showItem(5);
            $("#button").click(function(){flipmenu(); userClicked = true;});
            $("#loader").remove();

            canClick=true;

            window.requestAnimFrame(autoFlip);
            window.requestAnimFrame(changeLight);
        }, 500);

        //menu clicks
        $(".menu li").bind("click", ()=>{
            $("#button").addClass("btn");
            requestTimeout(()=>{

                if(curIndex === 0){
                    window.location.href = "./CV/index.html";       
                }
                else if(curIndex === 1){
                    window.location.href = "./Design/index.html";
                }
                else if(curIndex === 2){
                    window.location.href = "./Projects/index.html";
                }
                else if(curIndex === 3){
                    window.location.href = "./New/index.html";
                }
                else if(curIndex === 4){
                    window.location.href = "./Info/index.html";
                }
            }, 1800);
        })
    })
}

$(document).ready(()=>{
    items = [$("#item1"), $("#item2"), $("#item3"), $("#item4"), $("#item5")];
    bgs = [$("#bg1"), $("#bg2"), $("#bg3"), $("#bg4"), $("#bg5")];
    $bg = $(".bg")
    $btntint = $(".tint");
    $btntext = $("#button .btntext");
    $menuli = $(".menu li");

    startHide();

    var i;
    for(i = 0; i < numofItems; i++){
        var num = i + 1;
        imgs.push(folder + jpgbase + num + ext);
        imgs.push(folder + jpgbase + num + jpgpost + ext);
    }
    imgs.push(folder + "menupanel.png");
    imgs.push(folder + "buttonBG.jpg");

    requestTimeout(main, 1000);

})

