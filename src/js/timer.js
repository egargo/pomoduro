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
import { checkUA } from './ua.js';

// If the 'study' and 'break' in localStorage does not exist, set its value to
// '25' and '5', respectively.
const pomoduroStudyTime = localStorage.getItem('study') || '25';
const pomoduroBreakTime = localStorage.getItem('break') || '5';

let pomoduroTimer = document.getElementById('pomoduroTimer');

let pomodoroStopButton = document.getElementById('pomodoroStopButton');
let timerControlButton = document.getElementById('timerControlButton');

let pomodoro_study = document.getElementById('pomodoro-study');
let pomodoro_break = document.getElementById('pomodoro-break');

let intervalID, countDown, minute;

pomoduroTimer.innerText =
    pomoduroStudyTime < 10
        ? pomoduroStudyTime + ':00'
        : pomoduroStudyTime + ':00';

const pomoduroReset = () => {
    countDown = pomoduroStudyTime * 60;
    document.title = 'POMODURO';
    pomoduroTimer.innerText = pomoduroStudyTime + ':00';
};

// Start pomoDuro timer.
const pomoDuroStartTimer = () => {
    timerControlButton.disabled = true;
    timerControlButton.style.cursor = 'wait';

    if (pomoduroTimer.getAttribute('name') === 'study') {
        pomodoro_break.disabled = true;
        pomodoro_break.style.cursor = 'wait';
        countDown = pomoduroStudyTime * 60;
    } else {
        pomodoro_study.disabled = true;
        pomodoro_study.style.cursor = 'wait';
        countDown = pomoduroBreakTime * 60;
    }

    if(checkUA() === true) {
        pomoduroSendNotify(
            pomoduroTimer.getAttribute('name') === 'study' ? '💻' : '☕'
        );
    }

    timerControlButton.value = 'START';
    timerControlButton.style.color = '#dbdcdd';

    intervalID = setInterval(() => {
        countDown--;
        minute = (countDown / 60) >> (countDown / 60) % 1;
        document.title = minute + ':' + (countDown % 60) + ' - POMODURO';
        pomoduroTimer.innerText = minute + ':' + (countDown % 60);
        localStorage.setItem('pause', countDown);

        if (countDown === 0) {
            pomoDuroResetTimer();
            pomoduroReset();
        }
    }, 1000);
};

const pomoDuroResetTimer = () => {
    timerControlButton.disabled = false;
    timerControlButton.style.cursor = 'pointer';

    pomodoro_study.disabled = false;
    pomodoro_study.style.cursor = 'pointer';

    pomodoro_break.disabled = false;
    pomodoro_break.style.cursor = 'pointer';

    localStorage.removeItem('pause');
    timerControlButton.style = 'hover';

    if(checkUA() === true) {
        pomoduroSendNotify('☕');
    }

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

const pomoduroSwitchTimerMode = () => {
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

timerControlButton.onclick = () => {
    pomoDuroStartTimer();
};
pomodoroStopButton.onclick = () => {
    pomoDuroResetTimer();
};
pomoduroSwitchTimerMode();
