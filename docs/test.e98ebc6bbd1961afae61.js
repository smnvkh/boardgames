/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/

;// CONCATENATED MODULE: ./src/images/tests/test1.png
const test1_namespaceObject = __webpack_require__.p + "images/3dce8e5d4050a4fd780a.png";
;// CONCATENATED MODULE: ./src/tests/showTests.js
var checkboxes = document.querySelectorAll('input[type=checkbox]');
var answers = document.querySelectorAll('.A_AnswerText');
var resultCount = 0;

// используем переменную let, потому что считаем
var currentStage = 0;
function initTest(stages) {
  var numberOfQuestion = document.querySelector('.A_NumberOfQuestion');
  var question = document.querySelector('.A_Question');

  // используем обратные кавычки, потому что подтягиваем инфу из других переменных
  // + прибегаем к синтаксису для обратных кавычек, чтобы вызвать переменную — ${}
  // ${stages.length}` — считает, сколько всего вопросов в массиве, чтобы записать в формате 1/5
  numberOfQuestion.innerHTML = "\u0432\u043E\u043F\u0440\u043E\u0441 \u2116".concat(currentStage + 1, "/").concat(stages.length);
  question.innerHTML = stages[currentStage].question;

  // создаем счетчик, который будет работать до тех пор, пока не закончатся наши ответы
  // запускаем цикл до тех пор, пока счетчик меньше длины массива answers (пока не закончатся тэги, которые лежат внутри списка с ответами)
  for (var i = 0; i < answers.length; i++) {
    answers[i].innerHTML = stages[currentStage].answers[i].text;
    answers[i].dataset.count = stages[currentStage].answers[i].count;
  }
  //   for (let i = 0; i < checkboxes.length; i++) {
  //     checkboxes[i].dataset.count = stages[currentStage].answers[i].count
  //   }
}
function chooseAnswer(stages, results) {
  answers.forEach(function (answer) {
    answer.addEventListener('click', function () {
      resultCount += Number(answer.dataset.count);
      setTimeout(function () {
        updateStage(stages, results);
      }, 500);
    });
  });
}

// function chooseAnswer(stages, results) {
//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener('change', () => {
//       resultCount += Number(checkbox.dataset.count)

//       setTimeout(() => {
//         updateStage(stages, results)
//         checkbox.checked = false
//       }, 500)
//     })
//   })
// }

function updateStage(stages, results) {
  if (currentStage + 1 < stages.length) {
    currentStage++;
    initTest(stages);
  } else {
    showResult(stages, results);
  }
}

// находим тест хэдэр и стираем его из нашего кода, когда мы дойдем до конца (тест целиком сотрется и останется пустая страница, чтобы вывести результаты)
function showResult(stages, results) {
  document.querySelector('.O_TestHeader').remove();
  var block = document.querySelector('.O_TestBlock');
  block.innerHTML = '';
  block.classList.add('result');
  var preview = document.createElement('h2');
  var resultCnt = document.createElement('p');
  var resultText = document.createElement('p');
  var img = document.createElement('img');
  preview.classList.add('A_Preview');
  resultCnt.classList.add('A_ResultCount');
  resultText.classList.add('A_ResultText');
  img.classList.add('A_ResultIMG');
  block.appendChild(resultCnt);
  block.appendChild(preview);
  block.appendChild(resultText);
  block.appendChild(img);
  resultCnt.innerHTML = "\u0411\u0430\u043B\u043B\u043E\u0432: ".concat(resultCount);
  img.src = results[3].image;
  if (resultCount >= 4) {
    preview.innerHTML = results[0].preview;
    resultText.innerHTML = results[0].text;
  } else if (resultCount <= 1) {
    preview.innerHTML = results[2].preview;
    resultText.innerHTML = results[2].text;
  } else {
    preview.innerHTML = results[1].preview;
    resultText.innerHTML = results[1].text;
  }
}

;// CONCATENATED MODULE: ./src/tests/test1.js




// база данных: список вопросов и ответов
var stages = [
// этап 1
{
  //вопрос 1
  question: 'Начнем с простого. Что можно делать с дайсами?',
  // ответы на вопрос 1
  answers: [{
    text: 'кидать',
    count: 1 // правильные ответы обозначены 1, неправильные — 0
  }, {
    text: 'курить',
    count: 0
  }, {
    text: 'коптить',
    count: 0
  }, {
    text: 'колоть',
    count: 0
  }]
},
// этап 2
{
  //вопрос 2
  question: 'Что такое казуалка?',
  // ответы на вопрос 2
  answers: [{
    text: 'игра для предпочитающих casual стиль',
    count: 0
  }, {
    text: 'простая настолка для новичков, правила которой легко объяснить',
    count: 1
  }, {
    text: 'настолка для уверенных игроков, готовых долго изучать правила',
    count: 0
  }, {
    text: 'настолка, написанная любителями на коленке',
    count: 0
  }]
},
// этап 3
{
  //вопрос 3
  question: 'С казуалками разобрались. А что такое америтреш?',
  // ответы на вопрос 3
  answers: [{
    text: 'американский треш прямиком из Америки',
    count: 0
  }, {
    text: 'яркие красочные настолки с кучей моделек, счётчиков, фигурок, монеток и тд.',
    count: 1
  }, {
    text: 'настолка, где детальки собираются только из переработанного мусора',
    count: 0
  }, {
    text: 'настолка, где важна та или иная форма игровой конфронтации: сражения, войны, соревнования',
    count: 1
  }]
},
// этап 4
{
  //вопрос 4
  question: 'Знакомы ли вы с евро/еврогейм',
  // ответы на вопрос 4
  answers: [{
    text: 'таким не увлекаемся',
    count: 0
  }, {
    text: 'люблю сосредоточиться на стратегии, а не верить в рандом и удачу',
    count: 1
  }, {
    text: 'всегда за настолки с экономическим уклоном',
    count: 1
  }, {
    text: 'то и делаем, что копим евро',
    count: 0
  }]
},
// этап 5
{
  //вопрос 5
  question: 'Последний вопрос! Играли в филлеры?',
  // ответы на вопрос 5
  answers: [{
    text: 'конечно, в перерыве на обед',
    count: 1
  }, {
    text: 'знаю только те филлеры, что косметологи вкалывают',
    count: 0
  }, {
    text: 'для этого придётся весть день выделить',
    count: 0
  }, {
    text: 'разве что на разогрев',
    count: 1
  }]
}];
var results = [{
  preview: 'Ого, да вы знаток!',
  text: 'Сколько десятков настолок вы уже сыграли?'
}, {
  preview: 'Сразу видно любителя по посидеть в компании за настолками',
  text: 'Вы уже не новичок, но еще есть, что поизучать'
}, {
  preview: 'Кажется, вы только недавно узнали о настольных играх',
  text: 'Впереди вас ждет еще много открытий!'
}, {
  image: "".concat(test1_namespaceObject)
}];
document.addEventListener('DOMContentLoaded', function () {
  console.clear;
  initTest(stages);
  chooseAnswer(stages, results);
});
/******/ })()
;