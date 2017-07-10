var jquery = require('jquery');

module.exports = (function($) {

  $(window).on('load', function() {

    $('.loader-side').fadeOut(300);
    $('.loader').fadeOut(500);
    $(document.body).css('overflow', 'visible');

  });

})(jquery);
