import { delTodos, getTodos, postTodos } from './api.js';
import { sanitizeHtml } from './sanitizeHtml.js'
import { renderTasks } from './renderTasks.js';




const buttonElement = document.getElementById("add-button");
// const listElement = document.getElementById("list"); Переменная перенесена в модуль рендера
const textInputElement = document.getElementById("text-input");

let tasks = [];

const fetchAndRenderTasks = () => {
  // перенес в модуль api.js
  //fetch("https://webdev-hw-api.vercel.app/api/todos", {
  //   method: "GET",
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  getTodos().then((responseData) => {
      tasks = responseData.todos;
      renderTasks({ tasks, fetchAndRenderTasks });
      return true;
    });
};


//////// Перенес в модуль 
// const renderTasks = () => {

// //${task.text}  было вмето вызова переменной из модуля sanitizeHtml 
  
// const tasksHtml = tasks
// .map((task) => {
//   return `
//   <li class="task">
//     <p class="task-text">
//     ${sanitizeHtml(task.text)}
//       <button data-id="${task.id}" class="button delete-button">Удалить</button>
//     </p>
//   </li>`;
// })
// .join("");


//   listElement.innerHTML = tasksHtml;
//   const deleteButtons = document.querySelectorAll(".delete-button");

//   for (const deleteButton of deleteButtons) {
//     deleteButton.addEventListener("click", (event) => {
//       event.stopPropagation();

//       const id = deleteButton.dataset.id;
// // вызываю фукнцию из модуля api.js
//       delTodos({ id }).then(() => {
//           fetchAndRenderTasks();
//         });
//     });
//   }
// };

fetchAndRenderTasks({ tasks, fetchAndRenderTasks });

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Элемент добавлятся...";

  postTodos({ 
    text: textInputElement.value 
  }).then(() => {
      return fetchAndRenderTasks();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
      textInputElement.value = "";
    });

  renderTasks();
});


