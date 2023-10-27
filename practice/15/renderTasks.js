import { delTodos } from "./api.js";
import { sanitizeHtml } from "./sanitizeHtml.js";


const listElement = document.getElementById("list");

export const renderTasks = ({ tasks, fetchAndRenderTasks }) => {

    //${task.text}  было вмето вызова переменной из модуля sanitizeHtml 
      
    const tasksHtml = tasks
    .map((task) => {
      return `
      <li class="task">
        <p class="task-text">
        ${sanitizeHtml(task.text)}
          <button data-id="${task.id}" class="button delete-button">Удалить</button>
        </p>
      </li>`;
    })
    .join("");
    
    
      listElement.innerHTML = tasksHtml;
      const deleteButtons = document.querySelectorAll(".delete-button");
    
      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();
    
          const id = deleteButton.dataset.id;
    // вызываю фукнцию из модуля api.js
          delTodos({ id }).then(() => {
              fetchAndRenderTasks();
            });
        });
      }
    };