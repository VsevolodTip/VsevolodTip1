const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo);

function addTodo(event){
    event.preventDefault()
    // создаем Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // создаем Li
    const newTodo = document.createElement('li')
    if(todoInput.value === ''){
      return alert('Заполните поле')
    }else{
      newTodo.innerText = todoInput.value
    }
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // добавляем Todo в Localstorage 
    saveLocalTodos(todoInput.value)
    // создаем check btn
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add('complete-btn')
    todoDiv.appendChild(completedBtn)
    // создаем delete btn
    const trashdBtn = document.createElement('button')
    trashdBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashdBtn.classList.add('trash-btn')
    todoDiv.appendChild(trashdBtn)
    // Кладем todoDiv v todo-list
    todoList.appendChild(todoDiv)
    // Чистка инпута
    todoInput.value = ''
}
function deleteCheck(e){
    const item = e.target
    if(item.classList.contains('trash-btn')){
        const todo = item.parentElement
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }
    if(item.classList.contains('complete-btn')){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}
function filterTodo(e){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else{
          todo.style.display = "none"
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else{
          todo.style.display = "none"
        }
        break;
    }
  })

}
function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}
function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // создаем Li
    const newTodo = document.createElement('li')

    newTodo.innerText = todo
    
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // создаем check btn
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add('complete-btn')
    todoDiv.appendChild(completedBtn)
    // создаем delete btn
    const trashdBtn = document.createElement('button')
    trashdBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashdBtn.classList.add('trash-btn')
    todoDiv.appendChild(trashdBtn)
    // Кладем todoDiv v todo-list
    todoList.appendChild(todoDiv)
  })
}
function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText
 todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}