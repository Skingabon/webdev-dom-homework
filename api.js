export function getTodo() {
  return fetch(
    "https://wedev-api.sky.pro/api/v2/artem-katkov/comments",
    {
      metod: "GET",
    })
    .then((response) => {
      return response.json();
    })
}


export function postTodo({ textInApi, nameInApi, token }) {
  return fetch("https://wedev-api.sky.pro/api/v2/artem-katkov/comments"
    , {
      method: "POST",
      headers: {
        Authorization: token, //`Bearer ${user}`, help
      },
      body: JSON.stringify({
        text: textInApi
          .replaceAll("<", "&lt")
          .replaceAll(">", "&gt")
          .replaceAll("&", "&amp;")
          .replaceAll('"', "&quot;"),
        name: nameInApi
          .replaceAll("<", "&lt")
          .replaceAll(">", "&gt")
          .replaceAll("&", "&amp;")
          .replaceAll('"', "&quot;"),
        forceError: true,
      })

    })
}
///////////////////////

export function login({ login, password }) {
  console.log("Я в ЛОГИНЕ");
  console.log(login);
  console.log(password);
  return fetch("https://wedev-api.sky.pro/api/user/login"
    , {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),

    }).then((response) => {
      return response.json();
    });
}