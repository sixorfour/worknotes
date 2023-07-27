var formTemplates = {
    'customer': `
        <form class="callForm">
            <input type="text" class="accountNumber" placeholder="Account Number" required> *required
            <input type="text" class="phoneNumber" placeholder="Phone Number"> **pick one
            <input type="text" class="customerName" placeholder="Customer Name" required> *required
            <input type="email" class="emailAddress" placeholder="Email Address"> **pick one
            <textarea class="notes" placeholder="Notes" required></textarea> *required
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="dismiss-btn">Dismiss</button>
        </form>
    `,
    'mdu': `
        <form class="callForm">
            <input type="text" class="hoaName" placeholder="HOA/MDU Name" required> *required
            <input type="text" class="siteId" placeholder="SiteID/Address" required> *required
            <input type="text" class="phoneNumber" placeholder="Phone Number"> **pick one
            <input type="text" class="customerName" placeholder="Customer Name" required> *required
            <input type="email" class="emailAddress" placeholder="Email Address"> **pick one
            <textarea class="notes" placeholder="Notes" required></textarea> *required
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="dismiss-btn">Dismiss</button>
        </form>
    `,
    // Add more form templates for other call types
};

var lastFormData = null;

document.getElementById('newCallBtn').addEventListener('click', function() {
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
        var accountNumber = formContainer.querySelector('.accountNumber')?.value;
        var phoneNumber = formContainer.querySelector('.phoneNumber')?.value;
        var customerName = formContainer.querySelector('.customerName')?.value;
        var emailAddress = formContainer.querySelector('.emailAddress')?.value;
        var notes = formContainer.querySelector('.notes')?.value;
        var hoaName = formContainer.querySelector('.hoaName')?.value;
        var siteId = formContainer.querySelector('.siteId')?.value;

        var currentFormData = accountNumber + phoneNumber + customerName + emailAddress + notes + hoaName + siteId;

        if (currentFormData === lastFormData) {
            alert('You have already submitted this information.');
            return;
        }

        if (accountNumber && !/^[123]\d{3,4}$/.test(accountNumber)) {
            alert('Account number must be 4 or 5 digits long and start with 1, 2, or 3.');
            return;
        }

        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (phoneNumber.startsWith('1')) {
            phoneNumber = phoneNumber.substring(1);
        }

        if (phoneNumber.length !== 10) {
            alert('Phone number must be 10 digits long and not start with 1.');
            return;
        }

        if ((phoneNumber !== '' && emailAddress !== '') || (phoneNumber === '' && emailAddress === '')) {
            alert('Please fill either Phone Number or Email Address, not both or none.');
            return;
        }

        var infoContainer = document.getElementById('infoContainer');
        var infoItem = document.createElement('div');
        infoItem.className = 'info-item';
        if (accountNumber !== '') {
            infoItem.textContent = `${accountNumber}:${phoneNumber || emailAddress} ${customerName} -- ${notes}`;
        } else {
            infoItem.textContent = `MDU Customer:${phoneNumber || emailAddress} ${customerName} ${hoaName} ${siteId} -- ${notes}`;
        }
        infoContainer.appendChild(infoItem);
        lastFormData = currentFormData;
    });
});

function changeCallType(type, button) {
    var formContainer = button.parentElement;
    var oldForm = formContainer.querySelector('.callForm');
    var newForm = document.createElement('div');
    newForm.innerHTML = formTemplates[type];
    newForm = newForm.firstElementChild;
    formContainer.replaceChild(newForm, oldForm);

    // Reattach event listeners to the new form
    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var accountNumber = newForm.querySelector('.accountNumber')?.value;
        var phoneNumber = newForm.querySelector('.phoneNumber')?.value;
        var customerName = newForm.querySelector('.customerName')?.value;
        var emailAddress = newForm.querySelector('.emailAddress')?.value;
        var notes = newForm.querySelector('.notes')?.value;
        var hoaName = newForm.querySelector('.hoaName')?.value;
        var siteId = newForm.querySelector('.siteId')?.value;

        var currentFormData = accountNumber + phoneNumber + customerName + emailAddress + notes + hoaName + siteId;

        if (currentFormData === lastFormData) {
            alert('You have already submitted this information.');
            return;
        }

        if (accountNumber && !/^[123]\d{3,4}$/.test(accountNumber)) {
            alert('Account number must be 4 or 5 digits long and start with 1, 2, or 3.');
            return;
        }

        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (phoneNumber.startsWith('1')) {
            phoneNumber = phoneNumber.substring(1);
        }

        if (phoneNumber.length !== 10) {
            alert('Phone number must be 10 digits long and not start with 1.');
            return;
        }

        if ((phoneNumber !== '' && emailAddress !== '') || (phoneNumber === '' && emailAddress === '')) {
            alert('Please fill either Phone Number or Email Address, not both or none.');
            return;
        }

        var infoContainer = document.getElementById('infoContainer');
        var infoItem = document.createElement('div');
        infoItem.className = 'info-item';
        if (accountNumber !== '') {
            infoItem.textContent = `${accountNumber}:${phoneNumber || emailAddress} ${customerName} -- ${notes}`;
        } else {
            infoItem.textContent = `MDU Customer:${phoneNumber || emailAddress} ${customerName} ${hoaName} ${siteId} -- ${notes}`;
        }
        infoContainer.appendChild(infoItem);
        lastFormData = currentFormData;
    });
}

