const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const todoData = [];

function saveToLocal() {
  localStorage.clear();
  localStorage.setItem("data", JSON.stringify(todoData));
}

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  todoData.forEach(function (item, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      saveToLocal();
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      delete todoData[index];
      saveToLocal();
      render();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (isNaN(headerInput.value.trim())) {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };
    todoData.push(newToDo);
    saveToLocal();
    headerInput.value = "";
    render();
  }
});

JSON.parse(localStorage.getItem("data")).forEach((item) => todoData.push(item));
localStorage.clear();
render();
