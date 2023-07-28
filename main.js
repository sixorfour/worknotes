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
        ${formTemplates['customer']}  <!-- Show the customer form by default -->
    `;
    document.getElementById('formsContainer').appendChild(formContainer);

    var callTypeButtons = formContainer.querySelectorAll('.call-type-btn');
    callTypeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            changeCallType(button.textContent.toLowerCase(), button);
        });
    });

    formContainer.querySelector('.dismiss-btn').addEventListener('click', function() {
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
        console.log(infoContainer);
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

    // Check if the requested form type exists
    if (!formTemplates[type]) {
        console.log("Form type '" + type + "' does not exist.");
        return;
    }

    // Store the values from the old form
    var oldForm = formContainer.querySelector('.callForm');
    var oldFormData = {};
    if (oldForm) {
        var oldInputs = oldForm.querySelectorAll('input, textarea');
        oldInputs.forEach(function(input) {
            oldFormData[input.className] = input.value;
        });
        oldForm.remove();
    }

    // Append the new form
    var newForm = document.createElement('div');
    newForm.innerHTML = formTemplates[type];
    newForm.className = 'callForm';
    newForm.dataset.type = type; // Set the 'type' dataset to the new form type
    formContainer.appendChild(newForm);

    // Populate the fields in the new form with the old form data, if available
    var newInputs = newForm.querySelectorAll('input, textarea');
    newInputs.forEach(function(input) {
        if (oldFormData.hasOwnProperty(input.className)) {
            input.value = oldFormData[input.className];
        }
    });
}
