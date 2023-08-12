const todoInput = document.querySelector("#todo-input");
todoInput.autocomplete = "off";
const todoBtn = document.querySelector("#todo-btn");
const todoList = document.querySelector("#todo-list");

document.addEventListener('DOMContentLoaded', getLocalTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(e) {

    if(todoInput.value === ''){
        alert("Invalid Value!")
        return;
    }

    e.preventDefault();
    const listItemContainer = document.createElement('div');
    listItemContainer.setAttribute('id', 'list-item-container');

    const listItem = document.createElement('div');
    listItem.setAttribute('class', 'todo-list-item');
    listItem.innerHTML = `<li>${todoInput.value}</li>`;

    const iconsDiv = document.createElement('div');
    iconsDiv.setAttribute('id', 'icons');

    //local storage
    saveLocalTodos(todoInput.value);

    const icon = document.createElement('button');
    icon.setAttribute('id', 'check-btn')
    icon.innerHTML = '<i id="icon" class="fas fa-check-circle"></i>';
    iconsDiv.appendChild(icon);

    const trashBtn = document.createElement('button');
    trashBtn.setAttribute('id', 'trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    iconsDiv.appendChild(trashBtn);

    listItemContainer.appendChild(listItem);
    listItemContainer.appendChild(iconsDiv);

    const todoList = document.getElementById('todo-list');
    todoList.appendChild(listItemContainer);

    todoInput.value = '';

  }

  function deleteCheck(e){
    const i = e.target;
    const item = i.parentElement;

    console.log(item);

    if(item.id === "trash-btn"){
        const icons = item.parentElement;
        console.log(icons);
        const todo = icons.parentElement;
        console.log(todo);
        removeLocalTodos(todo);
    }

    if(item.id === "check-btn"){
        const icons = item.parentElement;
        const todo = icons.parentElement;
        console.log(todo);
        item.classList.toggle("active");
        todo.classList.toggle("completed");
    }
  }

  function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        const listItemContainer = document.createElement('div');
    listItemContainer.setAttribute('id', 'list-item-container');

    const listItem = document.createElement('div');
    listItem.setAttribute('class', 'todo-list-item');
    listItem.innerHTML = `<li>${todo}</li>`;

    const iconsDiv = document.createElement('div');
    iconsDiv.setAttribute('id', 'icons');


    const icon = document.createElement('button');
    icon.setAttribute('id', 'check-btn')
    icon.innerHTML = '<i id="icon" class="fas fa-check-circle"></i>';
    iconsDiv.appendChild(icon);

    const trashBtn = document.createElement('button');
    trashBtn.setAttribute('id', 'trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    iconsDiv.appendChild(trashBtn);

    listItemContainer.appendChild(listItem);
    listItemContainer.appendChild(iconsDiv);

    const todoList = document.getElementById('todo-list');
    todoList.appendChild(listItemContainer);

    });
  }

  function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].textContent;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
    todo.remove();
}