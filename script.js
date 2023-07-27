var lastFormData = null;

document.getElementById('newCallBtn').addEventListener('click', function() {
    var formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    formContainer.innerHTML = `
        <form class="callForm">
            <input type="text" class="accountNumber" placeholder="Account Number" required> *required
            <input type="text" class="hoaName hidden" placeholder="HOA/MDU Name" required> *required
            <input type="text" class="siteId hidden" placeholder="SiteID/Address" required> *required
            <button type="button" class="call-type-btn" onclick="changeCallType('customer', this)">Customer</button>
            <button type="button" class="call-type-btn" onclick="changeCallType('mdu', this)">MDU Customer</button>
            <button type="button" class="call-type-btn" onclick="changeCallType('inquiry', this)">Inquiry</button>
            <button type="button" class="call-type-btn" onclick="changeCallType('other', this)">Other</button><br>
            <input type="text" class="phoneNumber" placeholder="Phone Number"> **pick one<br>
            <input type="text" class="customerName" placeholder="Customer Name" required> *required<br>
            <input type="email" class="emailAddress" placeholder="Email Address"> **pick one<br>
            <textarea class="notes" placeholder="Notes" required></textarea> *required<br>
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="dismiss-btn">Dismiss</button>
        </form>
    `;
    document.getElementById('formsContainer').appendChild(formContainer);

    formContainer.querySelector('.dismiss-btn').addEventListener('click', function() {
        formContainer.remove();
    });

    formContainer.querySelector('.callForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var accountNumber = formContainer.querySelector('.accountNumber').value;
        var phoneNumber = formContainer.querySelector('.phoneNumber').value;
        var customerName = formContainer.querySelector('.customerName').value;
        var emailAddress = formContainer.querySelector('.emailAddress').value;
        var notes = formContainer.querySelector('.notes').value;
        var hoaName = formContainer.querySelector('.hoaName').value;
        var siteId = formContainer.querySelector('.siteId').value;

        var currentFormData = accountNumber + phoneNumber + customerName + emailAddress + notes + hoaName + siteId;

        if (currentFormData === lastFormData) {
            alert('You have already submitted this information.');
            return;
        }

        if (!accountNumberField.classList.contains('hidden') && !/^[123]\d{3,4}$/.test(accountNumber)) {
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
    var accountNumberField = formContainer.querySelector('.accountNumber');
    var hoaNameField = formContainer.querySelector('.hoaName');
    var siteIdField = formContainer.querySelector('.siteId');

    if (type === 'mdu') {
        accountNumberField.classList.add('hidden');
        accountNumberField.disabled = true;
        hoaNameField.classList.remove('hidden');
        hoaNameField.disabled = false;
        siteIdField.classList.remove('hidden');
        siteIdField.disabled = false;
    } else {
        accountNumberField.classList.remove('hidden');
        accountNumberField.disabled = false;
        hoaNameField.classList.add('hidden');
        hoaNameField.disabled = true;
        siteIdField.classList.add('hidden');
        siteIdField.disabled = true;
    }
}


