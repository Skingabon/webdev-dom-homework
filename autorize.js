export function autorizeRender() {

const autorizeForm = document.querySelector('.autorizeForm')
autorizeForm.innerHTML =
`<input type="password" 
class="add-form-name" 
placeholder="Введите ваше имя" 
id="input-name" />
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
`
}

