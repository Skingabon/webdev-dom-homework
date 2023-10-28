import { getTodos, postTodos } from "./API.js";

 "use strict"
 
 // Код писать здесь
 const buttonElement = document.getElementById("add-button");
 const listElement = document.getElementById("list");
 const nameInputElemnt = document.getElementById("input-name");
 const commentInputElement = document.getElementById("input-comment");
 const currentDate = new Date().toLocaleString().slice(0, -3);
 const likeButtons = document.querySelectorAll(".like-button");
 let comments = [];

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
//13 Домашка

function apiFormHide(){//Порячу форму добавления коментария 
 //console.log("apiFormHide");
 const apiFormHide = document.querySelector(".add-form");
 apiFormHide.classList.add("hidden");
}

function apiFormShow(){//Показываю форму добавления коментария
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

function  showInternetError() {
 const showInternetError = document.querySelector(".internet-error")
 showInternetError.classList.remove("hidden")
}
function  hideInternetError() {
 const hideInternetError = document.querySelector(".internet-error")
 hideInternetError.classList.add("hidden")
}

//12 Домашка 
//15 Домашка обрабатываю ошибки 500 и 400--------------------------------------
                                   function apiGet() {
                                     showCommentLoading();
                                     //apiFormHide();
                                    
                                     const fetchPromise = 
                                   getTodos().then((responseData) => {
                                       // console.log(responseData);
                                    
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
                                       renderComment({ comments, fetchPromise });
                                       hideCommentLoading();
                                      //apiFormShow();
                                   });
                                
                                }
apiGet();


 nameInputElemnt.value = "";
 commentInputElement.value = "";


//   const comments = [
   // {
   //   name: "Глеб Фокин",
   //   data: "12.02.22 12:18",
   //   text: "Это будет первый комментарий на этой странице",
   //   like: 3,
   //   isLiked: false,
   //   isEdit: false,
   // },
   // {
   //   name: "Варвара Н.",
   //   data: "13.02.22 19:22",
   //   text: "Мне нравится как оформлена эта страница! ❤",
   //   like: 75,
   //   isLiked: false,
   //   isEdit: false,
   // }
//  ];


 //рендер-функция
 const renderComment = () => {

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
 renderComment();





 const addComment = buttonElement.addEventListener('click', () => {

// Закоментил расчет текщей даты т.к. в получении данных из апи после оправки нового комментария используется другая функция отрисовки даты
   //let data = new Date();

   // let formatDay;
   // if (data.getDate() < 10) {
   //   formatDay = "0" + data.getDate();
   // } else { formatDay = data.getDate() }

   // let formatMonth;
   // if (data.getMonth() < 10) {
   //   formatMonth = "0" + (data.getMonth() + 1);
   // } else { formatMonth = data.getMonth() + 1 }

   // let formatHours;
   // if (data.getHours() < 10) {
   //   formatHours = "0" + data.getHours();
   // } else { formatHours = data.getHours() }

   // let formatMinutes;
   // if (data.getMinutes() < 10) {
   //   formatMinutes = "0" + data.getMinutes();
   // } else { formatMinutes = data.getMinutes() }

   // let formatYear;
   // formatYear = data.getFullYear().toString().substr(2, 2)


   // let formatDate = formatDay + "." + formatMonth + "." + formatYear + " " + formatHours + ":" + formatMinutes;



   nameInputElemnt.classList.remove("error");
   commentInputElement.classList.remove("error");
   if (nameInputElemnt.value === "" || commentInputElement.value === "") {
     //nameInputElemnt.classList.add("error");
     alert("Заполните ИМЯ и ваш комментарий, пожалуйста.")
     return;
   }

//Комментирую добавление в локальное хранилище т.к. добавлять буду через API на удаленное хранилище
   // comments.push({
   //   name: nameInputElemnt.value
   //     .replaceAll('&', '&amp;')
   //     .replaceAll('<', '&lt;')
   //     .replaceAll('>', '&gt;')
   //     .replaceAll('"', '&quot'),
   //   data: formatDate,
   //   text: commentInputElement.value
   //     .replaceAll('&', '&amp;')
   //     .replaceAll('<', '&lt;')
   //     .replaceAll('>', '&gt;')
   //     .replaceAll('"', '&quot'),
   //   like: 0,
   //   isLiked: false,
   //   isEdit: false,
   // })

   //   const oldListHTML = listElement.innerHTML;
   //   listElement.innerHTML = oldListHTML + 

   //   `<li class="comment">
   //       <div class="comment-header">
   //         <div>${nameInputElemnt.value}</div>
   //         <div>
   //           ${formatDate}
   //         </div>
   //       </div>
   //       <div class="comment-body">
   //         <div class="comment-text">
   //           ${commentInputElement.value}
   //         </div>
   //       </div>
   //       <div class="comment-footer">
   //         <div class="likes">
   //           <span class="likes-counter">0</span>
   //           <button class="like-button"></button>
   //         </div>
   //       </div>
   //     </li>`;

   const textInApi = commentInputElement.value;
   const nameInApi = nameInputElemnt.value;
   //console.log(nameInputElemnt);
   
   //apiFormHide();
   hideInternetError();
   showCommentAdd();
   

//    fetch("https://wedev-api.sky.pro/api/v1/artem-katkov/comments", {
//        method: "POST",
//        body: JSON.stringify({
//          text: textInApi
//            .replaceAll("<", "&lt")
//            .replaceAll(">", "&gt")
//            .replaceAll("&", "&amp;")
//            .replaceAll('"', "&quot;"),
//          name: nameInApi
//            .replaceAll("<", "&lt")
//            .replaceAll(">", "&gt")
//            .replaceAll("&", "&amp;")
//            .replaceAll('"', "&quot;"),
//          forceError: true,
//        })

//      })
     postTodos({ 
        text: textInApi, 
        name: nameInApi
     })



   // nameInputElemnt.value = "";
   // commentInputElement.value = "";
   // renderComment();

   //apiCommentShow();//после загрузки комментария, показыва. окно добавления комментария
 })


//addComment();

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
 function addLikeEventListeners() {
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


 function oncommentClickEventListener() {
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