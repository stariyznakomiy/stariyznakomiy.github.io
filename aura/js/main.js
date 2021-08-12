"use strict";

$(window).ready(function () {
  'use strict';
  /* --------- Burger Icon Start --------- */

  $(".burger-icon").click(function () {
    $(this).toggleClass('active');
    $('nav').toggleClass('is-open');
    $('body').toggleClass('is-overflow-hidden');
    $(".burger-icon.active").click(function () {
      $('.main-menu__megamenu').removeClass('open');
    });
  });
  /* --------- Burger Icon End --------- */

  $('body').on('click', 'a.anchor-link', function (e) {
    $(".active").removeClass("active");
    $(this).addClass("active");
    var targetSelector = this.hash;
    e.preventDefault();
    var $target = $(targetSelector);
    $('html, body').animate({
      scrollTop: $target.offset().top - 60
    }, {
      duration: 1000,
      step: function step(now, fx) {
        var newOffset = $target.offset().top - 60;
        if (fx.end !== newOffset) fx.end = newOffset;
      }
    });
  });
  /* Send form */

  if ($('.ajax-form').length) {
    $('.ajax-form').each(function () {
      $(this).validate({
        rules: {
          terms: "required"
        },
        errorLabelContainer: ".form-errors",
        errorElement: "li",
        submitHandler: function submitHandler(form) {
          $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(form).serialize(),
            success: function success() {
              $('.form-success').addClass('active').text('Спасибо, Ваше письмо отправлено!');
            },
            error: function error() {}
          });
        }
      });
    });
  }

  function mobileFriendly() {
    setTimeout(function () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        var ww = document.documentElement.clientWidth < window.screen.width ? jQuery(window).width() : window.screen.width; //get proper width

        var mw = 480; //alert ("width" + ww);

        var ratio = ww / mw; //calculate ratio
        //alert ("ratio: " + ratio);

        if (ratio < 1) {
          //smaller than minimum size
          jQuery("meta[name='viewport']").attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + mw);
        } else {
          //regular size
          jQuery("meta[name='viewport']").attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
        }
      }
    }, 600);
  }

  jQuery(document).ready(function () {
    mobileFriendly();
  });
  window.addEventListener("orientationchange", mobileFriendly, false);
});
//# sourceMappingURL=main.js.map
