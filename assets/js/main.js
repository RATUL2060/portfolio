(function ($) {

  const $window = $(window);
  const $body = $('body');
  const $nav = $('#nav');
  const $navLinks = $nav.find('a');

  /* Breakpoints */
  breakpoints({
    wide: ['961px', '1880px'],
    normal: ['961px', '1620px'],
    narrow: ['961px', '1320px'],
    narrower: ['737px', '960px'],
    mobile: [null, '736px']
  });

  /* Page load animation */
  $window.on('load', function () {
    setTimeout(() => {
      $body.removeClass('is-preload');
    }, 100);
  });

  /* Accessibility: reduce motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $.fn.scrolly = function () { return this; };
  }

  /* Navigation */
  $navLinks
    .addClass('scrolly')
    .on('click', function (e) {

      const $this = $(this);

      if ($this.attr('href').charAt(0) !== '#')
        return;

      e.preventDefault();

      $navLinks.removeClass('active active-locked');
      $this.addClass('active active-locked');

    })
    .on('keydown', function (e) {
      if (e.key === 'Enter') {
        $(this).trigger('click');
      }
    })
    .each(function () {

      const $this = $(this);
      const id = $this.attr('href');
      const $section = $(id);

      if (!$section.length)
        return;

      $section.scrollex({
        mode: 'middle',
        top: '-10vh',
        bottom: '-10vh',

        initialize: function () {
          $section.addClass('inactive');
        },

        enter: function () {
          setTimeout(() => {
            $section.removeClass('inactive');
          }, 100);

          if (!$navLinks.filter('.active-locked').length) {
            $navLinks.removeClass('active');
            $this.addClass('active');
          } else if ($this.hasClass('active-locked')) {
            $this.removeClass('active-locked');
          }
        }
      });

    });

  /* Scrolly */
  $('.scrolly').scrolly();

  /* Header toggle (mobile) */
  $('<div id="headerToggle"><a href="#header" class="toggle"></a></div>')
    .appendTo($body);

  $('#header').panel({
    delay: 500,
    hideOnClick: true,
    hideOnSwipe: true,
    resetScroll: true,
    resetForms: true,
    side: 'left',
    target: $body,
    visibleClass: 'header-visible'
  });

  
})(jQuery);
