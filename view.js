const ContactView = {
    createTableRow: function(index, name, number) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${index}</td>
            <td>${name}</td>
            <td>${number}</td>
        `;
        return newRow;
    },
    displayContacts: function(contacts) {
        const tableBody = document.querySelector('tbody');
        contacts.forEach((contact, index) => {
            const newRow = ContactView.createTableRow(index + 1, contact.name, contact.number);
            tableBody.appendChild(newRow);
        });
    },
    
    getFormData: function(form) {
        const formData = new FormData(form);
        const name = formData.get('name');
        const number = formData.get('number');
        return { name, number };
    },
    showEditModal: function(contact) {
        const editIdInput = document.getElementById('editId');
        const editNameInput = document.getElementById('editName');
        const editNumberInput = document.getElementById('editNumber');

        editIdInput.value = contact.id;
        editNameInput.value = contact.name;
        editNumberInput.value = contact.number;

        $('#editContactModal').modal('show');
    }
};

//////////////////////////////////////////////////////////////////////////////////////




document.addEventListener('DOMContentLoaded', () => {
    const profileTable = document.querySelector('.table-bordered');

    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        const nameCell = profileTable.querySelector('tr:nth-child(1) td:nth-child(2)');
        const surnameCell = profileTable.querySelector('tr:nth-child(2) td:nth-child(2)');
        const emailCell = profileTable.querySelector('tr:nth-child(3) td:nth-child(2)');
        const genderCell = profileTable.querySelector('tr:nth-child(4) td:nth-child(2)');
        const dateOfBirthCell = profileTable.querySelector('tr:nth-child(5) td:nth-child(2)');

        nameCell.textContent = userData.name;
        surnameCell.textContent = userData.surname;
        emailCell.textContent = userData.email;
        genderCell.textContent = userData.gender === 'male' ? 'Male' : 'Female';
        dateOfBirthCell.textContent = userData.dateOfBirth;
    } else {
        console.log('User data not found. Please log in or sign up first.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Обробка форми реєстрації
    const registerForm = document.querySelector('.needs-validation');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (registerForm.checkValidity()) {
                const inputName = document.getElementById('inputName').value;
                const inputSurname = document.getElementById('inputSurname').value;
                const inputEmail = document.getElementById('registerEmail').value;
                const inputPassword = document.getElementById('registerPassword').value;
                const gender = document.querySelector('input[name="gender"]:checked');
                const inputDay = document.getElementById('inputDay').value;
                const inputMonth = document.getElementById('inputMonth').value;
                const inputYear = document.getElementById('inputYear').value;

                if (!gender) {
                    alert('Виберіть стать');
                    return;
                }

                const dateOfBirth = `${inputYear}-${inputMonth}-${inputDay}`;

                const userData = {
                    name: inputName,
                    surname: inputSurname,
                    gender: gender.id,
                    email: inputEmail,
                    dateOfBirth: dateOfBirth,
                    password: inputPassword,
                    registered: true
                };

                localStorage.setItem('userData', JSON.stringify(userData));
                alert('Успішно зареєстровано✅');

                // Переадресація після успішної реєстрації
                window.location.href = 'index.html';
            }

            registerForm.classList.add('was-validated');
        });
    }

    // Обробка форми входу
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const inputEmail = document.getElementById('loginEmail').value;
            const inputPassword = document.getElementById('loginPassword').value;

            const storedUserData = localStorage.getItem('userData');

            if (storedUserData) {
                const userData = JSON.parse(storedUserData);

                if (userData.registered && inputEmail === userData.email && inputPassword === userData.password) {
                    alert('Успішний вхід в акаунт✅');
                    window.location.href = 'index.html';
                } else {
                    alert('Неправильний логін чи пароль. Спробуйте ще раз.');
                }
            } else {
                alert('Користувач не знайдений, зареєструйтесь.');
            }
        });
    }
});

