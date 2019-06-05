window.onload = function() {
  hidePageLoader();
  handleTopMenu();
}
function hidePageLoader() {
  var loader = document.getElementById('loading');
  loader.style.display = 'none';
}
function handleTopMenu() {
  var btnParent = document.getElementById("header");
  var btns = btnParent.getElementsByClassName("nav-item");

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var currentActive = document.getElementsByClassName('active');
      currentActive[0].classList.remove('active');

      this.className += " active";
    });
  }
}