/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $('body'),
    $main = $('#main');

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: ['361px', '480px'],
    xxsmall: [null, '360px'],
  });

  // Play initial animations on page load.
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Nav.
  var $nav = $('#nav');

  if ($nav.length > 0) {
    // Shrink effect.
    $main.scrollex({
      mode: 'top',
      enter: function () {
        $nav.addClass('alt');
      },
      leave: function () {
        $nav.removeClass('alt');
      },
    });

    // Links.
    var $nav_a = $nav.find('a');

    $nav_a
      .scrolly({
        speed: 1000,
        offset: function () {
          return $nav.height();
        },
      })
      .on('click', function () {
        var $this = $(this);

        // External link? Bail.
        if ($this.attr('href').charAt(0) != '#') return;

        // Deactivate all links.
        $nav_a.removeClass('active').removeClass('active-locked');

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this.addClass('active').addClass('active-locked');
      })
      .each(function () {
        var $this = $(this),
          id = $this.attr('href'),
          $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1) return;

        // Scrollex.
        $section.scrollex({
          mode: 'middle',
          initialize: function () {
            // Deactivate section.
            if (browser.canUse('transition')) $section.addClass('inactive');
          },
          enter: function () {
            // Activate section.
            $section.removeClass('inactive');

            // No locked links? Deactivate all links and activate this section's one.
            if ($nav_a.filter('.active-locked').length == 0) {
              $nav_a.removeClass('active');
              $this.addClass('active');
            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass('active-locked'))
              $this.removeClass('active-locked');
          },
        });
      });
  }

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1000,
  });
})(jQuery);

// Enable smooth scrolling on all links inside the navbar and throughout the site
$(document).ready(() => {
  $('a').on('click', (event) => {
    if (this.hash !== '') {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        () => {
          window.location.hash = hash;
        }
      );
    }
  });
});

// create an event listener for all links
$('a').on('click', function (event) {
  // prevent the default action of the link
  event.preventDefault();
  // get the href attribute of the link
  const href = $(this).attr('href');
  // open the link in a new tab
  window.open(href, '_blank');
});

// create an event listener for all buttons with the class 'button'
$('.button').on('click', function (event) {
  // prevent the default action of the button
  event.preventDefault();
  // get the href attribute of the button
  const href = $(this).attr('formaction');
  // open the link in a new tab
  window.open(href, '_blank');
});
