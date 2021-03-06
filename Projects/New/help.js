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

 //class for detect touch swipes
 class Swipe {
  constructor(element) {
      this.xDown = null;
      this.yDown = null;
      this.movedLeft = false;
      this.movedRight = false;
      this.element = document.getElementById(element);
  }

  getTouches(evt) {
    return evt.touches ||             // browser API
           evt.originalEvent.touches; // jQuery
  }                                                     
  
  handleTouchStart(evt) {
      const firstTouch = this.getTouches(evt)[0];                                      
      this.xDown = firstTouch.clientX;                                      
      this.yDown = firstTouch.clientY;                                      
  };   

  onLeft(callback) {
      this.onLeft = callback;

      return this;
  }

  onRight(callback) {
      this.onRight = callback;

      return this;
  }

  onUp(callback) {
      this.onUp = callback;

      return this;
  }

  onDown(callback) {
      this.onDown = callback;

      return this;
  }

  handleTouchMove(evt) {
      if ( ! this.xDown || ! this.yDown ) {
         return;
      }

      var xUp = evt.changedTouches[0].clientX;
      var yUp = evt.changedTouches[0].clientY;

      this.xDiff = this.xDown - xUp;
      this.yDiff = this.yDown - yUp;

      if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) { // Most significant.
          if ( this.xDiff > 0 ) {
              this.movedLeft = true;
              this.movedRight = false;
          } else {
              this.movedRight = true;
              this.movedLeft = false;
          }
      } else {
          if ( this.yDiff > 0 ) {
              ;
          } else {
              ;
          }
      }

      // Reset values.
      this.xDown = null;
      this.yDown = null;
  }

  handleTouchEnd(evt){
    if(this.movedLeft){
      if(this.onLeft !== undefined){
        this.onLeft();
      }
    }
    else if(this.movedRight){
      if(this.onRight !== undefined){
        this.onRight();
      }
    }
    this.movedLeft = false;
    this.movedRight = false;
  }
}