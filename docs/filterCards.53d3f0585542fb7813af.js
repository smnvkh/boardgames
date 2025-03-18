/******/ (() => { // webpackBootstrap
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
console.clear();
document.addEventListener('DOMContentLoaded', function () {
  initFilter();
  initMultiselect();
});
function initMultiselect() {
  var label = document.querySelector('.C_Chips');
  var select = document.querySelector('.M_SelectField');
  var text = label.innerHTML;
  select.addEventListener('change', function () {
    var selectedOptions = this.selectedOptions;
    label.innerHTML = '';
    var _iterator = _createForOfIteratorHelper(selectedOptions),
      _step;
    try {
      var _loop = function _loop() {
        var option = _step.value;
        var chip = document.createElement('button');
        chip.classList.add('A_Chip');
        chip.type = 'button';
        chip.textContent = option.value;
        label.appendChild(chip);
        chip.addEventListener('click', function () {
          option.selected = false;
          chip.remove();
          if (!select.selectedOptions.length) {
            label.innerHTML = text;
          }
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
}
function initFilter() {
  var tags = document.querySelectorAll('.A_FilterTag');
  var tagAll = document.querySelector('.all');
  tags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      if (tag != tagAll) {
        tagAll.classList.remove('active');
        tag.classList.toggle('active');
        console.log('здесь будет функция фильтрации по тегу');
        filterByTag();
      }
      var activeTags = document.querySelectorAll('.active');
      if (tag == tagAll && !tag.classList.contains('active')) {
        activeTags.forEach(function (tag) {
          tag.classList.remove('active');
        });
        tag.classList.add('active');
        console.log('здесь будет функция вывода всех карточек');
        filterAll();
      }
      if (tags.length - 1 == activeTags.length || activeTags.length == 0) {
        activeTags.forEach(function (tag) {
          tag.classList.remove('active');
        });
        tagAll.classList.add('active');
        console.log('здесь будет функция вывода всех карточек');
        filterAll();
      }
    });
  });
}
function filterByTag() {
  var cards = document.querySelectorAll('.O_ArticleCard');
  var activeTags = document.querySelectorAll('.active');
  var tagList = [];
  var count;
  cards.forEach(function (card) {
    card.style.display = 'none';
  });
  activeTags.forEach(function (tag) {
    var classList = tag.className.split(' ');
    classList = classList.sort();
    count = 1;
    if (classList[1] == 'active') {
      count++;
    }
    for (var i = count; i < classList.length; i++) {
      tagList.push(classList[i]);
    }
  });
  tagList.forEach(function (tagName) {
    cards.forEach(function (card) {
      if (card.classList.contains(tagName)) {
        card.style.display = 'block';
      }
    });
  });
}
function filterAll() {
  var cards = document.querySelectorAll('.O_ArticleCard');
  var activeTags = document.querySelectorAll('.active');
  activeTags.forEach(function (tag) {
    if (tag.classList.contains('all')) {
      cards.forEach(function (card) {
        card.style.display = 'block';
      });
    }
  });
}
/******/ })()
;