document.addEventListener("DOMContentLoaded", () => {
    const contacts = [
        { id: 1, name: "Ervin Howell", username: "@Antonette", phone: "024-648-3804", website: "ambrose.net", email: "Rey.Padberg@karina.biz" },
        { id: 2, name: "Clementine Bauch", username: "@Samantha", phone: "1-477-935-8478", website: "ola.org", email: "Karley_Dach@jasper.info" },
        { id: 3, name: "Patricia Lebsack", username: "@Karianne", phone: "1-770-736-8031", website: "kale.biz", email: "Julianne.OConner@kale.biz" },
    ];

    const contactList = document.getElementById("contact-list");
    const contactEdit = document.getElementById("contact-edit");
    const editName = document.getElementById("edit-name");
    const editUsername = document.getElementById("edit-username");
    const editPhone = document.getElementById("edit-phone");
    const editWebsite = document.getElementById("edit-website");
    const editEmail = document.getElementById("edit-email");
    const saveBtn = document.getElementById("save-btn");

    let editingContact = null;

    function renderContacts() {
        contactList.innerHTML = "";
        contacts.forEach(contact => {
            const contactDiv = document.createElement("div");
            contactDiv.classList.add("contact");
            contactDiv.setAttribute("data-id", contact.id);

            contactDiv.innerHTML = `
                <div class="contact-info">
                    <p class="name">${contact.name}</p>
                    <p class="username">${contact.username}</p>
                </div>
                <div class="buttons">
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                </div>
                <div class="details">
                    <p><strong>Phone:</strong> ${contact.phone}</p>
                    <p><strong>Website:</strong> <a href="https://${contact.website}" target="_blank">${contact.website}</a></p>
                    <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
                </div>
            `;

            contactDiv.querySelector(".edit-btn").addEventListener("click", () => {
                editingContact = contact;
                editName.value = contact.name;
                editUsername.value = contact.username;
                editPhone.value = contact.phone;
                editWebsite.value = contact.website;
                editEmail.value = contact.email;
                contactEdit.classList.add("active");
            });

            contactDiv.querySelector(".delete-btn").addEventListener("click", () => {
                const index = contacts.findIndex(c => c.id === contact.id);
                contacts.splice(index, 1);
                renderContacts();
            });

            contactList.appendChild(contactDiv);
        });
    }

    saveBtn.addEventListener("click", () => {
        if (editingContact) {
            editingContact.name = editName.value;
            editingContact.username = editUsername.value;
            editingContact.phone = editPhone.value;
            editingContact.website = editWebsite.value;
            editingContact.email = editEmail.value;
            contactEdit.classList.remove("active");
            renderContacts();
        }
    });

    renderContacts();
});
