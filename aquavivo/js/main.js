$(document).ready(function() {



    $('.js--mob-nav-open').on('click', function () {

        $(this).parent().toggleClass('is--open');
        $('body').toggleClass('overlay');
        $('.wrap-mobile-menu').toggle();
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 46) {
            $('.header-bottom').addClass('header-bottom_sticky');
        } else {
            $('.header-bottom').removeClass('header-bottom_sticky');
        }
    });
    $('.js--mobile-menu-dropdown-open').on('click', function() {
        $(this).parent().toggleClass('mobile-menu-bottom-nav__item_open');

        return false;
    });
})