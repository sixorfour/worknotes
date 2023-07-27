// main.js

import { formTemplates, formHandlers } from './formConfig.js';

console.log("JavaScript file is loaded");

var lastFormData = null;

var newCallBtn = document.getElementById('newCallBtn');
console.log(newCallBtn);

newCallBtn.addEventListener('click', function() {
    console.log("New Call button is clicked");

    var formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    formContainer.innerHTML = `
        <button type="button" class="call-type-btn">Customer</button>
        <button type="button" class="call-type-btn">MDU Customer</button>
        <button type="button" class="call-type-btn">Inquiry</button>
        <button type="button" class="call-type-btn">Other</button>
    `;
    document.getElementById('formsContainer').appendChild(formContainer);

    var buttons = formContainer.getElementsByClassName('call-type-btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e) {
            changeCallType(e.target.textContent.toLowerCase(), e.target);
        });
    }

    // Load the 'customer' form by default
    changeCallType('customer', buttons[0]);

    formContainer.querySelector('.dismiss-btn').addEventListener('click', function() {
        formContainer.remove();
    });
});

function changeCallType(type, button) {
    var formContainer = button.parentElement;

    // Check if the requested form type exists
    if (!formTemplates[type]) {
        console.log("Form type '" + type + "' does not exist.");
        return;
    }

    // Remove any existing form before appending a new one
    var oldForm = formContainer.querySelector('.callForm');
    if (oldForm) {
        oldForm.remove();
    }

    // Append the new form
    var newForm = document.createElement('form');
    newForm.className = 'callForm';
    newForm.dataset.type = type;
    newForm.innerHTML = formTemplates[type];
    formContainer.appendChild(newForm);

    newForm.querySelector('.dismiss-btn').addEventListener('click', function() {
        formContainer.remove();
    });

    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var form = e.target;
        var formType = form.dataset.type;
        console.log("Form type: ", formType);
        var formData = formHandlers[formType](form);
        console.log("Form data: ", formData);

        if (formData === lastFormData) {
            alert('You have already submitted this information.');
            return;
        }

        console.log("Displaying form data...");
        var infoContainer = document.getElementById('infoContainer');
        console.log(infoContainer);
        var infoItem = document.createElement('div');
        console.log(infoItem);
        infoItem.className = 'info-item';
        infoItem.textContent = formData;
        console.log(infoItem);
        infoContainer.appendChild(infoItem);
        console.log("Form data displayed.");

        lastFormData = formData;
    });
}
