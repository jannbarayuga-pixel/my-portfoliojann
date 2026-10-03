/**
 * Custom Teal Slider with Rounded Edges
 * This script initializes a custom Swiper slider with rounded edges and teal/cyan styling
 */

(function ($) {
    "use strict";

    function initCustomSlider() {
        // Initialize the custom slider if it exists on the page
        if ($('.dsn-custom-slider').length) {
            $('.dsn-custom-slider').each(function() {
                const $slider = $(this);
                const $progressBar = $slider.find('.swiper-progress-bar .progress');
                
                // Initialize Swiper
                const swiper = new Swiper($slider.find('.swiper-container')[0], {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    speed: 1000,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    loop: true,
                    loopAdditionalSlides: 1,
                    grabCursor: true,
                    watchSlidesProgress: true,
                    navigation: {
                        nextEl: $slider.find('.swiper-button-next')[0],
                        prevEl: $slider.find('.swiper-button-prev')[0],
                    },
                    pagination: {
                        el: $slider.find('.swiper-pagination')[0],
                        clickable: true,
                    },
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    on: {
                        init: function() {
                            // Update progress bar on initialization
                            if ($progressBar.length) {
                                $progressBar.css('width', '0%');
                            }
                            
                            // Add active class to first slide caption
                            $slider.find('.swiper-slide-active .slide-caption').addClass('active');
                            
                            // Add animation effects with GSAP if available
                            if (typeof gsap !== 'undefined') {
                                const activeSlide = $slider.find('.swiper-slide-active');
                                gsap.fromTo(activeSlide.find('.slide-caption'), 
                                    { y: 50, opacity: 0 }, 
                                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
                                );
                            }
                        },
                        slideChange: function() {
                            // Reset progress bar on slide change
                            if ($progressBar.length) {
                                $progressBar.css('width', '0%');
                            }

                            // Add animation effects with GSAP if available
                            if (typeof gsap !== 'undefined') {
                                const activeSlide = $slider.find('.swiper-slide-active');
                                gsap.fromTo(activeSlide.find('.slide-caption'), 
                                    { y: 50, opacity: 0 }, 
                                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
                                );
                            }
                        },
                        slideChangeTransitionEnd: function() {
                            // Get current slide
                            const activeIndex = this.activeIndex;
                            const realIndex = this.realIndex;

                            // Custom event after transition
                            $slider.trigger('slideChangeCompleted', [realIndex, activeIndex]);
                        },
                        autoplayTimeLeft: function(swiper, timeLeft, percentage) {
                            // Update progress bar during autoplay
                            if ($progressBar.length) {
                                $progressBar.css('width', (100 - percentage) + '%');
                            }
                        }
                    }
                });

                // Stop autoplay on hover if specified
                if ($slider.data('pause-on-hover')) {
                    $slider.on('mouseenter', function() {
                        swiper.autoplay.stop();
                    });
                    
                    $slider.on('mouseleave', function() {
                        swiper.autoplay.start();
                    });
                }

                // Expose swiper instance
                $slider.data('swiper', swiper);
            });
        }
    }

    // Initialize when document is ready
    $(document).ready(function() {
        initCustomSlider();
    });

    // Initialize when page is fully loaded (for images)
    $(window).on('load', function() {
        // Refresh swiper to handle any size changes
        $('.dsn-custom-slider').each(function() {
            const swiper = $(this).data('swiper');
            if (swiper) {
                swiper.update();
            }
        });
    });

    // Re-initialize on AJAX completion (for your theme's AJAX navigation)
    $(document).on('ajax-page-loaded', function() {
        initCustomSlider();
    });

})(jQuery); 