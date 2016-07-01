$( document ).ready(function() {
  
  $('.xbtn, .closproj').click(function() {
      $('.featProjWrap').fadeOut();
      $('.project-con').removeClass('vis');
      $('body').removeClass("modalOpen");
      return false;

  });

//   $('#projList li').click(function() {
//       $('.featProjWrap').fadeIn();
//       $('body').addClass("modalOpen");
//       return false;
//   });

   $('#projList li').click(function() {

        var index = $('#projList li').index(this) + 1;
        $('.featProjWrap').fadeIn();
        $('.featProjWrap').children('.project-con:nth-of-type(' + index  + ')').addClass("vis");
      $('body').addClass("modalOpen");
      return false;
  });


});



