import { login } from './api.js';
import { apiFormHide, apiFormShow, hideAutorizeForm } from './main.js'


let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
token = null;


export function autorizeRender(token) {
const autorizeForm = document.querySelector('.autorizeForm');
if (!token) {
    apiFormHide();
 const appHTML =
`<div>
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
        `
autorizeForm.innerHTML = appHTML;

document.getElementById("login-button").addEventListener('click', () => {
    
    login({
        login: "admin",
        password: "admin",
    }).then((user) => {
        
        console.log(user);
        token = `Bearer ${user.user.token}`;
        console.log(token);
    })
       
    autorizeRender();
    console.log('нажал войти');
    console.log(token);
hideAutorizeForm();
apiFormShow();
    }
  ) 
        }
        return;
    }

    

