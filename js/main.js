(function(){

    var snapper = {
        section: '.special',
        coordObj: {},
        offset: 0, //how many pixeli before snapping to the next section
        currentSection: 0,
        lastScrollPos: 0,
        scrolling: false,
        currentScrollPos: 0,

        init: function(){
            var self = this;

            self.getCoords();

            $(window).scroll(function(){
                snapper.scrollDirection();
            });
        },

        getCoords: function(){
            var self = this;

            $(self.section).each(function(index, value){
                var height = $(value).outerHeight(true);
                var id = $(value).attr('id');
                var scrollPos = $(value).offset().top;
                console.log(index, value, scrollPos);

                self.coordObj[index] = {
                    id: id,
                    height: height,
                    scrollPos: scrollPos
                };

            });
        },

        snap: function(direction){
            var self = this;
            var windowHeight = $(window).height();

            if(direction == 'down'){
                if( self.currentScrollPos + windowHeight - self.offset > self.coordObj[self.currentSection].scrollPos + self.coordObj[self.currentSection].height && self.currentSection != $(self.section).length - 1 ){

                    self.currentSection = ( self.currentSection + 1 < $(self.section).length ) ? self.currentSection + 1 : self.currentSection; // 0 index
                    snapper.disableScroll();
                    self.slideToSection();
                }
            }else{
                if( self.currentScrollPos - self.offset < self.coordObj[self.currentSection].scrollPos && self.currentSection != 0 ){

                    self.currentSection = ( self.currentSection - 1 >= 0 ) ? self.currentSection - 1 : self.currentSection; // 0 index
                    snapper.disableScroll();
                    self.slideToSection();
                }
            }
        },

        slideToSection: function(){
            var self = this;
            $('html, body').animate({
                scrollTop: self.coordObj[self.currentSection].scrollPos
            }, 1000).promise().done(function(){

                // Small "hack" to prevent scrolling after callback
                setTimeout(function(){
                    self.enableScroll();
                }, 100);
            });
        },

        scrollDirection: function(){
            var self = this;
            self.currentScrollPos = $(window).scrollTop();

            if( self.scrolling == false){
                if( self.lastScrollPos > self.currentScrollPos){
                    self.snap('up');
                }else{
                    self.snap('down');
                }
            }

            self.lastScrollPos = self.currentScrollPos;
        },

        disableScroll: function(){
            var self = this;
            $(document).on('mousewheel DOMMouseScroll', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            self.scrolling = true;
        },

        enableScroll: function(){
            var self = this;
            $(document).off();

            self.scrolling = false;
        }
    }

    snapper.init();

})();
