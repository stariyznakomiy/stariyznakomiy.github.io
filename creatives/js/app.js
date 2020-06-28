$(function () {


	// Mmenu
	$('#my-menu').mmenu({
		extensions: ['effect-menu-slide', 'pagedim-black', 'position-right', 'theme-black'],
		navbar: {
			title: '<a href="#"><img src="../images/logo.png" alt=""></a>'
		},

	});

	new WOW().init();
});
