const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList= document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['#FFFF33', '#FF3300', '#9900FF', '#663399', '#00FFFF', '#33FF00', '#CC6600', '#FF6600']
let time = 0
let score = 0
let interval = null

startBtn.addEventListener('click', e => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.dataset.time)
    // time = parseInt(e.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandomCircle()
  }
})

function startGame () {
  setTime(time)
  createRandomCircle()
  interval = setInterval(decreaseTime,1000)
}

function decreaseTime () {
  if (time === 0 ) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    if (current < 4) {
      timeEl.classList.remove('primary')
      timeEl.classList.add('less-time')
    }
    setTime(current)
  }
}

function setTime (value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame () {
  clearInterval(interval)
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
  timeEl.parentElement.classList.add('hide')
}

function createRandomCircle () {
  const circle = document.createElement('div')
  const { height, width } = board.getBoundingClientRect()
  const size = getRandomNumber(10, 60)
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  const colorGradient_1 = getRandomColor() 
  const colorGradient_2 = getRandomColor() 

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.boxShadow = `0 0 5px ${colorGradient_1}, 0 0 10px ${colorGradient_2}`
  circle.style.background = `linear-gradient(90deg, ${colorGradient_1}, ${colorGradient_2}`

  board.append(circle)
}

function getRandomNumber (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor () {
  // console.log(Math.floor(Math.random() * colors.length))
  return colors[Math.floor(Math.random() * colors.length)]
}