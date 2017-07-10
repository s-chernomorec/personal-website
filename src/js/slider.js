var jquery = require('jquery');


module.exports = (function($){
  return function slider(parent, overflowedElement, prev, next, imgSpacing, animationDuration, pathArray, imgArray, addPlaceholder) {

    var $parentEl = $(parent),
        parentElWidth,
        parentElHeight,
        distanceToNextImg,
        navigationSelector = prev + ', ' + next;

    //  variables for slide and setProjectsHeader functions only
    var activeSlide = 1,
        $projectsCountBlock = $('.project-number div'),
        $projectsNameBlock = $('.project-name'),
        numberOfProjects

    $(overflowedElement).css('overflow-x', 'hidden');

    $parentEl.css({
      'position': 'relative',
      'width': '100%'
    });

    parentElWidth = $parentEl.css('width');
    parentElHeight = $parentEl.css('height');
    distanceToNextImg = parseInt(parentElWidth) + imgSpacing;

    pathArray.forEach(function(item, i) {
      var $link = $('<a>', {
            href: item,
            'class': 'project-link'
          }),
          $img = $('<img>', {
            src: imgArray[i],
            alt: 'project',
            'class': 'project-image'
          });

      $link.css({
        'display': 'block',
        'position': 'absolute',
        'left': (distanceToNextImg * i) + 'px',
        'width': $parentEl.css('width'),
        'height': '100%'
      });

      $img.css({
        'width': '100%',
        'height': '100%'
      });

      $link.append($img);
      $link.appendTo($parentEl);
    });

    if (addPlaceholder) {
      var $projectPlaceholder = $('<div>', {
            'class': 'project-placeholder'
          });

      $projectPlaceholder.css({
        'position': 'absolute',
        'left': (distanceToNextImg * pathArray.length) + 'px',
        'width': '100%',
        'height': '100%'
      });

      $projectPlaceholder.html('<span style="margin-top: ' + (parseInt(parentElHeight) / 2 - 10) + 'px">More projects yet to come</span>');
      $projectPlaceholder.appendTo($parentEl);

      pathArray.push($projectPlaceholder);
    }



    numberOfProjects = pathArray.length - addPlaceholder;

    function setProjectsHeader() {
      if (addPlaceholder && activeSlide === pathArray.length) {
        $projectsCountBlock.text('*');
        $projectsNameBlock.text('*');
      } else {
        var projectName = imgArray[activeSlide - 1].slice(imgArray[activeSlide - 1].lastIndexOf('/') + 1, imgArray[activeSlide - 1].lastIndexOf('.'));
        $projectsCountBlock.text(activeSlide + '/' + numberOfProjects);
        $projectsNameBlock.text(projectName);
      }
    }

    setProjectsHeader();

    function slide(e) {
      e.preventDefault();

      var $imgList = $(parent + ' a, .project-placeholder'),
          step;

      if ($(this).hasClass(prev.slice(1))) {
        activeSlide = activeSlide === 1 ? pathArray.length : activeSlide - 1;
        step = distanceToNextImg;

        moveLastSlide(step).promise().done(function(){
          moveSlides(step);
        });
      }

      if ($(this).hasClass(next.slice(1))) {
        activeSlide = activeSlide === pathArray.length ? 1 : activeSlide + 1;
        step = -distanceToNextImg;

        moveSlides(step).promise().done(function(){
          moveFirstSlide(step);
        });
      }

      setProjectsHeader();


      function moveSlides(step) {
        return $imgList.animate({'left': '+=' + step}, animationDuration);
      }

      function moveFirstSlide(step) {
        return $imgList.first()
          .css('left', '-=' + ($imgList.length) * step)
          .appendTo($(parent));
      }

      function moveLastSlide(step) {
        return $imgList.last()
          .css('left', '-=' + ($imgList.length) * step)
          .prependTo($(parent));
      }



      $(navigationSelector).off( "click", slide );
      setTimeout(function() {
        $(navigationSelector).on('click', slide);
      }, animationDuration + 300);

    }

    $('.project-link')
      .on('mouseover', function(){  $(this).addClass('project-image-active');  })
      .on('mouseout', function(){  $(this).removeClass('project-image-active');  })

    $(navigationSelector).on('click', slide);



  }
})(jquery);
