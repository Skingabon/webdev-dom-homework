export function getTodos() {
   return fetch(
        "https://wedev-api.sky.pro/api/v1/artem-katkov/comments",
        {
        metod: "GET",
        }).then((response) => response.json())
}

export function postTodos({ textInApi, nameInApi }) {

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




    return fetch("https://wedev-api.sky.pro/api/v1/artem-katkov/comments", {
        method: "POST",
        body: JSON.stringify({
          text: textInApi,
            // .replaceAll("<", "&lt")
            // .replaceAll(">", "&gt")
            // .replaceAll("&", "&amp;")
            // .replaceAll('"', "&quot;"),
          name: nameInApi
            // .replaceAll("<", "&lt")
            // .replaceAll(">", "&gt")
            // .replaceAll("&", "&amp;")
            // .replaceAll('"', "&quot;"),
        //   forceError: true,
        })

      })
      .then((response) => {
        if (response.status === 500) {
          hideCommentAdd();
          showInternetError();
          alert("Сервер сломаааался.")
        } else if (response.status === 400) {
          hideCommentAdd();
          showInternetError();
          alert("Имя и комментарий должны быть не короче 3 символов.")
        } else {
          //console.log("код в else");
        hideCommentAdd();
        apiFormShow();
      
        nameInputElemnt.value = "";
        commentInputElement.value = "";
        apiGet();
        //showCommentLoading();
        hideCommentLoading();
      }
      })
      .catch((error) => {
        hideCommentAdd();
        showInternetError();
        alert("Кажется, у вас сломался интернет, попробуйте позже.");
        console.warn(error);
      })
}