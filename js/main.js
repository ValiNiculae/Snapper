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

            console.log(self.currentSection);


            if(direction == 'down'){
                if( self.currentScrollPos + windowHeight - self.offset > self.coordObj[self.currentSection].scrollPos + self.coordObj[self.currentSection].height ){
                    self.currentSection = ( self.currentSection + 1 < $(self.section).length ) ? self.currentSection + 1 : self.currentSection; // 0 index

                    snapper.disableScroll();

                    $('html, body').animate({
                        scrollTop: self.coordObj[self.currentSection].scrollPos
                    }, 2000, function(){
                        self.enableScroll();
                    });
                }
            }else{
                if( self.currentScrollPos - self.offset < self.coordObj[self.currentSection].scrollPos ){
                    self.currentSection = ( self.currentSection - 1 >= 0 ) ? self.currentSection - 1 : self.currentSection; // 0 index
                    snapper.disableScroll();

                    $('html, body').animate({
                        scrollTop: self.coordObj[self.currentSection].scrollPos
                    }, 2000, function(){
                        self.enableScroll();
                    });
                }
            }
        },

        scrollDirection: function(){
            var self = this;
            self.currentScrollPos = $(window).scrollTop();

            if( self.scrolling == false){
                if( self.lastScrollPos > self.currentScrollPos){
                    // console.log('scrolling up');
                    self.snap('up');
                }else{
                    // console.log('scrolling down');
                    self.snap('down');
                }
            }


            self.lastScrollPos = self.currentScrollPos;
        },

        disableScroll: function(){
            $(document).on('mousewheel DOMMouseScroll', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            self.scrolling = true;
        },

        enableScroll: function(){
            $(document).off();
            self.scrolling = false;
        }
    }

    snapper.init();

    $(window).scroll(function(){
        snapper.scrollDirection();
    });

})();
