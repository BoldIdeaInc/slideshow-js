/* 
 * Forked from https://github.com/leemark/better-simple-slideshow 
 */
var makeSlideshow = function (el, options) {
  var $slideshows = document.querySelectorAll(el), // a collection of all of the slideshow
    $slideshow = {},
    Slideshow = {
      init: function (el, options) {
        this.counter = 0; // to keep track of current slide
        this.el = el; // current slideshow container    
        this.$items = el.querySelectorAll('figure'); // a collection of all of the slides, caching for performance
        this.numItems = this.$items.length; // total number of slides
        options = options || {}; // if options object not passed in, then set to empty object 
        options.auto = options.auto || true; // if options.auto object not passed in, then set to false
        this.opts = {
          auto: (typeof options.auto === "undefined") ? false : options.auto,
          speed: (typeof options.auto.speed === "undefined") ? 4000 : options.auto.speed,
          pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
          swipe: (typeof options.swipe === "undefined") ? false : options.swipe
        };
        
        this.$items[0].classList.add('bss-show'); // add show class to first figure 

        // put base element inside a wrapper
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('bss-wrapper');
        this.el.classList.add('bss-slides');
        this.el.parentNode.insertBefore(this.$wrapper, this.el);
        this.$wrapper.appendChild(this.el);

        this.injectControls(el);
        this.addEventListeners(el);
        if (this.opts.auto) {
          this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
        }
        if (this.opts.swipe) {
          this.addSwipe(this.el);
        }
      },
      showCurrent: function (i) {
        // increment or decrement this.counter depending on whether i === 1 or i === -1
        if (i > 0) {
          this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
        } else {
          this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
        }

        // remove .show from whichever element currently has it 
        // http://stackoverflow.com/a/16053538/2006057
        [].forEach.call(this.$items, function (el) {
          el.classList.remove('bss-show');
        });
  
        // add .show to the one item that's supposed to have it
        this.$items[this.counter].classList.add('bss-show');
      },
      injectControls: function (el) {
        // first create all the new elements
        var spanPrev = document.createElement("span"),
          spanNext = document.createElement("span");
    
        // add classes
        spanPrev.classList.add('bss-prev');
        spanNext.classList.add('bss-next');
    
        // add contents
        spanPrev.innerHTML = '&laquo;';
        spanNext.innerHTML = '&raquo;';
        
        this.$wrapper.insertBefore(spanPrev, this.el);
        this.$wrapper.insertBefore(spanNext, null);
      },
      addEventListeners: function (el) {
        var that = this;
        this.$wrapper.querySelector('.bss-next').addEventListener('click', function () {
          that.showCurrent(1); // increment & show
        }, false);
      
        this.$wrapper.querySelector('.bss-prev').addEventListener('click', function () {
          that.showCurrent(-1); // decrement & show
        }, false);
        
        el.onkeydown = function (e) {
          e = e || window.event;
          if (e.keyCode === 37) {
            that.showCurrent(-1); // decrement & show
          } else if (e.keyCode === 39) {
            that.showCurrent(1); // increment & show
          }
        };
      },
      autoCycle: function (el, speed, pauseOnHover) {
        var that = this,
          interval = window.setInterval(function () {
            that.showCurrent(1); // increment & show
          }, speed);
        
        if (pauseOnHover) {
          el.addEventListener('mouseover', function () {
            interval = clearInterval(interval);
          }, false);
          el.addEventListener('mouseout', function () {
            interval = window.setInterval(function () {
              that.showCurrent(1); // increment & show
            }, speed);
          }, false);
        } // end pauseonhover
        
      },
      addSwipe: function(el){
        var that = this,
          ht = new Hammer(el);
        ht.on('swiperight', function(e) {
          that.showCurrent(-1); // decrement & show
        });
        ht.on('swipeleft', function(e) {
          that.showCurrent(1); // increment & show
        });
      },
    }; // end Slideshow object .....

  // make instances of Slideshow as needed
  [].forEach.call($slideshows, function (el) {
    $slideshow = Object.create(Slideshow);
    $slideshow.init(el, options);
  });
};
