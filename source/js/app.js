/*Меню на мобильнике*/
// <nav class="main-nav  main-nav--closed main-nav--nojs">
var navMenu = document.querySelector(".main-nav");
// Кнопка
var navToggle = document.querySelector(".btn-menu");

// наше меню.Добавляет калссылибо убирает их.Убираемменю,
// котрое открыто
navMenu.classList.remove("main-nav--nojs");
// Наша кнопка. Добавляем эвент(в нашем случае клик по баттону)
// с функцией, где если меню содержит  классы main-nav--closed,
// то убираем closed и работаем с opened в противном случае закрываем.
navToggle.addEventListener("click", function() {
  // if ( navMenu.classList.contains("main-nav--closed") ) {
  //   navMenu.classList.remove("main-nav--closed");
  //   navMenu.classList.add("main-nav--opened");
  // } else {
  //   navMenu.classList.add("main-nav--closed");
  //   navMenu.classList.remove("main-nav--opened");
  // }
  navMenu.classList.toggle("main-nav--closed");
  navMenu.classList.toggle("main-nav--opened");
});

(function() {

  "use strict";

  var toggles = document.querySelectorAll(".btn-menu");

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }

})();
