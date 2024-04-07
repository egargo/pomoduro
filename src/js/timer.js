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

import { checkUA } from "./ua.js";
import { disableButton, enableButton, switchTimerMode } from "./lib.js";
import { pomoduroSendNotify } from "./notify.js";

// If the 'study' and 'break' in localStorage does not exist, set its value to
// '25' and '5', respectively.
const pomoduroStudyTime = localStorage.getItem("study") || "25";
const pomoduroBreakTime = localStorage.getItem("break") || "5";

const pomoduroTimer = document.getElementById("pomoduroTimer");

const pomodoroStopButton = document.getElementById("pomodoroStopButton");
const timerControlButton = document.getElementById("timerControlButton");

const pomodoro_study = document.getElementById("pomodoro-study");
const pomodoro_break = document.getElementById("pomodoro-break");

let intervalID, countDown, minute;

pomoduroTimer.innerText = pomoduroStudyTime < 10
    ? pomoduroStudyTime + ":00"
    : pomoduroStudyTime + ":00";

const pomoduroReset = () => {
    document.title = "POMODURO";

    if (pomoduroTimer.getAttribute("name") === "study") {
        countDown = pomoduroStudyTime * 60;
        pomoduroTimer.innerText = pomoduroStudyTime + ":00";
    } else {
        countDown = pomoduroBreakTime * 60;
        pomoduroTimer.innerText = pomoduroBreakTime + ":00";
    }
};

const pomoDuroStartTimer = () => {
    if (pomoduroTimer.getAttribute("name") === "study") {
        disableButton(pomodoro_break, "Break");
        disableButton(timerControlButton, "START");
        countDown = pomoduroStudyTime * 60;
    } else {
        disableButton(pomodoro_study, "Study");
        disableButton(timerControlButton, "START");
        countDown = pomoduroBreakTime * 60;
    }

    if (checkUA() === true) {
        pomoduroSendNotify(
            pomoduroTimer.getAttribute("name") ===
                "study"
                ? `💻 ${pomoduroStudyTime} minute study started.`
                : `☕ ${pomoduroBreakTime} minute break started.`,
        );
    }

    intervalID = setInterval(() => {
        countDown--;
        minute = (countDown / 60) >> (countDown / 60) % 1;
        document.title = minute + ":" + (countDown % 60) + " - POMODURO";
        pomoduroTimer.innerText = minute + ":" + (countDown % 60);

        if (countDown === 0) {
            if (checkUA() === true) {
                pomoduroSendNotify(
                    pomoduroTimer.getAttribute("name") ===
                        "study"
                        ? `💻 ${pomoduroStudyTime} minute study ended.`
                        : `☕ ${pomoduroBreakTime} minute break ended.`,
                );
            }

            pomoDuroResetTimer();
            pomoduroReset();
        }
    }, 1000);
};

const pomoDuroResetTimer = () => {
    enableButton(timerControlButton, "▶️ START");
    enableButton(pomodoro_study, "💻 Study");
    enableButton(pomodoro_break, "☕ Break");

    updateButton();
    clearInterval(intervalID);
    pomoduroReset();
};

const updateButton = () => {
    timerControlButton.onclick = () => {
        pomoDuroStartTimer();
    };
};

(function() {
    pomodoro_study.addEventListener("click", () => {
        switchTimerMode(pomodoro_study, "#dbdcdd", "#121212");
        switchTimerMode(pomodoro_break, "transparent", "#121212");

        pomoduroTimer.setAttribute("name", "study");
        pomoduroTimer.innerText = pomoduroStudyTime + ":00";
    });

    pomodoro_break.addEventListener("click", () => {
        switchTimerMode(pomodoro_break, "#dbdcdd", "#121212");
        switchTimerMode(pomodoro_study, "transparent", "#121212");

        pomoduroTimer.setAttribute("name", "break");
        pomoduroTimer.innerText = pomoduroBreakTime + ":00";
    });
})();

timerControlButton.onclick = () => {
    pomoDuroStartTimer();
};

pomodoroStopButton.onclick = () => {
    if (checkUA() === true) pomoduroSendNotify("⏹️ Timer stopped.");
    pomoDuroResetTimer();
};
