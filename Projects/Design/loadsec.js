let content1 = new File([`
<div id="content1">
<h1>Storytelling and Resillience</h1>
<h4>2 0 2 0</h4>
<img id="img-center1" src="./resources/Storytelling/p1.jpg">
<p>
    Storytelling and Resillience is a website that features students photo and video assignments in
    fall 2020 course DESMA 172: Storytelling and Resillience at Design Media Arts Department, UCLA.
    For this website, I desgined and brought to life ways to show photos and videos in a simple and smooth manner.
    <br><br>
    .
    <br>
    .
    <br>
    <br>
    <i class="far fa-circle"></i> Link to 
    <a target="_blank" href="https://classes.dma.ucla.edu/Fall20/172/">website</a>
</p>
<img id="img-center1" src="./resources/Storytelling/p2.jpg">
<img id="img-center1" src="./resources/Storytelling/p3.jpg">
</div> 
`], "content1");

let content2 = new File([`
<div id="content2">
<h1>Share Screen</h1>
<h4>2 0 2 0</h4>
<img id="img-center1" src="./resources/ShareScreen/p1.jpg">
<p>
    Share Screen is an online show featuring MFA students in Design Media Arts Department at UCLA. I worked
    on the graphics for the main page of this website. For this show, I worked with a team to make the graphics
    of the main page and I contributed mainly on the constructing an 3D environment for image rendering.
    <br><br>
    .
    <br>
    .
    <br>
    <br>
    <i class="fas fa-plug"></i> Link to 
    <a target="_blank" href="http://projects.dma.ucla.edu/exhibitions/sharescreen/">website</a>
</p>
<img id="img-center1" src="./resources/ShareScreen/p2.jpg">
<img id="img-center1" src="./resources/ShareScreen/p3.jpg">
<img id="img-center1" src="./resources/ShareScreen/p4.jpg">
<img id="img-center1" src="./resources/ShareScreen/p5.jpg">
<img id="img-center1" src="./resources/ShareScreen/p6.jpg">
<img id="img-center1" src="./resources/ShareScreen/p7.jpg">
</div> 
`], "content2");

let filesToRead = [content1, content2];
let imgsToLoad = [3, 7];
let foldernames = ["Storytelling/", "ShareScreen/"];
let masterFolder = "./resources/";

const iframe_container_pre = "content"; 

var isSecLoaded;

function adjustIframeHeightPreloadImage(index){
    if(index != 1 && index != 2){
        var selector = iframe_container_pre + index;
        var iframe = document.getElementById(selector).querySelector("iframe");

        var heightToSet = iframe.clientWidth * 9.0 / 16.0;
        iframe.style.height = heightToSet + "px";
    }
}

function loadsections(wraper, index, mainloader){
    var fr = new FileReader();
    fr.onload = function(){
        wraper.html(fr.result);
        window.scrollTo(0,0);

        var imgs = []
        for(var i = 1; i <= imgsToLoad[index - 1]; i ++){
            var ext = ".jpg";
            imgs.push(masterFolder + foldernames[index - 1] + "p" + i + ext);
        }

        adjustIframeHeightPreloadImage(index);

        loadImages(imgs, function(){
            mainloader.css("--mainloaderAlpha", "0");
            requestTimeout(()=>{
                mainloader.css("z-index", "-2");
                isSecLoaded = true;

                requestTimeout(()=>{
                    if(isNavClickable && navOpen){
                        switchNav();
                    }
                }, 10);
            }, 500);
        });
    }

    fr.readAsText(filesToRead[index - 1]);
}

function startLoadSec1(mainloader){
    var imgs = []
    for(var i = 1; i <= imgsToLoad[0]; i ++){
        imgs.push(masterFolder + foldernames[0] + "p" + i + ".jpg");
    }

    adjustIframeHeightPreloadImage(1);

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