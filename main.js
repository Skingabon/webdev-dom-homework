import { getTodo, postTodo } from "./api.js";
import { renderComment } from './render.js';


const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElemnt = document.getElementById("input-name");
const commentInputElement = document.getElementById("input-comment");
const currentDate = new Date().toLocaleString().slice(0, -3);
const likeButtons = document.querySelectorAll(".like-button");
export let comments = [];

function correctDate(date) {
  let currentDate = new Date(date);
  let todayDay = currentDate.getDate();
  let todayMonth = currentDate.getMonth() + 1;
  let todayYear = String(currentDate.getFullYear()).slice(-2);
  let todayHours = currentDate.getHours();
  let todayMinutes = currentDate.getMinutes();
  todayDay = todayDay < 10 ? "0" + todayDay : todayDay;
  todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
  todayHours = todayHours < 10 ? "0" + todayHours : todayHours;
  todayMinutes = todayMinutes < 10 ? "0" + todayMinutes : todayMinutes;

  let formattedDate = `${todayDay}.${todayMonth}.${todayYear} ${todayHours}:${todayMinutes} `;
  return formattedDate;
}

function apiFormHide() {//Порячу форму добавления коментария 
  //console.log("apiFormHide");
  const apiFormHide = document.querySelector(".add-form");
  apiFormHide.classList.add("hidden");
}

function apiFormShow() {//Показываю форму добавления коментария
  //console.log("apiCommentShow");
  const apiFormShow = document.querySelector(".add-form");
  apiFormShow.classList.remove("hidden");
}

function showCommentLoading() {//Показываю (удаляю в стилях блок) временный текст до загрузки комментариев
  //console.log("showCommentLoading");
  const showCommentLoading = document.querySelector(".api-loader");
  showCommentLoading.classList.remove("hidden");
}

function hideCommentLoading() {//Удаляю (возвращаю блок) временный текст до загрузки комментариев
  const hideCommentLoading = document.querySelector(".api-loader");
  hideCommentLoading.classList.add("hidden");
}

function showCommentAdd() {
  const showCommentAdd = document.querySelector(".comment-add")
  showCommentAdd.classList.remove("hidden")
}

function hideCommentAdd() {
  const hideCommentAdd = document.querySelector(".comment-add")
  hideCommentAdd.classList.add("hidden")
}

function showInternetError() {
  const showInternetError = document.querySelector(".internet-error")
  showInternetError.classList.remove("hidden")
}
function hideInternetError() {
  const hideInternetError = document.querySelector(".internet-error")
  hideInternetError.classList.add("hidden")
}

export function apiGet() {
  showCommentLoading();

  getTodo().then((responseData) => {
    console.log(responseData);

    const apiComment = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        data: correctDate(comment.date),
        text: comment.text,
        like: comment.likes,
        isLiked: false,
      }
    });
    comments = apiComment;
    renderComment();
    hideCommentLoading();
  });

}
apiGet();


nameInputElemnt.value = "";
commentInputElement.value = "";

renderComment();

const addComment = buttonElement.addEventListener('click', () => {

  
  nameInputElemnt.classList.remove("error");
  commentInputElement.classList.remove("error");
  if (nameInputElemnt.value === "" || commentInputElement.value === "") {
    alert("Заполните ИМЯ и ваш комментарий, пожалуйста.")
    return;
  }

  const textInApi = commentInputElement.value;
  const nameInApi = nameInputElemnt.value;
  //console.log(nameInputElemnt);
  hideInternetError();
  showCommentAdd();


  postTodo({ textInApi, nameInApi }).then((response) => {

    hideCommentAdd();
    if (response.status === 500) {
      throw new Error('500')
    }
    if (response.status === 400) {
      throw new Error('400')
    }

    apiFormShow();
    nameInputElemnt.value = "";
    commentInputElement.value = "";
    apiGet();
    hideCommentLoading();

  })
    .catch((error) => {
      if (error.message === '500') {
        alert("Сервер сломаааался.")
      }
      if (error.message === '400') {
        alert("Имя и комментарий должны быть не короче 3 символов.")
      }
      if (error.message === 'Failed to fetch') {
        showInternetError();
        alert("Кажется, у вас сломался интернет, попробуйте позже.");
      }
      console.warn(error);
    })
 })




// Функция счета лайков
function addLike(index) {
  const likeButtons = document.querySelectorAll('.like-button');
  const likeButton = likeButtons[index];
  const comment = comments[index];



  if (!comment.isLiked) {
    //console.log('+1 like');
    comment.like += 1;
    comment.isLiked = true;
    likeButton.classList.add("active-like");
  } else {
    //console.log('-1 like');
    comment.like -= 1;
    comment.isLiked = false;
    renderComment();
  }
  //console.log(index);

  //Обновляю счетчик числа лайков (свойство previousElementSibling содержит предыдущий элемент, находящийся в этом же родителе)
  const likeCounter = likeButton.previousElementSibling;
  likeCounter.textContent = comment.like;
  //console.log(likeCounter.value);
}
//Написал функцию. которая инициализирует обработчики кликов по кнопкам Лайк
///////НУЖНО ПЕРЕДАТЬ В РЕНДЕР МОДУЛЬ В КАЧЕСТВЕ ПАРАМЕТРА
export function addLikeEventListeners() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", (event) => {

      // console.log(index);
      event.stopPropagation();
      addLike(index);

    });
  });
}

addLikeEventListeners();
renderComment();

///////НУЖНО ПЕРЕДАТЬ В РЕНДЕР МОДУЛЬ В КАЧЕСТВЕ ПАРАМЕТРА
export function oncommentClickEventListener() {
  const commentUpdate = document.querySelectorAll('.comment');
  for (const comment of commentUpdate) {
    comment.addEventListener('click', () => {
      let index = comment.dataset.index;
      let object = comments[index];
      commentInputElement.value = `${object.text} // ${object.name}`;
      renderComment();
    });
  }
}