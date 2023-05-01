let duroListTasks = JSON.parse(localStorage.getItem('todo') || '[]');

const duroListAddTask = () => {
    let taskName = document.getElementById('addTask').value;

    if (addTask.value !== '') {
        duroListTasks.push({
            ...{
                title: taskName,
                status: 'Pending',
            },
        });

        localStorage.setItem('todo', JSON.stringify(duroListTasks));

        let newTaskKey = duroListTasks.length - 1;
        let newTaskData = duroListTasks[newTaskKey];

        let todoListCard = document.createElement('div');
        todoListCard.id = 'todoListCard-' + newTaskKey;
        todoListCard.className = 'todoListCard';
        todoListCard.innerText = newTaskData.title;
        todoListCard.addEventListener('click', () => {
            todoListRemoveTask(newTaskKey);
        });
        document.getElementById('todoListTasks').appendChild(todoListCard);
    }
    document.getElementById('addTask').value = '';
};

const todoListRemoveTask = (taskKey) => {
    duroListTasks.map((_data, key) => {
        if (key === taskKey) {
            duroListTasks[key].status = 'Done';
            localStorage.setItem('todo', JSON.stringify(duroListTasks));

            let todoListCard = document.getElementById('todoListCard-' + key);
            if (todoListCard) {
                todoListCard.remove();
            }
        }
    });
};

const todoListDisplayTasks = () => {
    let todoListTasks = document.getElementById('todoListTasks');
    let lastChild = null;

    if (duroListTasks.length !== 0) {
        duroListTasks.forEach((data, key) => {
            if (data.status !== 'Done') {
                let todoListCard = document.getElementById(
                    'todoListCard-' + key
                );

                if (!todoListCard) {
                    todoListCard = document.createElement('div');
                    todoListCard.id = 'todoListCard-' + key;
                    todoListCard.className = 'todoListCard';
                    todoListCard.innerText = data.title;
                    todoListCard.addEventListener('click', () => {
                        todoListRemoveTask(key);
                    });
                    todoListTasks.append(todoListCard);
                } else {
                    let cardText = todoListCard.innerText;
                    if (cardText !== data.title) {
                        todoListCard.innerText = data.title;
                    }
                }

                lastChild = todoListCard;
            }
        });
    }

    while (todoListTasks.lastChild && todoListTasks.lastChild !== lastChild) {
        todoListTasks.removeChild(todoListTasks.lastChild);
    }
};

// Call the display function initially to display any tasks already in the array.
todoListDisplayTasks();
