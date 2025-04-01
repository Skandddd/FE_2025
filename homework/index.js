document.addEventListener("DOMContentLoaded", async () => {
    const contactList = document.getElementById("contact-list");
    const contactEdit = document.getElementById("contact-edit");
    const editName = document.getElementById("edit-name");
    const editUsername = document.getElementById("edit-username");
    const editPhone = document.getElementById("edit-phone");
    const editWebsite = document.getElementById("edit-website");
    const editEmail = document.getElementById("edit-email");
    const saveBtn = document.getElementById("save-btn");
    let editingContact = null;

    async function fetchContacts() {
        try {
            showLoader();
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) throw new Error("Ошибка загрузки данных");
            const contacts = await response.json();
            renderContacts(contacts);
        } catch (error) {
            alert("Ошибка загрузки контактов");
        } finally {
            hideLoader();
        }
    }

    function renderContacts(contacts) {
        contactList.innerHTML = "";
        contacts.forEach(contact => {
            const li = document.createElement("li");
            li.classList.add("contact");
            li.setAttribute("data-id", contact.id);

            li.innerHTML = `
                <div class="contact-info">
                    <p class="name">${contact.name}</p>
                    <p class="username">${contact.username}</p>
                </div>
                <div class="buttons">
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                </div>
                <ul class="details hidden">
                    <li><strong>Phone:</strong> ${contact.phone}</li>
                    <li><strong>Website:</strong> <a href="https://${contact.website}" target="_blank">${contact.website}</a></li>
                    <li><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></li>
                </ul>
            `;

            li.querySelector(".edit-btn").addEventListener("click", () => handleEdit(contact));
            li.querySelector(".delete-btn").addEventListener("click", () => handleDelete(contact.id, li));
            contactList.appendChild(li);
        });
    }

    function handleEdit(contact) {
        editingContact = contact;
        editName.value = contact.name;
        editUsername.value = contact.username;
        editPhone.value = contact.phone;
        editWebsite.value = contact.website;
        editEmail.value = contact.email;
        contactEdit.classList.remove("hidden");
    }

    async function handleDelete(id, element) {
        if (!navigator.onLine) {
            alert("Нет соединения с интернетом");
            return;
        }
        try {
            showLoader();
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                element.remove();
            } else {
                throw new Error("Ошибка удаления");
            }
        } catch (error) {
            alert("Не удалось удалить контакт");
        } finally {
            hideLoader();
        }
    }

    saveBtn.addEventListener("click", async () => {
        if (!editingContact || !navigator.onLine) {
            alert("Нет соединения с интернетом");
            return;
        }
        try {
            showLoader();
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editingContact.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editName.value,
                    username: editUsername.value,
                    phone: editPhone.value,
                    website: editWebsite.value,
                    email: editEmail.value
                })
            });
            if (response.ok) {
                contactEdit.classList.add("hidden");
                fetchContacts();
            } else {
                throw new Error("Ошибка изменения данных");
            }
        } catch (error) {
            alert("Не удалось обновить контакт");
        } finally {
            hideLoader();
        }
    });

    function showLoader() {
        document.body.insertAdjacentHTML("beforeend", "<div id='loader' class='loader'></div>");
    }

    function hideLoader() {
        const loader = document.getElementById("loader");
        if (loader) loader.remove();
    }

    fetchContacts();
});
