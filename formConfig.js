// formConfig.js

export const formTemplates = {
    'customer': `
        <form class="callForm" data-type="customer">
            <input type="text" class="accountNumber" placeholder="Account Number" required> *required
            ...
        </form>
    `,
    'mdu': `
        <form class callForm data-type="mdu">
            <input type="text" class="hoaName" placeholder="HOA/MDU Name" required> *required
            ...
        </form>
    `,
    // Add more form templates for other call types
};

export const formHandlers = {
    'customer': function(form) {
        ...
    },
    'mdu': function(form) {
        ...
    },
    // Add more form handlers here...
};

