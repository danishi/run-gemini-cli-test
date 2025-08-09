document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');

    let items = JSON.parse(localStorage.getItem('items')) || [];

    function saveItems() {
        localStorage.setItem('items', JSON.stringify(items));
    }

    function renderItems() {
        itemList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span contenteditable="true">${item}</span>
                <button class="delete-btn" data-index="${index}">削除</button>
            `;
            itemList.appendChild(li);

            li.querySelector('span').addEventListener('blur', (e) => {
                updateItem(index, e.target.textContent);
            });
        });
    }

    function addItem(item) {
        items.push(item);
        saveItems();
        renderItems();
    }

    function updateItem(index, newItem) {
        items[index] = newItem;
        saveItems();
    }

    function deleteItem(index) {
        items.splice(index, 1);
        saveItems();
        renderItems();
    }

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (itemInput.value.trim() !== '') {
            addItem(itemInput.value.trim());
            itemInput.value = '';
        }
    });

    itemList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            deleteItem(index);
        }
    });

    renderItems();
});
