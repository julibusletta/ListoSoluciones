(function ($) {
  "use strict";

  // SLIDER DE OBRAS
  function iniciarSliders() {
    $('.gallery-slider').each(function () {
      const slider = $(this);
      const track = slider.find('.slider-track');
      const slides = track.find('img');
      let currentIndex = 0;
      let interval;

      function startSlider() {
        interval = setInterval(function () {
          currentIndex = (currentIndex + 1) % slides.length;
          const offset = -currentIndex * 100;
          track.css('transform', 'translateX(' + offset + '%)');
        }, 3500); // 3.5 segundos por slide
      }

      function stopSlider() {
        clearInterval(interval);
      }

      if (slides.length > 1) {
        startSlider();
        slider.hover(stopSlider, startSlider);
      }
    });
  }

  // COUNTER NUMBERS
  jQuery('.counter-thumb').appear(function () {
    jQuery('.counter-number').countTo();
  });

  // FUNCION GENERAL DE SCROLL
  function scrollToDiv(element, navheight) {
    if (element.length) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  }

  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;
  });

  // FORMULARIO AJAX
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();

    const form = $(this);
    const formData = form.serialize();

    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: formData,
      success: function (response) {
        if (response.trim() === 'success') {
          form.trigger("reset");
          $('#successModal').fadeIn();
        } else {
          $('#form-response').html('<div style="color: red; font-weight: bold;">Hubo un error al enviar el formulario. Intente nuevamente.</div>');
        }
      },
      error: function () {
        $('#form-response').html('<div style="color: red; font-weight: bold;">Error al conectar con el servidor.</div>');
      }
    });
  });

  // Botón de cerrar modal
  window.closeModal = function () {
    $('#successModal').fadeOut();
  };

  // Cerrar clickeando fuera del modal
  $('#successModal').on('click', function (e) {
    if (e.target === this) {
      $(this).fadeOut();
    }
  });

  // Iniciar sliders después de que todo cargue
  $(window).on('load', function () {
    iniciarSliders();
  });

})(jQuery);