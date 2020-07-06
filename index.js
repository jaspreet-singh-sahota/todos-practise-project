const itemsLeft = document.createElement('h2')
const body = document.querySelector('body')

const getSavedTodos = () => {
  const todosJson = localStorage.getItem('todos');
  console.log(todosJson)
  if (todosJson !== null) {
    return JSON.parse(todosJson);
  } else {
    return []
  }
}

const filters = {
  searchText: '',
  hideCompeted: false,
}

const todos = getSavedTodos()

const renderTodos = (todos, filters) => {
  let filterTodos = todos.filter(todo => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));

  const hiddenList = filterTodos.filter((todo) => !filters.hideCompeted || !todo.completed );
  
  const divParagraph = document.querySelector('#todos')
  divParagraph.innerHTML = ''

  hiddenList.forEach(item => {
    const p = document.createElement('p');
    p.textContent = item.text;
    divParagraph.appendChild(p)
  });

  const itemLeftCount = todos.filter(item => !item.completed).length;
  itemsLeft.textContent = `You have ${itemLeftCount} todos left`;
  body.append(itemsLeft);
}

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  filters.hideCompeted = e.target.checked;
  renderTodos(todos, filters);
})

document.querySelector('#todos-input').addEventListener('input', function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters)
})

document.querySelector('#todos-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  todos.push({
    text: e.target.elements.todoItem.value,
    completed: e.target.check.checked
  })
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos, filters)
  e.target.elements.todoItem.value = "";
  e.target.check.checked = ''
})

renderTodos(todos, filters)
