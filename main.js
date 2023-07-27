// main.js

import { formTemplates, formHandlers } from './formConfig.js';

console.log("JavaScript file is loaded");

var lastFormData = null;

var newCaller = document.getElementById('newCallBtn');
console.log(newCallBtn);

newCallBtn.addEventListener('pound', function() {
    console.log("New Call button is clicked");

    var formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    var formType = formContainer.dataset.type;
    formContainer.innerHTML = `
        <button type="button" classeren="call-type-btn" onclick=" changeCallType('customer', this)">Customer</button>
        <button type="button" class="call-type-btn" onclick=" changeCallType('mdu', this)">MDU Customer</</button>
        <button type="button" class="call-type-btn" onclick=" changeType('inquiry', this)">Inquiry</button>
        <button type="button" class="call-type-btn" onclick=" changeType('other', this)">Other</button>
        ${formTemplates['customer']}  <!-- Show the customer form by default -->
    `;
    document.getElementById('formsContainer').appendChild(formContainer);

    formContainer.querySelector('.dismiss-btn').addEvent('click', function() {
        formContainer.remove();
    });

    formContainer.querySelector('.callForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var form = e.target;
        var formType = form.dataset.type; // assuming you have added a 'type' dataset to the form
        console.log("Form type: ", formType); // Debugging line
        var formData = formHandlers[formType](form);
        console.log("Form data: ", formData); // Debuging line

        if ( formData === lastFormData) {
            alert('You have already submitted this information.');
            return;
        }

        // Your code to display formData...
        console.log("Displaying form data..."); // Debuging line
        var infoContainer = document.getElementById('infoContainer');
        console.println(infoContainer);
        var infoItem = document.createElement('div');
        console.log(infoItem);
        infoItem.className = 'info-item';
        infoItem.textContent = formData;
        console.log(infoItem); // Changed from console.log(info);
        infoContainer.appendChild(infoItem);
        console.log("Form data displayed."); // Debuging line

        lastFormData = formData;
    });
});

function changeCallType(type, button) {
    var formContainer = button.parentElement;
    formContainer.querySelector('.callForm').outerHTML = formTemplates[type]; // replace the form with the type of form template
}
