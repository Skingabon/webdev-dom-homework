// import { comments, addLikeEventListeners, oncommentClickEventListener } from './main.js' HELP help


import { login } from './api.js';
import { autorizeRender, token, userName } from './autorize.js';
import { addComment, addLikeEventListeners, apiGet, comments } from './main.js'

export const renderComment = () => {



  // const listElement = document.querySelector('.comments');
  const appHTML = document.getElementById('app');
  const buttonAutorize = '<button class="autorize-button"> Авторизоваться </button>';
  const formAccesUser = `<div class="add-form">
  <input type="text" class="add-form-name" placeholder="Введите ваше имя" 
  value = ${userName}
  readonly
  id="input-name" />
  <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
    id="input-comment"></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="add-button">Написать</button>
  </div>
  </div>`
  //поиск элемента списка в стр.79
  //формирование HTML строки
  const commentsHTML = comments.map((comment, index) => {

    return `
    <li data-index="${index}" class="comment">

          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.data}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span data-index="${index}" class="likes-counter">${comment.like}</span>
              <button data-index="${index}" class="like-button"></button>
            </div>
          </div>
        </li>`;
  }).join('');
  //console.log(commentsHTML);
  appHTML.innerHTML = `
    <div class="api-loader hidden">
      <span>Данные загружаются, нужно немного подождать...</span>
    </div>

  <ul class="comments" id="list">
  
  ${commentsHTML}
  </ul>
  <div class="comment-add hidden">
      <span>Комментарий добавляется...</span>
    </div>
    <div class="internet-error hidden">
      <span>Неполадки с Интеренетом. Отправьте комментарий позже...</span>
    </div>
${(!token) ? buttonAutorize : formAccesUser}
`
  if (token) { addComment() }


  if (!token) {
    console.log(token);
    const autorizeButton = document.querySelector('.autorize-button');
    autorizeButton.addEventListener('click', () => {
      autorizeRender();

    })
  }



  // listElement.innerHTML = commentsHTML;

  addLikeEventListeners()
  //   oncommentClickEventListener() help
};