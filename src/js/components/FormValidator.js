import { ERROR_GENERAL, ERROR_NAME, ERROR_EMAIL, ERROR_PHONE } from '../constants/ERROR_MESSAGES';

export default class FormValidator {
  constructor(formClass) {
    this.formClass = formClass;
    this.form = this.formClass.form;
    this.isValidate = this.isValidate.bind(this);
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
  }

  isValidate(inputElement) {
    inputElement.setCustomValidity(''); //устанавливаем свойсво validity.customError в false

    //* если на инпуте есть атрибут required, поле validity.valueMissing
    /* будет true / false (заполнено)*/
    if (inputElement.validity.valueMissing) {
      // текст ошибки записываем в inputElem.validationMessage с помощью input.setCustomValidity()
      inputElement.setCustomValidity(ERROR_GENERAL.empty);
      return false;
    }

    //* если на инпуте есть атрибут minlength, поле validity.tooShort будет
    /* true / false (достигнута мин. длина)*/
    if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      inputElement.setCustomValidity(ERROR_NAME.wrongLength);
      return false;
    }

    if (inputElement.validity.patternMismatch && inputElement.type === 'text') {
      inputElement.setCustomValidity(ERROR_NAME.wrongPattern);
      return false;
    }

    if (
      (inputElement.validity.typeMismatch || inputElement.validity.patternMismatch) &&
      inputElement.type === 'email'
    ) {
      inputElement.setCustomValidity(ERROR_EMAIL.wrongPattern);
      return false;
    }

    if (
      (inputElement.validity.tooLong || inputElement.validity.patternMismatch) &&
      inputElement.type === 'tel'
    ) {
      inputElement.setCustomValidity(ERROR_PHONE.wrongPattern);
      return false;
    }

    return inputElement.checkValidity();
  }

  //*функция валидации поля
  checkInputValidity(inputElement) {
    const errorElem = inputElement.parentNode.querySelector('.error-message');
    const valid = this.isValidate(inputElement); // устанавливаем инпуту кастомные ошибки, если они есть.
    if (!valid) {
      errorElem.textContent = inputElement.validationMessage;
      inputElement.classList.add('error');
    } else {
      errorElem.textContent = '';
      inputElement.classList.remove('error');
    }

    return valid;
  }

  handleInputs(event) {
    const submitElement = this.formClass.button;

    const [...inputs] = this.form.querySelectorAll('input'); // превращаем итератор(итерируемый объект) в массив

    this.checkInputValidity(event.target); // проверяем поле на валидность и выводим ошибку если не валидно.

    if (inputs.every(this.isValidate)) {
      // если каждый инпут формы вернул true, то включаем кнопку в противном случае выключаем
      this.setSubmitButtonState(submitElement, true);
    } else {
      this.setSubmitButtonState(submitElement, false);
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', this.handleInputs, true);
  }

  removeEventListeners() {
    this.form.removeEventListener('input', this.handleInputs, true);
  }

  //* функция, меняющая состояние кнопки сабмита
  setSubmitButtonState(button, state) {
    if (state) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }

  resetErrors() {
    this.form.reset();
    const errors = this.form.querySelectorAll('.error-message');
    errors.forEach(error => (error.textContent = ''));
  }
}
