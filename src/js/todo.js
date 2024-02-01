/**
 * MIT License
 *
 * Copyright (c) 2022 - 2024 egargo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

const duroListTasks = JSON.parse(localStorage.getItem("todo") || "[]");

const duroListAddTask = () => {
    const taskName = document.getElementById("addTask").value;

    // If the task is not empty or does not only contains whitespaces, add the
    // task to todo list.
    // When adding the task to todo list, trim the leading and trailing
    // whitespaces.
    if (!addTask.value.match(/^\s*$/)) {
        duroListTasks.push({
            ...{
                title: taskName.trim(),
                status: "Pending",
            },
        });

        localStorage.setItem("todo", JSON.stringify(duroListTasks));

        const newTaskKey = duroListTasks.length - 1;
        const newTaskData = duroListTasks[newTaskKey];

        const todoListCard = document.createElement("div");
        todoListCard.id = "todoListCard-" + newTaskKey;
        todoListCard.className = "todoListCard";
        todoListCard.innerText = newTaskData.title;
        todoListCard.addEventListener("click", () => {
            todoListRemoveTask(newTaskKey);
        });
        document.getElementById("todoListTasks").appendChild(todoListCard);
    }
    document.getElementById("addTask").value = "";
};

const todoListRemoveTask = (taskKey) => {
    duroListTasks.map((_data, key) => {
        if (key === taskKey) {
            duroListTasks[key].status = "Done";
            localStorage.setItem("todo", JSON.stringify(duroListTasks));

            const todoListCard = document.getElementById("todoListCard-" + key);
            if (todoListCard) {
                todoListCard.remove();
            }
        }
    });
};

const todoListDisplayTasks = () => {
    const todoListTasks = document.getElementById("todoListTasks");
    let lastChild = null;

    if (duroListTasks.length !== 0) {
        duroListTasks.forEach((data, key) => {
            if (data.status !== "Done") {
                let todoListCard = document.getElementById(
                    "todoListCard-" + key,
                );

                if (!todoListCard) {
                    todoListCard = document.createElement("div");
                    todoListCard.id = "todoListCard-" + key;
                    todoListCard.className = "todoListCard";
                    todoListCard.innerText = data.title;
                    todoListCard.addEventListener("click", () => {
                        todoListRemoveTask(key);
                    });
                    todoListTasks.append(todoListCard);
                } else {
                    const cardText = todoListCard.innerText;
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

// Call the display function initially to display any tasks already in
// the array.
if (duroListTasks.length !== 0) {
    todoListDisplayTasks();
}

// If the 'Add task' button is clicked, or the 'Enter' key is clicked while
// typing on the 'Add task' input field, add the task to todo list.
document.getElementById("listControlButton").addEventListener("click", () => {
    duroListAddTask();
});

document.getElementById("addTask").addEventListener("keypress", (event) => {
    event.key === "Enter" ? duroListAddTask() : null;
});
