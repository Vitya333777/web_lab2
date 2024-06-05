const ContactController = {
    init: function() {
        const addContactForm = document.getElementById('addContactForm');
        const editContactForm = document.getElementById('editContactForm');
        const applySortingBtn = document.getElementById('applySortingBtn');
        const deleteBtn = document.getElementById('confirmDeleteBtn');
        const tableBody = document.querySelector('tbody');
        const editIdInput = document.getElementById('editId');
        const editNameInput = document.getElementById('editName');
        const editNumberInput = document.getElementById('editNumber');
        

        addContactForm.addEventListener('submit', ContactController.handleAddContact);
        editContactForm.addEventListener('submit', ContactController.handleEditContact);
        applySortingBtn.addEventListener('click', ContactController.handleSortContacts);
        deleteBtn.addEventListener('click', ContactController.handleDeleteContact);
        tableBody.addEventListener('click', ContactController.handleRowClick);
    },
  
    handleAddContact: function(event) {
        event.preventDefault();
    
        const name = document.getElementById('inputName').value;
        const number = document.getElementById('inputNumber').value;
    
        if (name && number) {
            const newContact = { name, number };
            ContactModel.addContact(newContact);
            ContactView.displayContacts(ContactModel.getContacts());
            $('#addContactModal').modal('hide');
        } else {
            alert('Invalid data.');
        }
    },

    
    handleEditContact: function(event) {
        event.preventDefault();
        const id = parseInt(document.getElementById('editId').value);
        const name = document.getElementById('editName').value;
        const number = document.getElementById('editNumber').value;
        if (id && name && number) {
            ContactModel.editContact(id, { name, number });
        } else {
            alert('Invalid data.');
        }
    },
    handleSortContacts: function() {
        const criteria = document.querySelector('input[name="sortingCriteria"]:checked');
        if (criteria) {
            const sortBy = criteria.value;
            ContactModel.sortContacts(sortBy);
        } else {
            alert('Please select a sorting criteria.');
        }
    },
    handleDeleteContact: function() {
        const id = parseInt(document.getElementById('deleteId').value);
        if (id) {
            ContactModel.deleteContact(id);
        } else {
            alert('Please enter an ID to delete.');
        }
    },
    handleRowClick: function(event) {
        const rowIndex = event.target.closest('tr').rowIndex - 1;
    }
};

ContactController.init();

/////////////////////////////////////////////////////////////////////////////////////


