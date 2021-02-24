$(function () {


	$('.testimonial__slider').slick({
		infinite: false,
		prevArrow: '<div class="testimonial__arrows testimonial__arrow-left"><i class="fas fa-long-arrow-alt-left "></i></div>',
		nextArrow: '<div class="testimonial__arrows testimonial__arrow-right"><i class="fas fa-long-arrow-alt-right "></i></div>'
	});


	$('.testimonial__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		var inactive = document.getElementsByClassName("testimonial__arrows arrow-inactive");
		if (nextSlide === 0) {
			$('.testimonial__arrow-left').addClass('arrow-inactive');
		}
		if (nextSlide === slick.slideCount - 1) {
			$('.testimonial__arrow-right').addClass('arrow-inactive');
		}
		if (currentSlide === 0) {
			$('.testimonial__arrow-left').removeClass('arrow-inactive');
		}
		if (currentSlide === slick.slideCount - 1) {
			$('.testimonial__arrow-right').removeClass('arrow-inactive');
		}
	});


 	var faqitems = $(".faq__item")

	$.each(faqitems, function (index, item) {
		$(item).on('click', function (event) {
			if ($(event.target).hasClass('faq__item-title')){
				$(this).toggleClass('faq__item--active');
			}
		})
	}); 

	/* $('.faq__item-title').on('click', function () {
		$('.faq__item').addClass('faq__item--active')
	}) */

	// Mmenu
	$('#my-menu').mmenu({
		extensions: ['effect-menu-slide', 'pagedim-black', 'position-front', 'theme-black'],
		navbar: {
			title: '<a href="#"><img src="images/logo.png" alt=""></a>'
		},

	});

	var hamburgers = $(".hamburger");
	
	/* if (hamburgers.length > 0) {
		$.each(hamburgers, function (hamburger) {
			$(hamburger).on("click", function () {
				$(this).toggleClass("is-active");
			});
		});
	} */

	$(".hamburger").on("click", function () {
		$(this).toggleClass("is-active");
	});



	$(".switcher-monthly").on("click", function () {
		if ($(this).hasClass("switcher-active")){
		} else{
			$(this).addClass("switcher-active");
			$(".switcher-annually").removeClass("switcher-active");
			$(".tariffs__switcher-btn").removeClass("annualy");
			$('.tariffs__item-monthly .price-cost').text('99$');
		}
	});

	$(".switcher-annually").on("click", function () {
		if ($(this).hasClass("switcher-active")) {
		} else {
			$(this).addClass("switcher-active");
			$(".switcher-monthly").removeClass("switcher-active");
			$(".tariffs__switcher-btn").addClass("annualy");
			$('.tariffs__item-monthly .price-cost').text('1188$');
		}
	});


	

	
});


$(window).on('load', function () {
	$('.loader__wrap').delay(2000).fadeOut('slow');
	setTimeout(function () { new WOW().init(); }, 2000);
});