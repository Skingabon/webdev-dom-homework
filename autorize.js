import { login } from './api.js';
import { apiFormHide, apiFormShow, hideAutorizeForm } from './main.js'

//help help
// export let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
// token = null; 
export let token = null;

export function autorizeRender() {
    // const autorizeForm = document.querySelector('.autorizeForm'); HELP
    const appHTML = document.getElementById('app');
    // if (!token) {
    // apiFormHide(); help
    const loginHTML =

        `<div class = 'autorizeForm'> 
        <div>
<input type="password" 
class="add-form-name" 
placeholder="Введите ваше имя" 
id="input-name1" />
      <input type="text" 
      class="add-form-text" 
      placeholder="Введите ваш логин" 
      id="input-login"></textarea>
        <input type="password" 
        class="add-form-text" 
        placeholder="Введите ваш пароль" 
        id="input-password"></textarea>
        <div class="add-form-row">
        <button class="add-form-button" id="login-button">Войти</button>
        <button class="add-form-button" id="toggle-button">Перейти к регистрации</button>
</div>
</div>
        `
    appHTML.innerHTML = loginHTML;

    document.getElementById("login-button").addEventListener('click', () => {

        const loginForm = document.getElementById("input-login").value;
        const passwordForm = document.getElementById("input-password").value;

        if (!loginForm) {
            alert("Введите Ваш логин")
            return;
        }
        if (!passwordForm) {
            alert("Введите Ваш пароль")
            return;
        }

        login({
            // login: "admin",
            // password: "admin",
            login: loginForm,
            password: passwordForm,
        }).then((user) => {
            console.log(passwordForm);
            if (passwordForm != password) { throw new Error("400") }
            else {
                console.log(user);
                token = `Bearer ${user.user.token}`;
                console.log(token);
            }
        }).catch((error) => {
            if (error.message === '400') {
                alert("Наконецто ппоймал ошибку авторизации")
            }

        })
        //help
        // // autorizeRender(); help
        // console.log('нажал войти');
        // console.log(token);
        // hideAutorizeForm();
        // //  apiFormShow(); help

    }
    )

    // }
    // return;

}



