    $(window).scroll(function() {
      if($(window).scrollTop() >= 550) {  
        $('nav').fadeIn('fast');
      }else{
        $('nav').fadeOut('fast');
      }
    });