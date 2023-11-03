export function autorizeRender() {

const autorizeForm = document.querySelector('.autorizeForm')
autorizeForm.innerHTML =
`<input type="text" class="add-form-name" placeholder="Введите ваше имя" id="input-name" />
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="input-comment"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="add-button">Написать</button>
`
}