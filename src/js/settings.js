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

const DEFAULT_STUDY_TIME = "25";
const DEFAULT_BREAK_TIME = "5";

const openSettings = document.getElementById("settingsOpen");

// A function to open the settings modal.
export const pomoDuroSettings = () => {
  const settings = document.getElementById("settings");
  settings.style.display = "flex";

  const settingsClose = document.getElementById("settings-close");

  // If the user clicks on the '×' (&times;), close the modal.
  settingsClose.onclick = () => {
    settings.style.display = "none";
  };

  // If the user clicks on anywhere outside the settings modal,
  // close the modal.
  window.onclick = (event) => {
    if (event.target === settings) {
      settings.style.display = "none";
    }
  };
};

// Reload the page whenever the user updates the settings.
// This is a temporary fix, as I don't have a solution to dynamically update the
// page.
const settingsReload = () => {
  window.location.reload();
};

const settingsResetTodoList = () => {
  window.localStorage.removeItem("todo");
  settingsReload();
};

// Call this function everytime the page refreshes.
(function () {
  document.getElementById("timeWork").value = localStorage.getItem("study") ||
    DEFAULT_STUDY_TIME;
  document.getElementById("timeBreak").value = localStorage.getItem("break") ||
    DEFAULT_BREAK_TIME;
})();

// Resetting the pomodoro settings will remove the 'study' and 'break' key-value
// pair from the Local Storage.
// This will also set the timeWork and timeBreak to the default value of 25 and
// 5, repsectively.
// Lastly, this will reload the page, refer to line:27.
const settingsResetPomodoro = () => {
  window.localStorage.removeItem("study");
  window.localStorage.removeItem("break");

  window.localStorage.setItem("study", DEFAULT_STUDY_TIME);
  window.localStorage.setItem("break", DEFAULT_BREAK_TIME);

  settingsReload();
};

const settingsSavePomodoro = (lSKey, lsValue) => {
  window.localStorage.setItem(lSKey, lsValue);
};

const timeWork = document.getElementById("timeWork");
timeWork.addEventListener("input", (event) => {
  if (event.target.value !== "") {
    settingsSavePomodoro("study", event.target.value);
  }
});

const timeBreak = document.getElementById("timeBreak");
timeBreak.addEventListener("input", (event) => {
  if (event.target.value !== "") {
    settingsSavePomodoro("break", event.target.value);
  }
});

document.getElementById("settingsSave").onclick = () => {
  settingsReload();
};

document.getElementById("settingsResetPomodoro").onclick = () => {
  settingsResetPomodoro();
};

document.getElementById("settingsResetTodoList").onclick = () => {
  settingsResetTodoList();
};

openSettings.onclick = () => {
  pomoDuroSettings();
};
