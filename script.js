document.getElementById('newCallBtn').addEventListener('click', function() {
    var formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    formContainer.innerHTML = `
        <button class="call-type-btn" onclick="changeCallType('customer', this)">Customer</button>
        <button class="call-type-btn" onclick="changeCallType('mdu', this)">MDU Customer</button>
        <button class="call-type-btn" onclick="changeCallType('inquiry', this)">Inquiry</button>
        <button class="call-type-btn" onclick="changeCallType('other', this)">Other</button>
        <form>
            <div class="customer-fields">
                <label>Account Number*:</label><input type="text" class="account-number" required pattern="^[1-3][0-9]{3,4}$">
                <label>Phone Number**:</label><input type="text" class="phone-number">
                <label>Email Address**:</label><input type="text" class="email-address">
            </div>
            <div class="mdu-fields hidden">
                <label>HOA/MDU Name*:</label><input type="text" class="hoa-name" required>
                <label>SiteID/Address*:</label><input type="text" class="siteid-address" required>
            </div>
            <label>Customer Name*:</label><input type="text" class="customer-name" required>
            <label>Notes*:</label><textarea class="notes" required></textarea>
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="dismiss-btn" onclick="this.parentNode.parentNode.remove()">Dismiss</button>
        </form>
        <div class="error"></div>
    `;
    document.getElementById('formsContainer').appendChild(formContainer);
});

function changeCallType(type, button) {
    var formContainer = button.parentElement;
    var accountNumberField = formContainer.querySelector('.accountNumber');
    var hoaNameField = formContainer.querySelector('.hoaName');
    var siteIdField = formContainer.querySelector('.siteId');

    if (type === 'mdu') {
        accountNumberField.classList.add('hidden');
        hoaNameField.classList.remove('hidden');
        siteIdField.classList.remove('hidden');
        accountNumberField.removeAttribute('required');
        hoaNameField.required = true;
        siteIdField.required = true;
    } else {
        accountNumberField.classList.remove('hidden');
        hoaNameField.classList.add('hidden');
        siteIdField.classList.add('hidden');
        accountNumberField.required = true;
        hoaNameField.removeAttribute('required');
        siteIdField.removeAttribute('required');
    }
}

    // Add similar conditions for 'inquiry' and 'other' when their fields are defined


document.addEventListener('submit', function(e) {
    e.preventDefault();
    var form = e.target;
    var formData = new FormData(form);
    var data = Object.fromEntries(formData);
    if ((data['phone-number'] && data['email-address']) || (!data['phone-number'] && !data['email-address'])) {
        form.parentNode.querySelector('.error').textContent = 'Please fill either Phone Number or Email Address, not both or none.';
        return;
    }
    var infoContainer = document.getElementById('infoContainer');
    var infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    var callType = form.parentNode.querySelector('.call-type-btn:not(.hidden)').textContent;
    if (callType === 'Customer') {
        infoItem.textContent = `${data['account-number']}:${data['phone-number'] || data['email-address']} ${data['customer-name']} -- ${data['notes']}`;
    } else if (callType === 'MDU Customer') {
        infoItem.textContent = `MDU Customer:${data['phone-number'] || data['email-address']} ${data['customer-name']} ${data['hoa-name']} ${data['siteid-address']} -- ${data['notes']}`;
    }
    // Add similar conditions for 'Inquiry' and 'Other' when their display format is defined
    infoContainer.appendChild(infoItem);
});
