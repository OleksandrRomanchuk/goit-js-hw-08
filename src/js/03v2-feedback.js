import {
  saveDataToLocalSt,
  loadDataFromLocalSt,
  removeDataFromLocalSt,
} from './local-st-func';
import throttle from 'lodash.throttle';

const FORM_SELECTOR = '.feedback-form';
const LOCAL_ST_KEY = 'feedback-form-state';
const loginForm = document.querySelector(FORM_SELECTOR);

if (loadDataFromLocalSt(LOCAL_ST_KEY)) {
  Object.keys(loadDataFromLocalSt(LOCAL_ST_KEY)).map(key => {
    if (loginForm[key]) {
      loginForm[key].value = loadDataFromLocalSt(LOCAL_ST_KEY)[key];
    }
  });
}

loginForm.addEventListener('submit', onFormSubmit);
loginForm.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
  event.preventDefault();

  if (!formFieldsValidation(loginForm)) return;

  const formData = [...event.target].reduce((dataObj, { name }) => {
    if (name) {
      dataObj[name] = event.target.elements[name].value;
    }

    return dataObj;
  }, {});

  console.log(formData);
  //   console.log(loadDataFromLocalSt(LOCAL_ST_KEY));

  removeDataFromLocalSt(LOCAL_ST_KEY);
  event.target.reset();
}

function formFieldsValidation(form) {
  const isFullField = form.querySelectorAll('input');

  return [...isFullField].every(field => field.value)
    ? true
    : alert('Hello! All fields must be filled!');

  //   const isFullField = [
  //     ...form.querySelectorAll('input'),
  //     ...form.querySelectorAll('textarea'),
  //   ];

  //   return isFullField.every(field => field.value)
  //     ? true
  //     : alert('Hello! All fields must be filled!');
}

function onFormInput(event) {
  if (event.currentTarget) {
    const formData = [...event.currentTarget].reduce((dataObj, { name }) => {
      if (name) {
        dataObj[name] = event.currentTarget[name].value;
      }

      return dataObj;
    }, {});

    saveDataToLocalSt(LOCAL_ST_KEY, formData);
  }
}

// removeDataFromLocalSt(LOCAL_ST_KEY);
