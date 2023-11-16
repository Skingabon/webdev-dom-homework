import { login } from './api.js';
import { apiFormHide, apiFormShow, apiGet, hideAutorizeForm } from './main.js'
import { renderComment } from './render.js';

//help help
//export let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
// token = null;
export let userName = localStorage.getItem('user');
export let token = localStorage.getItem('token');

// export let userName = null;
// export let userVisit = false;
export function autorizeRender() {
    // const autorizeForm = document.querySelector('.autorizeForm'); HELP
    const appHTML = document.getElementById('app');
    let isLoginMode = true;
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

    document.getElementById("toggle-button").addEventListener('click', () => {
        isLoginMode = !isLoginMode;
    })

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
        }).then((response) => {
            //console.log('я в зэне Авторизации');
            // console.log(response);
            token = response.user.token;
            userName = response.user.name;
            console.log(userName);
            localStorage.setItem('user', userName);
            localStorage.setItem('token', token);
            // userVisit = true;
            renderComment();

            // apiFormShow();
            // if (passwordForm != password) { throw new Error("400") }
            // else {
            //     console.log('Привет юзер');
            //     token = `Bearer ${user.user.token}`;
            //     console.log('Твой пароль');
            // }
        }).catch((error) => {
            // console.error(error.message);
            // if (error.message === '400') {
            //     alert("Наконецто ппоймал ошибку авторизации")
            // }
            // if (error.message === '201') {
            //     alert("Авторизовались")
            // }
            alert(error.message)
        })
        //help
        // // autorizeRender(); help
        // console.log('нажал войти');
        // console.log(token);
        // hideAutorizeForm();
        // apiFormShow();
    }
    )

    // }
    // return;

}



