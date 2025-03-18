const checkboxes = document.querySelectorAll('input[type=checkbox]')
const answers = document.querySelectorAll('.A_AnswerText')
let resultCount = 0

// используем переменную let, потому что считаем
let currentStage = 0

function initTest(stages) {
  const numberOfQuestion = document.querySelector('.A_NumberOfQuestion')
  const question = document.querySelector('.A_Question')

  // используем обратные кавычки, потому что подтягиваем инфу из других переменных
  // + прибегаем к синтаксису для обратных кавычек, чтобы вызвать переменную — ${}
  // ${stages.length}` — считает, сколько всего вопросов в массиве, чтобы записать в формате 1/5
  numberOfQuestion.innerHTML = `вопрос №${currentStage + 1}/${stages.length}`
  question.innerHTML = stages[currentStage].question

  // создаем счетчик, который будет работать до тех пор, пока не закончатся наши ответы
  // запускаем цикл до тех пор, пока счетчик меньше длины массива answers (пока не закончатся тэги, которые лежат внутри списка с ответами)
  for (let i = 0; i < answers.length; i++) {
    answers[i].innerHTML = stages[currentStage].answers[i].text
    answers[i].dataset.count = stages[currentStage].answers[i].count
  }
  //   for (let i = 0; i < checkboxes.length; i++) {
  //     checkboxes[i].dataset.count = stages[currentStage].answers[i].count
  //   }
}

function chooseAnswer(stages, results) {
  answers.forEach((answer) => {
    answer.addEventListener('click', () => {
      resultCount += Number(answer.dataset.count)

      setTimeout(() => {
        updateStage(stages, results)
      }, 500)
    })
  })
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
    currentStage++
    initTest(stages)
  } else {
    showResult(stages, results)
  }
}

// находим тест хэдэр и стираем его из нашего кода, когда мы дойдем до конца (тест целиком сотрется и останется пустая страница, чтобы вывести результаты)
function showResult(stages, results) {
  document.querySelector('.O_TestHeader').remove()

  const block = document.querySelector('.O_TestBlock')
  block.innerHTML = ''
  block.classList.add('result')

  const preview = document.createElement('h2')
  const resultCnt = document.createElement('p')
  const resultText = document.createElement('p')
  const img = document.createElement('img')

  preview.classList.add('A_Preview')
  resultCnt.classList.add('A_ResultCount')
  resultText.classList.add('A_ResultText')
  img.classList.add('A_ResultIMG')

  block.appendChild(resultCnt)
  block.appendChild(preview)
  block.appendChild(resultText)
  block.appendChild(img)

  resultCnt.innerHTML = `Баллов: ${resultCount}`
  img.src = results[3].image

  if (resultCount >= 4) {
    preview.innerHTML = results[0].preview
    resultText.innerHTML = results[0].text
  } else if (resultCount <= 1) {
    preview.innerHTML = results[2].preview
    resultText.innerHTML = results[2].text
  } else {
    preview.innerHTML = results[1].preview
    resultText.innerHTML = results[1].text
  }
}

export { initTest, chooseAnswer }
