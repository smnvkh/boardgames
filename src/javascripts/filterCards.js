console.clear()
document.addEventListener('DOMContentLoaded', () => {
  initFilter()
  initMultiselect()
})

function initMultiselect() {
  const label = document.querySelector('.C_Chips')
  const select = document.querySelector('.M_SelectField')
  const text = label.innerHTML

  select.addEventListener('change', function () {
    let selectedOptions = this.selectedOptions
    label.innerHTML = ''

    for (let option of selectedOptions) {
      let chip = document.createElement('button')
      chip.classList.add('A_Chip')
      chip.type = 'button'
      chip.textContent = option.value

      label.appendChild(chip)

      chip.addEventListener('click', () => {
        option.selected = false
        chip.remove()

        if (!select.selectedOptions.length) {
          label.innerHTML = text
        }
      })
    }
  })
}

function initFilter() {
  const tags = document.querySelectorAll('.A_FilterTag')
  const tagAll = document.querySelector('.all')

  tags.forEach((tag) => {
    tag.addEventListener('click', () => {
      if (tag != tagAll) {
        tagAll.classList.remove('active')
        tag.classList.toggle('active')

        console.log('здесь будет функция фильтрации по тегу')
        filterByTag()
      }

      let activeTags = document.querySelectorAll('.active')
      if (tag == tagAll && !tag.classList.contains('active')) {
        activeTags.forEach((tag) => {
          tag.classList.remove('active')
        })
        tag.classList.add('active')
        console.log('здесь будет функция вывода всех карточек')
        filterAll()
      }
      if (tags.length - 1 == activeTags.length || activeTags.length == 0) {
        activeTags.forEach((tag) => {
          tag.classList.remove('active')
        })
        tagAll.classList.add('active')
        console.log('здесь будет функция вывода всех карточек')
        filterAll()
      }
    })
  })
}

function filterByTag() {
  const cards = document.querySelectorAll('.O_ArticleCard')
  const activeTags = document.querySelectorAll('.active')
  let tagList = []
  let count

  cards.forEach((card) => {
    card.style.display = 'none'
  })

  activeTags.forEach((tag) => {
    let classList = tag.className.split(' ')
    classList = classList.sort()
    count = 1
    if (classList[1] == 'active') {
      count++
    }
    for (let i = count; i < classList.length; i++) {
      tagList.push(classList[i])
    }
  })

  tagList.forEach((tagName) => {
    cards.forEach((card) => {
      if (card.classList.contains(tagName)) {
        card.style.display = 'block'
      }
    })
  })
}

function filterAll() {
  const cards = document.querySelectorAll('.O_ArticleCard')
  const activeTags = document.querySelectorAll('.active')

  activeTags.forEach((tag) => {
    if (tag.classList.contains('all')) {
      cards.forEach((card) => {
        card.style.display = 'block'
      })
    }
  })
}
