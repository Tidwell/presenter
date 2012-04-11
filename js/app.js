$(document).ready(function() {
  var i = 0;
  $('.slide').each(function(){$(this).addClass('s'+(++i));});
  var numSlides = $('.slide').length;
  var curSlide = 1;
  var preventAdvance = false;
    
  var goForward = function() {
    if ($('.s'+curSlide+' .animStep').not('.animDone').length > 0) {
      var nxtEl = $($('.s'+curSlide+' .animStep').not('.animDone')[0]);
      if (nxtEl.hasClass('strike')) {
        nxtEl.addClass('animDone');
      }
      else {
        nxtEl.fadeIn().addClass('animDone');
      }
      return;
    }
    if (curSlide === numSlides) {
      //go to the beginning
      window.location.hash = 1;
      return;
    }
    //otherwise we advance
    window.location.hash = curSlide+1;
  }
  
  var goBack = function() {
    if (curSlide === 1) {
      //go to the end
      window.location.hash = numSlides;
      return;
    }
    //otherwise we go down
    window.location.hash = curSlide-1;
  }
  
  var showSlide = function(slide) {
    preventAdvance = true;
    $('.slide.s'+curSlide).fadeOut(function() {
      $('.slide.s'+slide).fadeIn(function() {
        preventAdvance = false;
      });
    })
    curSlide = slide;
    $('.slide.s'+curSlide+" .animDone").each(function() {
      $(this).removeClass('animDone')
      if (!$(this).hasClass('strike')) {
        $(this).hide();
      }
    });
  }
  
  //for navigation with the keyboard
  $(document).keydown(function(e){
    if (preventAdvance) return;
    switch(e.keyCode) {
      case 39:
      case 38:
      case 32:
        goForward();
        break;
      case 37:
      case 40:
        goBack();
        break;
    }
  })
  
  $(window).hashchange( function(){
    var hash = Number(location.hash.replace('#',''));
    if (!hash) {hash = 1}

    showSlide(hash)
  })
  
  $(window).hashchange();
  

  var list = $('.slide_list');
  $('.slide').each(function(i) {
    var txt = $(this).find('h2').text();
    if (txt.length == 0) {txt=null}
    list.append('<li rel="'+(i+1)+'">'+(txt || '-slide-')+'</li>');
  })
  list.on('click', 'li', function(e) {
    window.location.hash = $(e.target).attr('rel');
    list.hide();
    e.stopPropagation();
  })
  $(window).click(function() {list.hide()})
  $('button').click(function(e){list.toggle();e.stopPropagation();})
});