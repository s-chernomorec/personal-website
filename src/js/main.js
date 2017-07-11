var jquery = require('jquery');
var projectSlider = require('./slider.js')


module.exports = (function($) {

  $(document).ready(function() {

    var pageHeight = window.innerHeight || document.documentElement.clientHeight,
      pageWidth = window.innerWidth || document.documentElement.clientWidth,
      colours = {
        cyan: '#3fe6ff',
        cerise: '#ee587b',
        white: '#ffffff',
        black: '#000000',
      },
      scrollTime = 400,
      projectBackgroundRatio = 1080 / 1920,
      sliderDuration = 1000,
      sliderSpacing = pageWidth,
      pathArray = ['https://space-js.herokuapp.com/', 'http://excerpts.herokuapp.com/'];

    imgArray = ['img/space.png', 'img/excerpts.png'];

    $('body, html').scrollTop(0);
    $('.page').css("height", pageHeight + "px");


    //  hamburger menu toggling
    $('.hamburger').on('click', function() {
      $('.hamburger-toggle').fadeToggle(100, function() {
        if ($(this).css('display') !== 'none') {
          $('.fixed-menu').css('background-color', colours.white);
          $('.hamburger > div').css('background-color', colours.black);
          $('h1.name').css('color', colours.black);
          $('h1.name').html('Web<br>Developer');
        } else {
          $('.fixed-menu').css('background-color', '');
          $('.hamburger > div').css('background-color', '');
          $('h1.name').css('color', '');
          $('h1.name').html('Sergey<br>Chernomorets');
        }

      });
    });


    //  links animation
    function scroll(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      $("body, html").animate({
        scrollTop: e.data.scrollTop
      }, scrollTime);
    }

    $('.menu-desktop')
      .on('click', '.menu-desktop-projects a', {
        scrollTop: pageHeight
      }, scroll)
      .on('click', '.menu-desktop-skills a', {
        scrollTop: pageHeight * 2
      }, scroll);

    $('.hamburger-toggle .menu-list')
      .on('click', '.projects-link', {
        scrollTop: pageHeight
      }, scroll)
      .on('click', '.skills-link', {
        scrollTop: pageHeight * 2
      }, scroll);

    $('.top-button')
      .on('click', '.link-to-top', {
        scrollTop: 0
      }, scroll);


    //  fixed menu
    $(document).on('scroll', function(e) {
      if ($(this).scrollTop() !== 0) {
        $('.fixed-menu').removeClass('no-fixed');
      } else {
        $('.fixed-menu').addClass('no-fixed');
      }
    });


    //  slider navigation
    function projectsNavigationHandler(e) {
      $(this).css({
        "background-color": e.data.bgcolor,
        "color": e.data.color
      });
    }

    $('.project-navigation')
      .on('mouseover', '.project-prev', {
        bgcolor: "#3fe6ff",
        color: "#fff"
      }, projectsNavigationHandler)
      .on('mouseout', '.project-prev', {
        bgcolor: "",
        color: ""
      }, projectsNavigationHandler)
      .on('mouseover', '.project-next', {
        bgcolor: "#ee587b",
        color: "#fff"
      }, projectsNavigationHandler)
      .on('mouseout', '.project-next', {
        bgcolor: "",
        color: ""
      }, projectsNavigationHandler);


    //  skills mouseover animation
    var prevTextClosure = '';

    function showLevel(e) {
      if (e.data.text) {
        prevTextClosure = $(this).text();
        $(this).text(e.data.text);
        $(this).css({
          'background-color': '#fff',
          'color': '#000'
        });
      } else {
        $(this).text(prevTextClosure);
        $(this).css({
          'background-color': '',
          'color': ''
        });
      }
    }

    $('.skills-content')
      .on('mouseover', '.elementary', {
        text: 'elementary'
      }, showLevel)
      .on('mouseover', '.moderate', {
        text: 'moderate'
      }, showLevel)
      .on('mouseover', '.advanced', {
        text: 'advanced'
      }, showLevel)
      .on('mouseout', '.elementary, .moderate, .advanced', {}, showLevel);




    //  slider
    $('.project-content').height($('.project-content').width() * projectBackgroundRatio);
    projectSlider('.project-content', '.projects-page', '.project-prev', '.project-next', sliderSpacing, sliderDuration, pathArray, imgArray, true);

  });
})(jquery);
