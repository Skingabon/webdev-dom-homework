// import { comments, addLikeEventListeners, oncommentClickEventListener } from './main.js' HELP help


import { autorizeRender, token } from './autorize.js';
import { addLikeEventListeners, comments } from './main.js'

export const renderComment = () => {



  const listElement = document.querySelector('.comments');
  const appHTML = document.getElementById('app');

  //поиск элемента списка в стр.79
  //формирование HTML строки
  const commentsHTML = comments.map((comment, index) => {
    return `<li data-index="${index}" class="comment">

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
  <ul class="comments" id="list">
  ${commentsHTML}
  </ul>
${!token ? '<button class="autorize-button"> Авторизоваться </button>' : '<button class="autorize-button"> Привет </button>'}

  `
  if (!token) {
    console.log('Не сдавайся, никогда.1');
    const autorizeButton = document.querySelector('.autorize-button');
    autorizeButton.addEventListener('click', () => {
      autorizeRender();
    })
  }
  if (token != !token) { console.log('Не сдавайся, никогда.2'); }
  // listElement.innerHTML = commentsHTML;

  addLikeEventListeners()
  //   oncommentClickEventListener() help
};