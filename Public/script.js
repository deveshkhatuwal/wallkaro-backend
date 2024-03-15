document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch user list
        const users = await fetchUsers();
        displayUsers(users);

        // Fetch category list
        const categories = await fetchCategories();
        displayCategories(categories);
    } catch (error) {
        console.error('Error:', error);
    }
});

async function fetchUsers() {
    const response = await fetch('/author/list');
    return response.json();
}

async function fetchCategories() {
    const response = await fetch('/category/list');
    return response.json();
}

function displayUsers(users) {
    const userListContainer = document.getElementById('userListContainer');
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.username;
        userListContainer.appendChild(listItem);
    });
}

function displayCategories(categories) {
    const categoryListContainer = document.getElementById('categoryListContainer');
    categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.textContent = category.name;
        categoryListContainer.appendChild(listItem);
    });
}
