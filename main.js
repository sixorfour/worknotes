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
        <button type="button" class="call-type-btn" onclick="changeCallType('customer', this)">Customer</button>
        <button type="button" class="call-type-btn" onclick="changeCallType('mdu', this)">MDU Customer</button>
        <button type="button" class="call-type-btn" onclick="changeCallType('inquiry', this)">Inquiry</button>
        <button type="button" class="call-type-btn" onclick="changeCallType('other', this)">Other</button>
        ${formTemplates['customer']} <!-- Show the customer form by default -->
    `;
    document.getElementById('formsContainer').appendChild(formContainer);

    formContainer.querySelector('.dismiss-btn').addEventListener('click', function() {
        formContainer.remove();
    });

    formContainer.querySelector('.callForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var form = e.target;
        var formType = form.dataset.type; // assuming you have added a 'type' dataset to the form
        console.log("Form type: ", formType); // Debugging line
        var formData = formHandlers[formType](form);
        console.log("Form data: ", formData); // Debugging line

        if (formData === lastFormData) {
            alert('You have already submitted this information.');
            return;
        }

        // Your code to display formData...
        console.log("Displaying form data..."); // Debugging line
        var infoContainer = document.getElementById('infoContainer');
        console.log(infoContainer);
        var infoItem = document.createElement('div');
        console.log(infoItem);
        infoItem.className = 'info-item';
        infoItem.textContent = formData;
        console.log(info);
        infoContainer.appendChild(infoItem);
        console.log("Form data displayed."); // Debugging line

        lastFormData = formData;
    });
});

function changeCallType(type, button) {
    var formContainer = button.parentElement;
    formContainer.querySelector('.'.callForm).outerHTML = formTemplates[type]; // replace the form with the selected form template
}
