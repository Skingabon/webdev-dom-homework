


export function getTodo() {
   return fetch(
    "https://wedev-api.sky.pro/api/v1/artem-katkov/comments",
    {
    metod: "GET",
    })
    .then((response) => {
        return response.json();
      })
}


export function postTodo({ textInApi, nameInApi }) {
    return fetch("https://wedev-api.sky.pro/api/v1/artem-katkov/comments", {
    method: "POST",
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