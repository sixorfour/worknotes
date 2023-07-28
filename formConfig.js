// formConfig.js

export const formTemplates = {
    'customer': `
        <form class="callForm" data-type="customer">
            <div class="input">
                <div><input type="text" class="accountNumber" placeholder="Account Number*" required></div>
                <div><input type="text" class="phoneNumber" placeholder="Phone Number*" required></div>
                <div><input type="text" class="customerName" placeholder="Customer Name*" required></div>
                <div><input type="email" class="email" placeholder="Email*" required></div>
                <div><textarea class="notes" placeholder="Notes*" required></textarea></div>
                <button type="submit" class="submit-btn">Submit</button>
                <button type="button" class="dismiss-btn">Dismiss</button>
            </div>
            <div class="output hidden">
                <div class="output-data"></div>
                <button type="button" class="update-btn">Update</button>
                <button type="button" class="toggle-btn">Maximize</button>
                <button type="button" class="delete-btn">Delete</button>
            </div>
        </form>
    `,
    'mdu customer': `
        <form class="callForm" data-type="mdu">
            <div class="input">
                <div><input type="text" class="hoaName" placeholder="HOA/MDU Name *" required></div>
                <div><input type="text" class="siteId" placeholder="SiteID/Address *" required></div>
                <div><input type="text" class="phoneNumber" placeholder="Phone Number *" required></div>
                <div><input type="text" class="customerName" placeholder="Customer Name *" required></div>
                <div><input type="email" class="email" placeholder="Email *" required></div>
                <div><textarea class="notes" placeholder="Notes *" required></textarea></div>
                <button type="submit" class="submit-btn">Submit</button>
                <button type="button" class="dismiss-btn">Dismiss</button>
            </div>                   
            <div class="output hidden">
                <div class="output-data"></div>
                <button type="button" class="update-btn">Update</button>
                <button type="button" class="toggle-btn">Maximize</button>
                <button type="button" class="delete-btn">Delete</button>
            </div>
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

        return `MDU Customer:${hoaName} ${customerName} ${phoneNumber} ${siteId} -- ${notes}`;
    },
    // Add more form handlers here...
};
