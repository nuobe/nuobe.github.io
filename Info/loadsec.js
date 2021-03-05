let content1 = new File([`

`], "content1");


let filesToRead = [content1];
let imgsToLoad = [1];
let foldernames = ["Info/"];
let masterFolder = "./resources/";

const iframe_container_pre = "content"; 

var isSecLoaded;

// function adjustIframeHeightPreloadImage(index){
//     if(index != 1){
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

// function loadsections(wraper, index, mainloader){
//     var fr = new FileReader();
//     fr.onload = function(){
//         wraper.html(fr.result);
//         window.scrollTo(0,0);

//         var imgs = []
//         for(var i = 1; i <= imgsToLoad[index - 1]; i ++){
//             imgs.push(masterFolder + foldernames[index - 1] + "p" + i + ".jpg");
//         }

//         adjustIframeHeightPreloadImage(index);

//         loadImages(imgs, function(){
//             mainloader.css("--mainloaderAlpha", "0");
//             requestTimeout(()=>{
//                 mainloader.css("z-index", "-2");
//                 isSecLoaded = true;

//                 requestTimeout(()=>{
//                     if(isNavClickable && navOpen){
//                         switchNav();
//                     }
//                 }, 10);
//             }, 500);
//         });
//     }

//     fr.readAsText(filesToRead[index - 1]);
// }

function startLoadSec1(mainloader){
    var imgs = []
    for(var i = 1; i <= imgsToLoad[0]; i ++){
        var ext = ".jpg";
        if(i == 1){
            ext = ".gif";
        }
        imgs.push(masterFolder + foldernames[0] + "p" + i + ext);
    }
    loadImages(imgs, function(){
        mainloader.css("--mainloaderAlpha", "0");
        requestTimeout(()=>{
            mainloader.css("z-index", "-2");
            isSecLoaded = true;
            requestTimeout(()=>{
                switchNav();
                startCircle();
            }, 30);
        }, 300);
    }); 
}