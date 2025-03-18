// импорт scss / css файла
import './jsBasic.scss'

console.clear()

document.addEventListener('DOMContentLoaded', () => {
  searchElem()
  randomWord()
  styleOnClick()
})

// как вытаскивать элементы и весить на них клик
function searchElem() {
  const headerTag = document.querySelector('h1')
  const headerClass = document.querySelector('.header')
  const headerID = document.querySelector('#header')
  const headers = document.querySelectorAll('h1')

  console.log(headerTag)
  console.log(headerClass)
  console.log(headerID)
  console.log(headers)

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      header.innerHTML = '<span>Клик</span>'
    })
  })
}

// как создать массив слов и по клику показывать рандомное
function randomWord() {
  const words = [
    'весёлый',
    'грустный',
    'красивый',
    'диван',
    'кошка',
    'малышик',
    'буба',
    '4',
    'кроссовок New Balance',
    'спать',
    'не спать'
  ]

  const span = document.querySelector('.random span')
  const button = document.querySelector('.random button')

  button.addEventListener('click', () => {
    let index = Math.floor(words.length * Math.random())
    span.innerHTML = words[index]
  })
}

// счетчик для теста
function styleOnClick() {
  const circle = document.querySelector('.style div')
  const button = document.querySelector('.style button')
  let counter = 0

  // навешиваем новый класс, в тоггл указываем класс БЕЗ ТОЧКИ
  button.addEventListener('click', () => {
    // ++ добавляет 1, если нужно больше, то можно через +=
    counter++
    console.log(counter)

    // if (counter == 10) {
    //   circle.classList.toggle('coral')
    // }

    if (counter % 10 == 0) {
      circle.classList.toggle('coral')
    } else {
      circle.classList.remove('coral')
    }
  })
}
