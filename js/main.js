(function(){

    var scrolling = false;

    var snapper = {
        section: '.special',
        coordObj: {},
        offset: 200, //how many pixeli before snapping to the next section
        currentSection: 0,

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

        snap: function(){
            var self = this;

            console.log('test');

            scrolling = true;
            snapper.disableScroll();

            if( self.currentSection + 1 != $(self.section).length){
                self.currentSection++;
            }

            $('html, body').animate({
                scrollTop: self.coordObj[self.currentSection].scrollPos
            }, function(){
                scrolling = false;
                self.enableScroll();
            });
        },

        disableScroll: function(){
             $(document).on('mousewheel DOMMouseScroll', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });
        },

        enableScroll: function(){
            $(document).off();
        }
    }

    snapper.init();


    $(window).scroll(function(){

        if( $(this).scrollTop() > snapper.coordObj[currentSection].scrollTop + $(this).height() + snapper.offset && scrolling == false){
            snapper.snap();
            console.log('snappp');
        }

        // console.log( $(this).scrollTop() );
        // console.log( $(this).height() );
        // console.log( $(document).height() );

        // snapper.getCoords();
    });

})();
