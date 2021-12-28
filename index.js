const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", add);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filter);


function add(event) {
  event.preventDefault();

  //Create a todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  //create a newTodo li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("new-todo");
  todoDiv.appendChild(newTodo);

  //save to localStorage
  saveTodos(todoInput.value);

  //Check-button
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = `<i class = "fas fa-check"></i>`;
  checkBtn.classList.add("check-btn");
  todoDiv.appendChild(checkBtn);

  //delete-button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class = "fas fa-trash"></i>`
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(deleteBtn);

  //append to todo list
  todoList.appendChild(todoDiv);

  //clear todoInput
  todoInput.value = "";
}

function deleteCheck(e) {
  //delete
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    todo = item.parentElement;
    todo.classList.add("deleted");
    removeTodos();
    todo.addEventListener("transitionend", function() {
      todo.remove();
    })
  }

  //check
  if (item.classList[0] === "check-btn") {
    todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filter(e) {
  const todos = todoList.childNodes;
  Array.from(todos).forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveTodos(todo) {
  let todos = localStorage.getItem("todos");
  if (todos == null) {
    todosObj = [];
  } else {
    todosObj = JSON.parse(todos);
  }
  todosObj.push(todo);
  localStorage.setItem("todos", JSON.stringify(todosObj));
}

function getTodos() {
  let todos = localStorage.getItem("todos");
  if (todos == null) {
    todosObj = [];
  } else {
    todosObj = JSON.parse(todos);
  }
  todosObj.forEach(function(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //create a newTodo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("new-todo");
    todoDiv.appendChild(newTodo);

    //Check-button
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = `<i class = "fas fa-check"></i>`;
    checkBtn.classList.add("check-btn");
    todoDiv.appendChild(checkBtn);

    //delete-button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class = "fas fa-trash"></i>`
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    //append to todo list
    todoList.appendChild(todoDiv);

  });

}

function removeTodos() {
  let todos = localStorage.getItem("todos");
  if (todos == null) {
    todosObj = [];
  } else {
    todosObj = JSON.parse(todos);
  }
  const todoIndex = todo.children[0].innerText;
  todosObj.splice(todosObj.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todosObj));
}
