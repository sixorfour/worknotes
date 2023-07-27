console.log("JavaScript file is loaded");

var formTemplates = {
    'customer': `
        <form class="callForm" data-type="customer">
            <input type="text" class="accountNumber" placeholder="Account Number" required> *required
            <input type="text" class="phoneNumber" placeholder="Phone" required> *required
            <input type="text" class="customerName" placeholder="Customer Name" required> *required
            <input type="email" class="email" placeholder="Email" required> *required
            <textarea class="notes" placeholder="Notes" required></textarea> *required
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="dismiss-btn">Dismiss</button>
        </form>
    `,
    'mdu': `
        <form class="callForm" data-type="mdu">
            <input type="text" class="hoaName" placeholder="HOA/MDU Name" required> *required
            <input type="text" class="siteId" placeholder="SiteID/Address" required> *required
            <input type="text" class="phoneNumber" placeholder="Phone" required> *required
            <input type="text" class="customerName" placeholder="Customer Name" required> *required
            <input type="email" class="email" placeholder="Email" required> *required
            <textarea class="notes" placeholder="Notes" required></textarea> *required
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="dismiss-btn">Dismiss</button>
        </form>
    `,
    // Add more form templates for other call types
};

var formHandlers = {
    'customer': function(form) {
        var accountNumber = form.querySelector('.accountNumber').value;
        var phoneNumber = form.querySelector('.phoneNumber').value;
        var customerName = form.querySelector('.customerName').value;
        var email = form.querySelector('.email').value;
        var notes = form.querySelector('.notes').value;

        // Your validation code here...

        return `${accountNumber}:${phoneNumber} ${customerName} -- ${notes}`;
    },
    'mdu': function(form) {
        var phoneNumber = form.querySelector('.phoneNumber').value;
        var customerName = form.querySelector('.customerName').value;
        var email = form.querySelector('.email').value;
        var notes = form.querySelector('.notes').value;
        var hoaName = form.querySelector('.hoaName').value;
        var siteId = form.querySelector('.siteId').value;

        // Your validation code here...

        return `MDU Customer:${phoneNumber} ${customerName} ${hoaName} ${siteId} -- ${notes}`;
    },
    // Add more form handlers here...
};

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
        var formData = formHandlers[formType](form);

        if (formData === lastFormData) {
            alert('You have already submitted this information.');
            return;
        }

        // Your code to display formData...

        lastFormData = formData;
    });
});

function changeCallType(type, button) {
    var formContainer = button.parentElement;
    formContainer.querySelector('.callForm').outerHTML = formTemplates[type]; // replace the form with the selected form template
}
