// * Відстежуй на формі подію input, і щоразу записуй у локальне 
// сховище об'єкт з полями email і message, у яких зберігай поточні 
// значення полів форми. Нехай ключем для сховища буде рядок 
// "feedback-form-state".
// * Під час завантаження сторінки перевіряй стан сховища, 
// і якщо там є збережені дані, заповнюй ними поля форми. 
// В іншому випадку поля повинні бути порожніми.
// * Під час сабміту форми очищуй сховище і поля форми, 
// а також виводь у консоль об'єкт з полями email, 
// message та їхніми поточними значеннями.
// * Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 
// 500 мілісекунд. Для цього додай до проекту і використовуй 
// бібліотеку lodash.throttle.

import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";
let formData = {};

form.addEventListener("submit", onSubmit);
form.addEventListener("input", throttle(onInput, 500));

populateForm();

function onSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();

    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
}

function onInput(e) {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
// const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

// if(savedMessage) {
//     let {email, message} = form.elements;
//     email.value = savedMessage.email || "";
//     message.value = savedMessage.message || "";
// }
try {
     const data = localStorage.getItem(STORAGE_KEY);
     if (!data) return;
     formData = JSON.parse(data);
     Object.entries(formData).forEach(([key, val]) => {
        form.elements[key].value = val;
     })
} catch(error) {
    console.log(error.message);
}
}