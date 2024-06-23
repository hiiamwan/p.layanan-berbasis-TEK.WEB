const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filterTodo = document.querySelector('#filter-input');
const todoList = document.querySelector('#todo-list');
const clearButton = document.querySelector('#clear-todos');

function getTodoLocalStorage () {
    let todos;

    if(localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}

document.addEventListener('DOMContentLoaded', function() {
    let todos = getTodoLocalStorage();

    todos.forEach((todo) => {
        createElementLi(todo);
    });
})

function addTodoLocalStorage (todoValue) {
    let todos = getTodoLocalStorage();

    todos.push(todoValue);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodoLocalStorage (deletedElement) {
    todos = getTodoLocalStorage();

    todos.forEach((todo, index) => {
        if(deletedElement.firstChild.textContent == todo){
            todos.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function clearTodoLoacalStorage (todoList) {
    let todos = getTodoLocalStorage();

    todos.forEach((todo) => {
        todos.splice(0, todos.length)
    });

    localStorage.setItem('todos', JSON.stringify(todos));

}

function createElementLi(inputUser) {
    const li = document.createElement('li');

    li.className = "list-group-item d-flex justify-content-between align-items-center mb-1 todos";
    li.innerHTML = inputUser;

    const a = document.createElement('a');
    a.className = "badge badge-danger delete-todo";
    a.href = '#';
    a.innerHTML = 'Delete';

    li.appendChild(a);

    todoList.appendChild(li);
}

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if(todoInput.value  && todoInput.value != ' ') {
        createElementLi(todoInput.value);
        addTodoLocalStorage(todoInput.value);
        todoInput.value = '';
    } else {
        alert('input Tidak boleh kosong');
        todoInput.value = '';
    }
})

todoList.addEventListener('click', function(event) {
    event.preventDefault();

    if(event.target.classList.contains('delete-todo')) {
        if(confirm("Apakah Anda Yakin Ingin Menghapus??")) {
            const parent = event.target.parentElement;

            parent.remove();
            deleteTodoLocalStorage(parent);
        }
    }
})

clearButton.addEventListener('click', function(event) {
    event.preventDefault();
    if(confirm('Apakah Anda Yakin Ingin Menghapus Semua Todo??')) {
        todoList.innerHTML = '';
        clearTodoLoacalStorage(todoList);
    }  
})

filterTodo.addEventListener('keyup', function(event) {
    event.preventDefault();

    const todos = document.querySelectorAll('.todos');

    const filterText = event.target.value.toLowerCase();

    todos.forEach((item) => {
        const todoValue = item.firstChild.textContent.toLowerCase();

        if(todoValue.indexOf(filterText) != -1) {
            item.setAttribute('style', 'display: block;');
        } else {
            item.setAttribute('style', 'display: none !important;');
        }
    }) 
})




