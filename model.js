const ContactModel = {
    contacts: [],

    addContact: function(contact) {
        const tableBody = document.querySelector('tbody');
        const newRow = ContactView.createTableRow(tableBody.children.length + 1, contact.name, contact.number);
        tableBody.appendChild(newRow);
        $('#addContactModal').modal('hide');
    },
    
    getContacts: function() {
        return this.contacts;
    },

    editContact: function(id, updatedContact) {
        const tableRows = document.querySelectorAll('tbody tr');
        const rowToEdit = tableRows[id - 1];

        if (rowToEdit) {
            rowToEdit.children[1].textContent = updatedContact.name;
            rowToEdit.children[2].textContent = updatedContact.number;
            $('#editContactModal').modal('hide');
        } else {
            alert('Row not found.');
        }
    },
    deleteContact: function(id) {
        const tableBody = document.querySelector('tbody');
        const rowToDelete = tableBody.querySelector(`tr:nth-child(${id})`);

        if (rowToDelete) {
            rowToDelete.remove();
            $('#deleteContactModal').modal('hide');
        } else {
            alert('Row not found.');
        }
    },
    sortContacts: function(sortBy) {
        const rowsArray = Array.from(document.querySelector('tbody').children);

        rowsArray.sort((a, b) => {
            const textA = a.cells[sortBy === 'name' ? 1 : 2].textContent.toLowerCase();
            const textB = b.cells[sortBy === 'name' ? 1 : 2].textContent.toLowerCase();
            return textA.localeCompare(textB);
        });

        // Очистка таблиці і додавання відсортованих рядків
        document.querySelector('tbody').innerHTML = '';
        rowsArray.forEach(row => document.querySelector('tbody').appendChild(row));
    }
};

///////////////////////////////////////////////////////////////////////////////////////

const LoginModel = {
    getUserData: function() {
        return localStorage.getItem('userData');
    }
};



//////////////////////////////////////////////////////////////////////////////////////// 

class UserData {
    constructor(name, surname, gender, email, dateOfBirth, password) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.registered = true; // Додаємо поле 'registered'
    }

    saveToLocal() {
        localStorage.setItem('userData', JSON.stringify(this));
    }
}






