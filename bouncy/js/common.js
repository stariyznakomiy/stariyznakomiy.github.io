$(function() {


// Mmenu

	$('#my-menu').mmenu({
		extensions: ['effect-menu-slide', 'pagedim-black', 'position-right','theme-black'],
		navbar: {
			title: '<span href="#" class="logo">BOUNCY</span>'
		},

	});

	$("#grid-filter li").click(function(){
			$("#grid-filter li").removeClass('active');
			$(this).addClass('active');
		});


	//E-mail Ajax Send
	$("form.form-subscribe").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.form-success').addClass('active').scc('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				// Done Functions
				$(th).find('.form-success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});


// Animation //

$(".p").addClass("wow fadeInUp delay-1s fast");
$(".h2").addClass("wow fadeInDown delay-1s fast");
$(".sect-center-title").addClass("wow fadeInDown delay-1s fast");
$(".h3").addClass("wow fadeInDown delay-1s fast");
$(".s-ipad p").addClass("wow fadeInLeft delay-1s fast");
$(".s-ipad a").addClass("wow fadeInUp delay-1s fast");
$(".ipad-wrap").addClass("wow fadeInRight delay-1s fast");
$(".s-details .icons").addClass("wow zoomIn delay-1s fast");
$(".h4").addClass("wow fadeInDown delay-1s fast");
$(".s-details p").addClass("wow zoomIn delay-1s fast");
$(".s-our-services .icons").addClass("wow fadeInLeft delay-1s fast");
$(".s-our-services p").addClass("wow zoomIn delay-1s fast");
$(".skills").addClass("wow zoomIn delay-1s fast");
$(".s-team-quotes p").addClass("wow zoomIn delay-1s fast");
$(".button").addClass("wow zoomIn delay-1s fast");
$(".mcbook").addClass("wow fadeInRight delay-1s fast");
$(".plans").addClass("wow zoomIn delay-1s fast");
$(".contact-info").addClass("wow zoomIn delay-1s fast");
$("input").addClass("wow zoomIn delay-1s fast");




$(".find-us span").click(function(){
	$(".find-us").fadeOut('slow');
});








var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();

// Scroll

	$("a[href*='#']").click(function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
        return false;
    });


// init Masonry
	var $grid = $('#masonry-grid').masonry({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  columnWidth: '.grid-sizer'
	});

	
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    items: 1
});


$("#grid-filter li").click(function() {
    var group = $(this).data('category');
	var group_class = "." + group;
	
    if(group == "*"){
        $(".grid-item").show();
	    $('#masonry-grid').masonry('layout');
       }
    else if(group != "") {
		$(".grid-item").hide();
		$(group_class).show();
		$('#masonry-grid').masonry('layout');
	} else {
		$(".grid-item").show();
		$('#masonry-grid').masonry('layout');
	}
	});


// $(".preloader").fadeOut();
// layout Masonry after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.masonry('layout');
	});



});

$(window).on('load', function(){
	$('.preloader').delay(600).fadeOut('slow');
});