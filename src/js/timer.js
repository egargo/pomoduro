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

'use strict';

import { pomoduroSendNotify } from './notify.js';

// If the 'study' and 'break' in localStorage does not exist, set its value to
// '25' and '5', respectively.
const pomoduroStudyTime = localStorage.getItem('study') || '25';
const pomoduroBreakTime = localStorage.getItem('break') || '5';

let pomoduroTimer = document.getElementById('pomoduroTimer');
let pomodoroStopButton = document.getElementById('pomodoroStopButton');
let timerControlButton = document.getElementById('timerControlButton');

pomoduroTimer.innerText =
    pomoduroStudyTime < 10
        ? pomoduroStudyTime + ':00'
        : pomoduroStudyTime + ':00';

let intervalID, countDown, minute;

const pomoduroReset = () => {
    countDown = pomoduroStudyTime * 60;
    document.title = '🍅 POMODURO';
    pomoduroTimer.innerText = pomoduroStudyTime + ':00';
};

// Start pomoDuro timer.
export const pomoDuroStartTimer = () => {
    pomoduroSendNotify(
        pomoduroTimer.getAttribute('name') === 'study' ? '💻' : '☕'
    );
    timerControlButton.value = '⏸️ PAUSE';
    // timerControlButton.style.color = '#561981';
    // timerControlButton.style.backgroundColor = '#ffffff';
    timerControlButton.onclick = () => {
        pomoDuroPauseTimer();
    };

    countDown =
        pomoduroTimer.getAttribute('name') === 'study'
            ? pomoduroStudyTime * 60
            : pomoduroBreakTime * 60;

    intervalID = setInterval(() => {
        countDown--;
        minute = (countDown / 60) >> (countDown / 60) % 1;
        document.title = minute + ':' + (countDown % 60) + ' | 🍅 POMODURO';
        pomoduroTimer.innerText = minute + ':' + (countDown % 60);

        if (countDown === 0) {
            pomoDuroResetTimer();
            pomoduroReset();
        }
    }, 1000);
};

const pomoDuroPauseTimer = () => {
    updateButton();
    clearInterval(intervalID);
};

const pomoDuroResetTimer = () => {
    // timerControlButton.style.backgroundColor = 'transparent';
    // timerControlButton.style.color = '#ffffff';
    timerControlButton.style = 'hover';
    pomoduroSendNotify('☕');
    updateButton();
    clearInterval(intervalID);
    pomoduroReset();
};

const updateButton = () => {
    timerControlButton.value = '▶️ START';
    timerControlButton.onclick = () => {
        pomoDuroStartTimer();
    };
};

export const pomoduroSwitchTimerMode = () => {
    let pomodoro_study = document.getElementById('pomodoro-study');
    let pomodoro_break = document.getElementById('pomodoro-break');
    // let pomodoro_timer = document.getElementById('pomoduroTimer');
    // pomodoro_study.style = 'background-color: #561981';

    pomodoro_study.addEventListener('click', () => {
        pomodoro_study.style.backgroundColor = '#dbdcdd';
        pomodoro_study.style.color = '#121212';
        pomodoro_break.style = 'none';
        pomoduroTimer.setAttribute('name', 'study');
        pomoduroTimer.innerText = pomoduroStudyTime + ':00';
    });

    pomodoro_break.addEventListener('click', () => {
        pomodoro_break.style.backgroundColor = '#dbdcdd';
        pomodoro_break.style.color = '#121212';
        pomodoro_study.style.backgroundColor = 'transparent';
        pomodoro_study.style.color = '#121212';
        pomoduroTimer.setAttribute('name', 'break');
        pomoduroTimer.innerText = pomoduroBreakTime + ':00';
    });
};

timerControlButton.addEventListener('click', () => {
    pomoDuroStartTimer();
});
pomodoroStopButton.addEventListener('click', () => {
    pomoDuroResetTimer();
});
