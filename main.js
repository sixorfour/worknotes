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
        <div class="call-type-btn-container">
            <button type="button" class="call-type-btn">Customer</button>
            <button type="button" class="call-type-btn">MDU Customer</button>
            <button type="button" class="call-type-btn">Inquiry</button>
            <button type="button" class="call-type-btn">Other</button>
        </div>
        ${formTemplates['customer']}  <!-- Show the customer form by default -->
    `;
    document.getElementById('formsContainer').appendChild(formContainer);

    var callTypeButtons = formContainer.querySelectorAll('.call-type-btn');
    callTypeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            changeCallType(button.textContent.toLowerCase(), button);
        });
    });

    var callForm = formContainer.querySelector('.callForm');
    addSubmitListener(callForm);
});

function addSubmitListener(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        updateForm(form);
        toggleForm(form);

        var deleteButton = form.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            form.parentElement.remove();
        });

        var toggleButton = form.querySelector('.toggle-btn');
        toggleButton.addEventListener('click', function() {
            toggleForm(form);
        });

        var updateButton = form.querySelector('.update-btn');
        updateButton.addEventListener('click', function() {
            updateForm(form);
        });
    });
}

function updateForm(form) {
    var formType = form.dataset.type; // assuming you have added a 'type' dataset to the form
    var formData = formHandlers[formType](form);
    var outputData = form.querySelector('.output-data');
    outputData.textContent = formData;
}

function toggleForm(form) {
    var input = form.querySelector('.input');
    var output = form.querySelector('.output');
    var toggleButton = form.querySelector('.toggle-btn');
    if (input.classList.contains('hidden')) {
        input.classList.remove('hidden');
        output.classList.add('hidden');
        toggleButton.textContent = 'Maximize';
    } else {
        input.classList.add('hidden');
        output.classList.remove('hidden');
        toggleButton.textContent = 'Minimize';
    }
}

function changeCallType(type, button) {
    var formContainer = button.parentElement.parentElement;

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
    var newForm = document.createElement('form');
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

    var dismissButton = newForm.querySelector('.dismiss-btn');
    dismissButton.addEventListener('click', function() {
        formContainer.remove();
    });

    addSubmitListener(newForm);
}
