//Functions
//Close project
function closeProj() {
  $('.featProjWrap').fadeOut();
  $('.project-con').removeClass('vis');
  $('body').removeClass("modalOpen");
  return false;
}
//Use github api to get latest tag dynamically
function latestTag() {
  var gitHubPath = 'LPII/LanceGD.com';
  var url = 'https://api.github.com/repos/' + gitHubPath + '/tags';

  $.get(url).done(function (data) {
    var versions = data.sort(function (v1, v2) {
      return semver.compare(v2.name, v1.name)
    });
    $('.tag-result').html(versions[0].name);
  });
}



$(document).ready(function () {
  //close project with close btns
  $('.xbtn, .closproj').click(function () {
    closeProj();
  });
  //click anyting to close project 
  $(document).on('click', function (e) {
    closeProj();
  });
  //clicking proj itself wont close proj
  $('.featProjWrap .project-con .container').on('click', function (e) {
    e.stopPropagation();
  });
  //open correct project
  $('#projList li').click(function () {
    var index = $('#projList li').index(this) + 1;
    $('.featProjWrap').fadeIn();
    $('.featProjWrap').children('.project-con:nth-of-type(' + index + ')').addClass("vis");
    $('body').addClass("modalOpen");
    return false;
  });
  //Latest tag
  latestTag();
});