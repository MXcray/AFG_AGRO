$(document).ready(function(){
    // $('.slider').slick({
    // });
    $('.project__slider').slick({
        slidesToShow: 3,
        dots: true,
        prevArrow: '<img src="images/dest/icons/slider/prev.svg" alt="arrow" class="prev">',
        nextArrow: '<img src="images/dest/icons/slider/next.svg" alt="arrow" class="next">',
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    // arrows: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 601,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.diplom__slider').slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: '<img src="images/dest/icons/slider/prev.svg" alt="arrow" class="prev">',
        nextArrow: '<img src="images/dest/icons/slider/next.svg" alt="arrow" class="next">',
        dots: true,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    infinite: false,
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 601,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider_for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<img src="images/dest/icons/slider/prev.svg" alt="arrow" class="prev">',
        nextArrow: '<img src="images/dest/icons/slider/next.svg" alt="arrow" class="next">',
        fade: true,
        dots: false,
        // variableWidth: true,
        onAfterChange : function() {
            // player.stopVideo();
            // video.stopVideo();
        },
        asNavFor: '.slider_nav',
        responsive: [
            { 
                breakpoint: 870,
                settings: {
                    arrows: false,
                }
            },
        ]
      });
      $('.slider_nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<img src="images/dest/icons/slider/prev.svg" alt="arrow" class="prev">',
        nextArrow: '<img src="images/dest/icons/slider/next.svg" alt="arrow" class="next">',
        asNavFor: '.slider_for',
        dots: true,
        focusOnSelect: true,
        responsive: [
            { 
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
      });
        // var video = $('.slider_for .slick-active').on('click', function() {
        //     find('video').get(0).play();
        // })

        // $('.slider_for').on('click', function(event, slick, currentSlide, nextSlide){
        // $('.slider_for .slick-slide').find('video').get(0).pause();
        // var video = $('.slider_for .slick-active').find('video').get(0).play();
        // });

        

        // var video = $('.slider_for .slick-active #myVideo')[0];
        // var videoControls = $('.video-control');
        // videoControls.on('click', function () {
        //     if (video.paused) {
        //         video.play();
        //         // $videoContainer.addClass('video-is-playing');
        //     } else {
        //         video.pause();
        //         video.load()
        //     }
        // })

        // var video = $('.slick-slide .slick-active #myVideo')[0];
        
        // console.log(videoContainer);
        var videoControls = $('.video-control');
        videoControls.on('click', function() {
            var video = $('.slider_for .slick-active').find('video').get(0);
            var videoContainer = $('.slick-active #video');
            if (video.paused) {
                video.play();
                videoContainer.addClass('video-is-playing');
            } else {
                video.pause();
                videoContainer.removeClass('video-is-playing');
                video.load();
                
                // var video = $('.slider_for .slick-active').find('video').get(0).pause();
            }
        });
  });