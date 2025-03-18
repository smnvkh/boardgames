/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
// импорт scss / css файла

console.clear();
document.addEventListener('DOMContentLoaded', function () {
  searchElem();
  randomWord();
  styleOnClick();
});

// как вытаскивать элементы и весить на них клик
function searchElem() {
  var headerTag = document.querySelector('h1');
  var headerClass = document.querySelector('.header');
  var headerID = document.querySelector('#header');
  var headers = document.querySelectorAll('h1');
  console.log(headerTag);
  console.log(headerClass);
  console.log(headerID);
  console.log(headers);
  headers.forEach(function (header) {
    header.addEventListener('click', function () {
      header.innerHTML = '<span>Клик</span>';
    });
  });
}

// как создать массив слов и по клику показывать рандомное
function randomWord() {
  var words = ['весёлый', 'грустный', 'красивый', 'диван', 'кошка', 'малышик', 'буба', '4', 'кроссовок New Balance', 'спать', 'не спать'];
  var span = document.querySelector('.random span');
  var button = document.querySelector('.random button');
  button.addEventListener('click', function () {
    var index = Math.floor(words.length * Math.random());
    span.innerHTML = words[index];
  });
}

// счетчик для теста
function styleOnClick() {
  var circle = document.querySelector('.style div');
  var button = document.querySelector('.style button');
  var counter = 0;

  // навешиваем новый класс, в тоггл указываем класс БЕЗ ТОЧКИ
  button.addEventListener('click', function () {
    // ++ добавляет 1, если нужно больше, то можно через +=
    counter++;
    console.log(counter);

    // if (counter == 10) {
    //   circle.classList.toggle('coral')
    // }

    if (counter % 10 == 0) {
      circle.classList.toggle('coral');
    } else {
      circle.classList.remove('coral');
    }
  });
}
/******/ })()
;