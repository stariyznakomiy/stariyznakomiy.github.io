$(document).ready(function () {

    $('.catalog-slider-h-tab-link').on('click', function () {
        let $slider = $(this).closest('.wrap-catalog-slider').find('.catalog-slider');

        let filter = $(this).data('filter');

        $('.catalog-slider-h-tab-link').removeClass('is--active');
        $(this).addClass('is--active');
        $slider.slick('slickUnfilter');
        $slider.slick('slickFilter', '[data-type="' + filter + '"]');
        return false;
    });


    $('.catalog-slider_tab').each(function () {
        $(this).on('init', function (event, slick, direction) {
            let filter = $(this).prevAll('.wrap-catalog-slider-h-tab').find('.is--active').data('filter');
            let $slider = $(this);
            setTimeout(function () {
                $slider.slick('slickFilter', '[data-type="' + filter + '"]');
            }, 0);


        });
        $(this).slick({
            arrows: true,
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            touchMove: false,
            prevArrow: $(this).prev('.catalog-slider-arrow').find('.catalog-slider-arrow-prev'),
            nextArrow: $(this).prev('.catalog-slider-arrow').find('.catalog-slider-arrow-next'),
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                }, {
                    breakpoint: 1040,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }, {
                    breakpoint: 900,
                    settings: {
                        touchMove: true,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        touchMove: true,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        touchMove: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });



    })

})

$(document).ready(function () {

    $('.catalog-slider').not('.catalog-slider_tab').each(function () {

        $(this).slick({
            arrows: true,
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            touchMove: false,
            prevArrow: $(this).prev('.catalog-slider-arrow').find('.catalog-slider-arrow-prev'),
            nextArrow: $(this).prev('.catalog-slider-arrow').find('.catalog-slider-arrow-next'),
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                }, {
                    breakpoint: 1040,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }, {
                    breakpoint: 900,
                    settings: {
                        touchMove: true,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        touchMove: true,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        touchMove: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    })

})




// $(document).ready(function () {
//     $('.item-basket__related-slider').each(function () {
//         $(this).slick({
//             arrows: true,
//             dots: false,
//             slidesToShow: 4,
//             slidesToScroll: 4,
//             touchMove: false,
//             prevArrow: $(this).prev('.related-slider-arrow').find('.related-slider-arrow-prev'),
//             nextArrow: $(this).prev('.related-slider-arrow').find('.related-slider-arrow-next'),
//             responsive: [
//                 {
//                     breakpoint: 1400,
//                     settings: {
//                         slidesToShow: 3,
//                         slidesToScroll: 3,
//                     }
//                 },
//                 {
//                     breakpoint: 1280,
//                     settings: {
//                         slidesToShow: 3,
//                         slidesToScroll: 3,
//                     }
//                 }, {
//                     breakpoint: 1040,
//                     settings: {
//                         slidesToShow: 3,
//                         slidesToScroll: 3
//                     }
//                 }, {
//                     breakpoint: 900,
//                     settings: {
//                         touchMove: true,
//                         slidesToShow: 3,
//                         slidesToScroll: 3
//                     }
//                 },
//                 {
//                     breakpoint: 750,
//                     settings: {
//                         touchMove: true,
//                         slidesToShow: 2,
//                         slidesToScroll: 2
//                     }
//                 },
//                 {
//                     breakpoint: 600,
//                     settings: {
//                         touchMove: true,
//                         slidesToShow: 1,
//                         slidesToScroll: 1
//                     }
//                 }
//             ]
//         });
//     })
// })


$(document).ready(function () {
    $('.advantage-slider').each(function () {
        $(this).slick({
            arrows: false,
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1285,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true,

                    }
                },
                {
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,

                    }
                },
                {
                    breakpoint: 780,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true
                    }
                }
            ]
        });
    })

})




$(document).ready(function () {
    $('.auction-section-detail-title__link').on('click', function () {
        $(this).toggleClass('is--active');
        $(this).closest('.auction-section-detail').find('.auction-section-detail-body').toggle();
        return false;
    });

})


$(document).ready(function () {
    $('.js--aside-selection-toggle').on('click', function () {
        let text = $(this).text();
        $(this).closest('.aside-selection-panel').find('.aside-selection-panel__hide').toggle();
        $(this).text(text == "Скрыть" ? "Показать все" : "Скрыть");
        return false;
    })
})



$(document).ready(function () {
    $('.bottom-panel__top-btn').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

    var headerTopHeight = $('.wrap-header').outerHeight();
    if ($(window).width() > 980) {
        $(window).on('scroll', function () {
            var top = $(document).scrollTop();

            if (top > headerTopHeight) {
                $('.bottom-panel').addClass('bottom-panel--show');
            } else {
                $('.bottom-panel').removeClass('bottom-panel--show');
            }
        });
    }
})





// .grid scripts goes here 

/*$(function() {
	
});*/
// $(document).ready(function () {
//
//
// });
//


$(document).ready(function () {
    $('.js-header-contact-toggle .ico-header-contact-toggle').on('click', function () {
        $('.header-top-mobile').toggleClass('is--open-mobile-cont');
        $('.is--nav-open').removeClass('is--nav-open');
        return false;
    });

    $('.js-humburger-mobile').on('click touchstart', function () {
        $('body').toggleClass('is--nav-open');
        $('.is--open-mobile-cont').removeClass('is--open-mobile-cont');

        return false;
    });

})


$(document).ready(function () {
    $('.js--city-location-open').on('click', function () {
        $('.city-location-content').toggleClass('is-open');
        return false;
    });
    $('.js--city-location-close').on('click', function () {
        $('.city-location-content').toggleClass('is-open');
        return false;
    });
    $(document).mouseup(function (e) {
        var container = $('.city-location-content');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.city-location-content').removeClass('is-open');
        }
    });
})

$(document).ready(function () {
    $('.js--singin-popup').on('click', function () {
        $('.header-auth-dropdown').toggleClass('is--open');
        $('body').toggleClass('overlay');
        return false;
    });
    $(document).mouseup(function (e) {
        var container = $('.header-login');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.header-auth-dropdown').removeClass('is--open');
            $('body').removeClass('overlay');
        }
    });

})


$(document).ready(function () {

    var isMobile = (function () {
        var a = navigator.userAgent || navigator.vendor || window.opera;
        return /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|iP(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    })();

    if (isMobile) {
        // удалить в продакшене
        $('.bx-no-touch').removeClass('bx-no-touch');
    }
    if (isMobile) {

        $('.has--dropdown > a').on('click', function () {
            $(this).parent().toggleClass('is--open');
            console.log('1');
            return false;
        });
    }

})


$(document).ready(function () {
    $('.main-slider-body').slick({
        arrows: true,
        dots: true,
        prevArrow: $('.main-slider-arrow-prev'),
        nextArrow: $('.main-slider-arrow-next'),
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    arrows: false,
                }
            }
        ]
    });
})


$(document).ready(function () {
    let mainNavTimeout = null;

    $('.main-nav-btn').on('click', function () {
        if ($(this).hasClass('main-nav-btn_open')) {
            $(this).removeClass('main-nav-btn_open');
            $('.wrap-main-nav').hide();
        } else {
            $(this).addClass('main-nav-btn_open');
            $('.wrap-main-nav').show();
        }
        return false;
    });
    $('.main-nav-list__link').on('mouseenter', function () {
        let id = $(this).data('id');
        let $ctx = $(this);
        $('.main-nav__body').show();
        mainNavTimeout = setTimeout(function () {
            $('.main-nav-list__item_open').removeClass('main-nav-list__item_open');
            $ctx.parent().addClass('main-nav-list__item_open');
            $('.main-nav-section').hide();
            $('#section_' + id).show();
        }, 100);

        return false;
    });
    $('.main-nav').on('mouseleave', function () {
        if ($('.main-nav-list__item_act').length) {
            let id = $('.main-nav-list__item_act a').data('id');
            $('.main-nav-list__item_open').removeClass('main-nav-list__item_open');
            $('.main-nav-section').hide();
            $('#section_' + id).show();
        } else {
            $('.main-nav__body').hide();
        }
    });


    $('.main-nav-list__link').on('mouseleave', function () {
        clearTimeout(mainNavTimeout);
        mainNavTimeout = null;
    });
    $('.main-nav__body').on('mouseenter', function () {
        return false;
    });



    $('.js--mobile-catalog-nav-open').on('click', function () {
        if ($(this).parent().hasClass('mobile-catalog-nav__item_open')) {
            $(this).parent().removeClass('mobile-catalog-nav__item_open');
            $(this).next('.mobile-catalog-nav__dropdown').slideUp();
        } else {
            $(this).parent().addClass('mobile-catalog-nav__item_open');
            $(this).next('.mobile-catalog-nav__dropdown').slideDown();
        }
        return false;
    });
    $('.main-nav-mobile-btn').on('click', function () {
        if ($('.mobile-catalog-nav').is(':visible')) {
            $('.mobile-catalog-nav').slideUp();
        } else {
            $('.mobile-catalog-nav').slideDown();
        }

        return false;
    });



})

// $(document).ready(function() {
//
//     $('.js--pager-sort-dropdown').off('click');
//     $('.js--pager-sort-dropdown').on('click', function() {
//         $(this).next('.pager-sort-dropdown').toggle();
//         $(this).toggleClass('pager-toolbar-sort__link_open');
//         return false;
//     });
//
//     $(document).mouseup(function (e){
//         var div = $('.pager-toolbar-sort');
//         if (!div.is(e.target)
//             && div.has(e.target).length === 0) {
//             $('.js--pager-sort-dropdown').removeClass('pager-toolbar-sort__link_open');
//             $('.pager-sort-dropdown').hide();
//         } else {
//             return false;
//         }
//     });
// })






// .search-pane scripts goes here 

/*$(function() {
	
});*/
$(document).ready(function () {
    $('.js-section-slider').slick()
})



// $(document).ready(function() {
//     $('.js--tabs-head-item__link').on('click', function() {
//         let id = $(this).attr('href');
//         let $tabsWrap = $(this).closest('.tabs');
//         $tabsWrap.find('.tabs-head-item__act').removeClass('tabs-head-item__act');
//         $(this).parent().addClass('tabs-head-item__act');
//         $tabsWrap.find('.tabs-item').hide();
//         $(id).show();
//         return false;
//     });
//
// })
//
// $('.js-up-btn').on('click', function () {
//     $('html, body').animate({
//         scrollTop: 0
//     }, 800);
//     return false;
// });
// $(window).scroll(function () {
//     if ($(this).scrollTop() > 500) {
//         $('.up-btn').show();
//     } else {
//         $('.up-btn').hide();
//     }
// });