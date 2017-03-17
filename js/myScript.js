$(document).ready(function() {

    //full page config
    jQuery('#fullpage').fullpage({
        //Navigation
        menu: '#myMenu',
        lockAnchors: false,
        anchors: ['home', 'technologies', 'projects', 'about', 'contact'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        resetSliders: false,
        fadingEffect: true,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: true,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: false,
        verticalCentered: true,
        sectionsColor: ['#2B2B2B', '#1B1A18', '#F6F6F6', '#E9E581', '#EEE'],
        paddingTop: '3em',
        paddingBottom: '10px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: false,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction) {},
        afterLoad: function(anchorLink, index) {},
        afterRender: function() {},
        afterResize: function() {},
        afterResponsive: function(isResponsive) {},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
    });

    //slick nav config
    $(function() {
        $('#myMenu').slicknav({
            'label': '',
            'brand': 'SabriRh',
            'closeOnClick': true,
            'animations': 'jquery',
            'easingOpen': 'swing', // Easing used for open animations.
            'easingClose': 'swing' // Easing used for close animations.
        });

        $('.section').on('click', function() {
            $('#myMenu').slicknav('close');
        });
    });

    //segmenter config
    (function() {
        var headline = document.querySelector('.trigger-headline'),
            segmenter = new Segmenter(document.querySelector('.segmenter'), {
                pieces: 7,
                shadowsAnimation: {
                    opacity: .7,
                    translateX: 20,
                    translateY: 20
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutExpo',
                    delay: 100,
                    translateZ: { min: 10, max: 45 }
                },
                parallax: true,
                positions: [
                    { top: 0, left: 0, width: 30, height: 30 },
                    { top: 20, left: 20, width: 30, height: 30 },
                    { top: 40, left: 40, width: 30, height: 30 },
                    { top: 60, left: 60, width: 30, height: 40 },
                    { top: 80, left: 80, width: 30, height: 30 },
                    { top: 100, left: 100, width: 30, height: 30 },
                    { top: 80, left: 0, width: 20, height: 20 }
                ],
                onReady: function() {



                    setTimeout(function() {
                        segmenter.animate();
                        headline.classList.remove('trigger-headline--hidden');
                    }, 1000);

                }
            });
    })();



    //init the accordion component semantic ui
    $('.ui.accordion').accordion();



});
