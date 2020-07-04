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

const filters = {
  searchText: '',
}

const itemLeftCount = todos.filter(item => item.completed === false).length
const itemsLeft = document.createElement('h2')
const body = document.querySelector('body')

itemsLeft.textContent = `You have ${itemLeftCount} todos left`
body.append(itemsLeft)

const renderTodos = (todos, filters) => {
  filterTodos = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));
  
  const divParagraph = document.querySelector('#todos')
  divParagraph.innerHTML = ''

  filterTodos.forEach(item => {
    const p = document.createElement('p');
    p.textContent = item.text;
    divParagraph.appendChild(p)
  });
}

renderTodos(todos, filters)

document.querySelector('#add-button').addEventListener('click', function (e) {
  console.log(e.target.textContent = 'submit')
})

document.querySelector('#todos-input').addEventListener('input', function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters)
})