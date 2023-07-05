/*---------------------------- select elements ----------------------------*/
const $ = document;
const showModalBtn = $.querySelector(".show-modal-btn");
const modalCover = $.querySelector(".modal-cover");
const modalBox = $.querySelector(".modal-box");
const closeModalBtn = $.querySelector(".close-modal-btn");
const todoInput = $.querySelector(".modal-body input");
const addTodoBtn = $.querySelector(".add-todo");
const firstColumnTodo = $.querySelector("#no-status-column");
const todoColumns = $.querySelectorAll(".todo-column");
let allTodoItems = $.querySelectorAll(".todo-item");
const todoTitles = $.querySelector('.todo-titles')
const todoTable = $.querySelector('.todo-table');
const todoContainer = $.querySelector('.todo-container');

/*---------------------------- show modal ----------------------------*/
showModalBtn.addEventListener("click", () => {
  modalCover.classList.add("show-modal-cover");
  modalBox.classList.add("show-modal-box");
  todoInput.focus()
});

/*---------------------------- hide modal ----------------------------*/
$.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-cover")) {
    modalCover.classList.remove("show-modal-cover");
    modalBox.classList.remove("show-modal-box");
  }
});

closeModalBtn.addEventListener("click", () => {
  modalCover.classList.remove("show-modal-cover");
  modalBox.classList.remove("show-modal-box");
});

$.addEventListener('keyup',(e)=>{
  if(e.key === 'Escape'){
    modalCover.classList.remove("show-modal-cover");
  modalBox.classList.remove("show-modal-box");
  }
})

/*----------------------------- Add todo -----------------------------*/

// press enter
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

// click on btn
addTodoBtn.addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  let todoInputValue = todoInput.value;
  if (todoInputValue) {
    let todoItem = $.createElement("div");
    todoItem.setAttribute("draggable", "true");
    todoItem.setAttribute("id", todoInputValue);
    todoItem.className = "todo-item";
    let todoText = $.createElement("span");
    todoText.className = "todo-item-title";
    todoText.textContent = todoInputValue;
    let deletTodo = $.createElement("span");
    deletTodo.className = "delete-todo";
    deletTodo.innerHTML = "&#x00D7;";
    todoItem.append(todoText, deletTodo);
    firstColumnTodo.appendChild(todoItem);
    // clear input
    todoInput.value = "";
    allTodoItems = $.querySelectorAll(".todo-item");
    allTodoItems.forEach(function (eachTodoItem) {
      eachTodoItem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("todo-item", e.target.id);
      });
    });
  }
}

/*------------------------------- delete todo -------------------------------*/
$.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-todo")) {
    e.target.parentElement.remove();
  }
});

/*-------------------------------- droppable zone --------------------------------*/

todoColumns.forEach(function (todoColumn) {
  todoColumn.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  todoColumn.addEventListener("drop", (e) => {
    // for voide drop a task to another task
    if (e.target.classList.contains("todo-item")) {
      e.preventDefault();
    } else {
      e.preventDefault();
      let moveTodo = $.getElementById(e.dataTransfer.getData("todo-item"));
      e.target.append(moveTodo);
    }
  });
});



