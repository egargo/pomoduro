/**
 * MIT License
 *
 * Copyright (c) 2022 - 2023 egargo
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

// A function to open the settings modal.
const pomoDuroSettings = () => {
    let settings = document.getElementById('settings');
    let settingsClose = document.getElementById('settings-close');

    let openSettings = document.getElementById('settingsOpenControlButton');

    // If the user clicks on the 'Settings' button, open the settings modal.
    openSettings.onclick = () => {
        settings.style.display = 'flex';
    };

    // If the user clicks on the '×' (&times;), close the modal.
    settingsClose.onclick = () => {
        settings.style.display = 'none';
    };

    // If the user clicks on anywhere outside the settings modal,
    // close the modal.
    window.onclick = (event) => {
        if (event.target === settings) {
            settings.style.display = 'none';
        }
    };
};

// Reload the page whenever the user updates the settings.
// This is a temporary fix, as I don't have solution to dynamically update the
// page.
const settingsReload = () => {
    window.location.reload();
};

const settingsResetTodoList = () => {
    window.localStorage.removeItem('todo');
    settingsReload();
};

// Resetting the pomodoro settings will remove the 'study' and 'break' key-value
// pair from the Local Storage.
// This will also set the timeWork and timeBreak to the default value of 25 and
// 5, repsectively.
// Lastly, this will reload the page, refer to line:27.
const settingsResetPomodoro = () => {
    window.localStorage.removeItem('study');
    window.localStorage.removeItem('break');

    document.getElementById('timeWork').value = '25';
    document.getElementById('timeBreak').value = '5';

    settingsReload();
};

const settingsDefaultPomodoro = () => {
    window.localStorage.setItem('study', '25');
    window.localStorage.setItem('break', '5');
};

const settingsSavePomodoro = (lSKey, lsValue) => {
    window.localStorage.setItem(lSKey, lsValue);
};

let timeWork = document.getElementById('timeWork');
timeWork.addEventListener('input', (event) => {
    if (event.target.value !== '') {
        settingsSavePomodoro('study', event.target.value);
    }
});

let timeBreak = document.getElementById('timeBreak');
timeBreak.addEventListener('input', (event) => {
    if (event.target.value !== '') {
        settingsSavePomodoro('break', event.target.value);
    }
});

pomoDuroSettings();
