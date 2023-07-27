// formConfig.js

export const formTemplates = {
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
    'mdu customer': `
        <form class="callForm" data-type="mdu">
            <input type="text" class="hoaName" placeholder="HOA/MDU Name" required> *required
            <input type="text" class="siteId" placeholder="SiteID/Address" required> *required
            <input type="text" class="phoneNumber" placeholder="Phone" required> *required
            <input type="text" class="customerName" placeholder="Customer Name" required> *required
            <input type="email" class="email" placeholder="Email" required> *, required
            <textarea class="notes" placeholder="Notes" required></textarea> *required
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="dismiss-btn">Dismiss</button>
        </form>
    `,
    // Add more form templates here...
};

export const formHandlers = {
    'customer': function(form) {
        var accountNumber = form.querySelector('.accountNumber').value;
        var phoneNumber = form.querySelector('.phoneNumber').value;
        var customerName = form.querySelector('.customerName').value;
        var email = form.querySelector('.email').value;
        var notes = form.querySelector('.notes').value;

        // Your validation code here...

        return `${accountNumber}:${phoneNumber} ${customerName} -- ${notes}`;
    },
    'mdu customer': function(form) {
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
