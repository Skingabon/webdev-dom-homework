import{comments, addLikeEventListeners, oncommentClickEventListener} from './main.js'


export const renderComment = () => {

const listElement = document.querySelector('.comments')


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
    listElement.innerHTML = commentsHTML;

    addLikeEventListeners()
    oncommentClickEventListener()
  };