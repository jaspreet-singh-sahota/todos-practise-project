console.log('testing TODOS')

const todos = [{
  text: 'Order cat food',
  completed: false
}, {
  text: 'Clean kitchen',
  completed: true
}, {
  text: 'Buy food',
  completed: true
}, {
  text: 'Do work',
  completed: false
}, {
  text: 'Exercise',
  completed: true
}]

document.querySelectorAll('p').forEach(p => p.remove());

const itemLeftCount = todos.filter(item => item.completed === false).length
const itemsLeft = document.createElement('h2')
const body = document.querySelector('body')

itemsLeft.textContent = `You have ${itemLeftCount} todos left`
body.append(itemsLeft)


todos.forEach(item => {
  const p = document.createElement('p')
  p.textContent = item.text
  body.appendChild(p)
})

document.querySelector('#add-button').addEventListener('click', function (e) {
  console.log(e.target.textContent = 'button clicked')
})