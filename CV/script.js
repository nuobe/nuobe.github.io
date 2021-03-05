Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

let imgs = []
let numofNavitems = 1;
let folder = "./resources/";
let cbgname = "cbg";
let ext = ".jpg";

let $contentsWraper;
let $mySidenav;
let $main;
let $mainloader;
let $mainloaderProgress;
let $openbtn;
let $circle;
let $circlepopup;
// let $navitems;
let $navtint;
let $circletint;

let progressDeg = 180;
let progressRad = 50;
let progressAnimStart;

let isNavClickable;
let isNavDark = true;
let navDark = 0.92;
let navLight = 0;
let circleDark = "rgba(216, 188, 61, 0.34)";
let circleLight = "rgba(35, 139, 236, 0.4)";
let fontDark = "rgb(100, 100, 100)";
let fontLight = "rgb(29, 29, 33)";
let fonthoverDark = "rgb(228, 222, 194)";
let fonthoverLight = "rgb(72, 147, 255)";

let navtintAnimStart;
let hasSetOpenBtnOn;
let navOpen = false;

let circleAnimStart;
let circleAnimReq;
let circleBaseNum;
let circleNumY = -28;
let circleNumRand;
let isCirclepop = false;

let imgshadowX = [1.85, -0.45, -2.25];
let imgshadowY = [1.85, 2.25, 2.7];
let imgshadowIndex = 0;
let imgshadow_NumOfPos = 3;

let canClickCircle = false;

let iframeToAdjustIndex = 1;
// let adjustIframeAnimStart;

let mainLoaderHTML = `<div id ="main_loader"></div>`;

function openNav() {
    adjustNav();
    navOpen = true;
    if(canClickCircle){
        $circle.css("--circleScale", "3.3");
    }
  }
  
function closeNav() {
    $mySidenav.css("width", "0");
    $navtint.css("width", "0");
    $main.css("marginLeft", "0");

    $mainloader.css("width", "110vw");
    $mainloader.css("left", "0");
    $mainloader.css("height", $mainloader.outerHeight());
    if(canClickCircle){
        $circle.css("--circleScale", "1");
    }
    navOpen = false;
}

function switchNav(){
    if(navOpen){
        closeNav();
    }
    else{
        openNav();
    }

    // adjustIframeAnimStart = undefined;
    // window.requestAnimFrame(adjustIframeAnim);
}

function adjustNav(){
    var width = $(window).width();
    
    var toset = 40;
    if(width >= 2000){
        toset = 35;
    }
    else if(width <= 1000 && width > 500){
        toset = 45;
    }
    else if(width <= 500){
        toset = 70;
    }

    var set = toset + "vw";

    $mySidenav.css("width", set);
    $navtint.css("width", set);
    $main.css("marginLeft", set);

    var setLoaderWidth = 110 - toset;
    $mainloader.css("width", setLoaderWidth + "vw");
    $mainloader.css("left", set);
    $mainloader.css("height", $mainloader.outerHeight());
}

// function calcCircleBGSize(){
//     var width = $(window).width();
//     if(width > 1000 && width <= 2000){
//         return "20%"
//     }
//     else if(width <= 1000 && width > 500){
//         return "29%"
//     }
//     else if(width <= 500){
//         return "50%";
//     }
//     else{
//         return "16%";
//     }
// }

function startCircle(){
    requestTimeout(()=>{
        $circle.css("--circleh", "82vh");
    }, 500);
    requestTimeout(()=>{
        if(circleBaseNum === undefined){
            $circle.css("--circleh", "45vh");
            $circle.css("--circleScale", "3.3");
            circleBaseNum = $(window).height() / 2.1 ;
            $circle.css("background-image", "url('./resources/cbg1.gif')");
        }
        // $circle.css("background-attachment", "fixed");
        $circle.css("background-size", "cover");

        circleNumRand = Math.random() + 0.5;
        circleAnimReq = window.requestAnimFrame(lingerCircle);

        canClickCircle = true;
    }, 1700);
}

function lingerCircle(timestamp){
    if(circleAnimStart === undefined){
        circleAnimStart = timestamp;
    }
    const elapsed = timestamp - circleAnimStart;

    var num = circleNumY * (circleNumRand + 0.7);
    num = num + circleBaseNum;
    $circle.css("--circleh", num + "px");

    var circlePos = $mySidenav.offset();
    var navWidth = $mySidenav.width()
    var circleNumX = navWidth / 2;

    var numL = circleNumX;
    numL *= (circleNumRand - 0.2);

    if(numL <= navWidth * 0.15){
        numL = (circlePos.left - navWidth * 0.5) / (Math.random()+1) + navWidth * 0.5;
    }
    else if(numL > navWidth *0.8){
        numL = (circlePos.left - navWidth * 0.5) / (Math.random()+1) + navWidth * 0.5;
    }

    $circle.css("--circlel", numL + "px");

    var imgSX = imgshadowX[imgshadowIndex] * circleNumRand * 1.2;
    var imgSY = imgshadowY[imgshadowIndex] * circleNumRand * 1.2;

    $contentsWraper.css("--imgshadowPosX", imgSX + "rem");
    $contentsWraper.css("--imgshadowPosY", imgSY + "rem");

    if(elapsed >= 800 && elapsed <= 801){
        circleNumY *= -1;
        circleNumX *= -1;
        imgshadowIndex = (imgshadowIndex + 1) % imgshadow_NumOfPos;
    }
    else if(elapsed >= 1600){
        circleAnimStart = timestamp;
        circleNumY *= -1;
        circleNumRand = Math.random() + 0.5;
        if(Math.floor(Math.random()*10) % 2 == 0){
            circleNumX *= -1;
        }
        imgshadowIndex = (imgshadowIndex + 1) % imgshadow_NumOfPos;
    }
    circleAnimReq = window.requestAnimFrame(lingerCircle);
}

function mainProgressAnim(timestamp){
    if(progressAnimStart === undefined){
        progressAnimStart = timestamp;
    }

    $mainloaderProgress.css("--mainprogressDeg", progressDeg + "deg");
    $mainloaderProgress.css("--progressRad", progressRad + "%"); 
    
    var elapsed = timestamp - progressAnimStart;
    if(elapsed >= 1200){
        progressDeg = (progressDeg + 180) % 360;
        progressRad = (progressRad + 50) % 100;    
        progressAnimStart = timestamp;
    }

    if(!isSecLoaded){
        window.requestAnimFrame(mainProgressAnim);
    }
}

//move circle to point when click on menu
// function moveCircle(event){
//     circleBaseNum = event.target.offsetTop + event.target.offsetHeight / 2;
//     changeCircleBG(event);
//     checkLightColor();
// }

// function changeCircleBG(event){
//     var id = event.target.id;
//     var index = id.slice(-1);
//     iframeToAdjustIndex = index;
//     $circle.css("background-image", "url('./resources/" + cbgname + index + ".jpg')");

//     $mainloader.css("z-index", "2");
//     $mainloader.css("--mainloaderAlpha", "1");

//     isSecLoaded = false;
//     window.requestAnimFrame(mainProgressAnim);

//     requestTimeout(function(){
//         loadsections($contentsWraper, index, $mainloader);
//     }, 1100);
// }

function checkLightColor(){
    if(isNavDark){
        $(".light").css("--lightcolor", fonthoverDark);
    }
    else{
        $(".light").css("--lightcolor", fonthoverLight);
    }
}

function switchNavTint(timestamp){
    if(navtintAnimStart === undefined){
        navtintAnimStart = timestamp;
    }
    var elapsed = timestamp - navtintAnimStart;

    if(elapsed >= 10000){
        if(!isNavDark){
            $navtint.css("--navtintalpha", `${navDark}`);
            $circletint.css("--tintalpha", circleDark);
            // $navitems.css("--fontcolor", fontDark);
            $contentsWraper.css("--imgborderColor", "rgb(0,0,0)");
            isNavDark = true;
        }
        else{
            $navtint.css("--navtintalpha", `${navLight}`);
            $circletint.css("--tintalpha", circleLight);
            // $navitems.css("--fontcolor", fontLight);
            $contentsWraper.css("--imgborderColor", "rgb(255,255,255)");
            isNavDark = false;
        }
        navtintAnimStart = timestamp;
    }

    checkLightColor();

     window.requestAnimFrame(switchNavTint);
}

/*help function to detect if circle and navitems overlap*/
// function collision($div1, $div2) {
//     var x1 = $div1.offset().left;
//     var y1 = $div1.offset().top;
//     var h1 = $div1.outerHeight(true);
//     var w1 = $div1.outerWidth(true);
//     var b1 = y1 + h1;
//     var r1 = x1 + w1;
//     var x2 = $div2.offset().left;
//     var y2 = $div2.offset().top;
//     var h2 = $div2.outerHeight(true);
//     var w2 = $div2.outerWidth(true);
//     var b2 = y2 + h2;
//     var r2 = x2 + w2;

//     if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
//     return true;
// }

// function lightNavitem($element){
//     if(collision($element, $circle)){
//         $element.addClass("light");
//     }
//     else{
//         $element.removeClass("light");
//     }
// }

// function checkTolightNavitems(timestamp){
//     $navitems.each(function(){
//         lightNavitem($(this));
//     });  

//     window.requestAnimFrame(checkTolightNavitems);
// }

// function hoverfontIn(){
//     if(isNavDark){
//         $(this).css("--fontcolor", fonthoverDark);
//     }
//     else{
//         $(this).css("--fontcolor", fonthoverLight);
//     }
// }

// function hoverfontOut(){
//     if(isNavDark){
//         $(this).css("--fontcolor", fontDark);
//     }
//     else{
//         $(this).css("--fontcolor", fontLight);
//     }
// }

function circlepopupIn(){
    if($(window).width() > 2000){
        $circlepopup.css("--popsize", "1.7rem");
    }
    else if($(window).width() > 770 && $(window).width()<=2000){      
        $circlepopup.css("--popsize", "1.25rem");
    }
    isCirclepop = true;
}

function circlepopupOut(){
    if($(window).width() > 770){ 
        $circlepopup.css("--popsize", "0rem");
    }
    isCirclepop = false;
}

function circlepopAutoAdjust(){
    if($(window).width() <= 770){ 
        $circlepopup.css("--popsize", "0.85rem");
    }
    else{
        if(isCirclepop){
            circlepopupIn();
        }
        else{
            circlepopupOut();
        }
    }
}


function clickBack(){
    if(canClickCircle){
        window.cancelAnimationFrame(circleAnimReq);
        $circle.css("--circleh", "-25vh");
        $circle.css("--circleScale", "1");

        requestTimeout(()=>{
            window.location.href = "../index.html";
        }, 1400);
    }
}

// function adjustIframeHeight(index){
//     if(isSecLoaded && index != 1){
//         var selector = iframe_container_pre + index;
//         var iframe = document.getElementById(selector).querySelector("iframe");

//         if(index != 6){
//             var heightToSet = iframe.clientWidth * 9.0 / 16.0;
//             iframe.style.height = heightToSet + "px";
//         }
//         else{
//             var heightToSet = iframe.clientWidth * 0.75;
//             iframe.style.height = heightToSet + "px";
//         }
//     }
// }

// //used after switchNav
// function adjustIframeAnim(timestamp){
//     if(adjustIframeAnimStart === undefined){
//         adjustIframeAnimStart = timestamp;
//     }

//     adjustIframeHeight(iframeToAdjustIndex);
//     var elapsed = timestamp - adjustIframeAnimStart;

//     if(elapsed >= 650){
//         adjustIframeAnimStart = timestamp;
//     }
//     else{
//         window.requestAnimFrame(adjustIframeAnim);
//     }
// }

function main(){
    $("#loader").remove();

    $contentsWraper = $(".contents");
    $mySidenav = $("#mySidenav");
    $main = $("#main");
    $mainloader = $("#main_loader");
    $mainloaderProgress = $("#progress");
    $openbtn = $("#openbtn");
    $circle = $("#button");
    $circletint = $(".tint");
    $circlepopup = $("#btnpopup");

    // $navitems = $("nav .navlist");
    // $navitems.click(moveCircle);

    $navtint = $(".navtint");

    //first ready set side nav and nav button
    var width = $(this).width();
    if(width <= 1000){
        $openbtn.click(switchNav);
        $openbtn.html("&#9776;");
        $openbtn.css("cursor", "pointer");
        hasSetOpenBtnOn = true;
        isNavClickable = true;
    }
    else{
        isNavClickable = false;
        hasSetOpenBtnOn = false;
    }

    // $navitems.hover(hoverfontIn, hoverfontOut);
    // window.requestAnimFrame(checkTolightNavitems);

    $circle.hover(circlepopupIn, circlepopupOut);
    
    //click circle to go back
    $circle.click(clickBack);

    window.requestAnimFrame(switchNavTint);

    //set side nav and nav button as window resize
    $(window).resize(()=>{
        var width = $(this).width();

        if(!hasSetOpenBtnOn && width <= 1000){
            $openbtn.click(switchNav);
            $openbtn.html("&#9776;");
            $openbtn.css("cursor", "pointer");
            closeNav();
            hasSetOpenBtnOn = true;
            navOpen = false;
            isNavClickable = true;
        }
        else if (hasSetOpenBtnOn && width > 1000){
            $openbtn.unbind("click");
            $openbtn.html("");
            $openbtn.css("cursor", "auto");
            hasSetOpenBtnOn = false;
            isNavClickable = false;
            navOpen = true;
        }

        if(navOpen){
            adjustNav();
            // $circle.css("background-size", calcCircleBGSize());
        }
        circlepopAutoAdjust();

        // adjustIframeHeight(iframeToAdjustIndex);

    });

    isSecLoaded = false;
    window.requestAnimFrame(mainProgressAnim);
    startLoadSec1($mainloader);
}

$(document).ready(()=>{
    // var i;
    // for(i = 1; i <= numofNavitems; i++){
    //     imgs.push(folder + cbgname + i + ext);
    // }
    imgs.push(folder + cbgname + "1" + ".gif");
    imgs.push("./resources/main\ white3.jpg");
    imgs.push("./resources/main\ white3V.jpg");
    imgs.push("../imgs/buttonBG.jpg");
    loadImages(imgs, ()=>{
        $("#loader").css("opacity", "0");
        requestTimeout(main, 600);
    });
});