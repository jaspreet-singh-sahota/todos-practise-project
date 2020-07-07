const itemsLeft = document.createElement('h2');
const body = document.querySelector('body');

const getSavedTodos = () => {
  const todosJson = localStorage.getItem('todos');

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

const todos = getSavedTodos();
  
const removeTodo = (id) => {
  const todoIndex = todos.findIndex(todo => todo.id === id)

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1)
  }
}

const toggleCheckbox = (id) => {
  const todoCheckbox = todos.find((todo) => todo.id === id);

  if (todoCheckbox !== undefined) {
    todoCheckbox.completed = !todoCheckbox.completed;
  }
}

const renderTodos = (todos, filters) => {
  let filterTodos = todos.filter(todo => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));

  const hiddenList = filterTodos.filter((todo) => !filters.hideCompeted || !todo.completed );
  
  const divParagraph = document.querySelector('#todos')
  divParagraph.innerHTML = ''

  hiddenList.forEach(item => {
    const div = document.createElement('div');
    const checkbox = document.createElement('input')
    const p = document.createElement('span');
    const removeButton = document.createElement('button')
    
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = item.completed
    checkbox.addEventListener('change', () => {
      toggleCheckbox(item.id);
      saveTodos(todos);
      renderTodos(todos, filters);
    })
    
    removeButton.addEventListener('click', () => {
      removeTodo(item.id);
      saveTodos(todos);
      renderTodos(todos, filters);
    })
    
    removeButton.textContent = 'X'
    p.textContent = item.text
    divParagraph.appendChild(div);
    div.appendChild(checkbox)
    div.appendChild(p);
    div.appendChild(removeButton);
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

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

document.querySelector('#todos-form').addEventListener('submit', (e) => {
  e.preventDefault();

  todos.push({
    id: uuidv4(),
    text: e.target.elements.todoItem.value,
    completed: e.target.check.checked
  })

  saveTodos(todos)
  renderTodos(todos, filters)
  e.target.elements.todoItem.value = "";
  e.target.check.checked = ''
})

renderTodos(todos, filters)
