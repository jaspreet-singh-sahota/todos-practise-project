const itemsLeft = document.createElement('h2')
const body = document.querySelector('body')

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
  hideCompeted: false,
}

const renderTodos = (todos, filters) => {
  let filterTodos = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));

  filterTodos = filterTodos.filter((todo) => !todo.completed || !filters.hideCompeted );
  
  const divParagraph = document.querySelector('#todos')
  divParagraph.innerHTML = ''

  filterTodos.forEach(item => {
    const p = document.createElement('p');
    p.textContent = item.text;
    divParagraph.appendChild(p)
  });
  const itemLeftCount = todos.filter(item => !item.completed).length;
  itemsLeft.textContent = `You have ${itemLeftCount} todos left`;
  body.append(itemsLeft);

  document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompeted = e.target.checked;
    renderTodos(todos, filters);
  })
}

document.querySelector('#todos-input').addEventListener('input', function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters)
})

renderTodos(todos, filters)


document.querySelector('#todos-form').addEventListener('submit', (e) => {
  e.preventDefault();

  todos.push({
    text: e.target.elements.todoItem.value,
    completed: e.target.check.checked
  })
  renderTodos(todos, filters)
  e.target.elements.todoItem.value = ""
})

