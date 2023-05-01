const pomoDuroNotifyCheck = () => {
    if (Notification.permission === 'granted') {
        console.log('Notifications: enabled');
    } else {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notifications: enabled');
            }
        });
    }
};

const pomoDuroSoundNotify = () => {
    new Audio('res/audio/notify.mp3').play();
};

const pomoDuroStartNotify = () => {
    new Notification('POMODURO', {
        icon: 'res/icons/pomoDuro.png',
        body: 'Start',
    });
    pomoDuroSoundNotify();
};

const pomoDuroStopNotify = (time) => {
    new Notification('POMODURO', {
        icon: 'res/icons/pomoDuro.png',
        body: 'End',
    });
    pomoDuroSoundNotify();
};

const pomodoroWorkTime = localStorage.getItem('study') || '25';
const pomodoroBreakTime = localStorage.getItem('break') || '5';

document.getElementById('timer').innerText =
    pomodoroWorkTime < 10 ? pomodoroWorkTime + ':00' : pomodoroWorkTime + ':00';

let intervalID, countDown;

const pomoDuroReset = () => {
    countDown = pomodoroWorkTime * 60;
    document.title = 'POMODURO';
    document.getElementById('timer').innerText = pomodoroWorkTime + ':00';
};

const updateButton = () => {
    document.getElementById('timerControlButton').value = 'START';
    document.getElementById('timerControlButton').onclick = () => {
        pomoDuroStartTimer();
    };
    document.getElementById('timerControlButton').style.boxShadow =
        '#d6d6d6 0px 6px 0px';
};

// Start pomoDuro timer.
const pomoDuroStartTimer = () => {
    // document.getElementById('pomodoro-break')
    pomoDuroStartNotify();
    document.getElementById('timerControlButton').value = 'PAUSE';
    document.getElementById('timerControlButton').style.boxShadow =
        '#ffffff 0px 6px 0px';
    document.getElementById('timerControlButton').onclick = () => {
        pomoDuroPauseTimer();
    };

    countDown =
        document.getElementById('timer').getAttribute('name') === 'study'
            ? pomodoroWorkTime * 60
            : pomodoroBreakTime * 60;

    Math.floor(countDown / 60) < 10
        ? '0' + Math.floor(countDown / 60)
        : Math.floor(countDown / 60);

    intervalID = setInterval(() => {
        countDown--;
        document.title =
            Math.floor(countDown / 60) + ':' + (countDown % 60) + ' | POMODURO';
        document.getElementById('timer').innerText =
            Math.floor(countDown / 60) + ':' + (countDown % 60);

        if (countDown === 0) {
            pomoDuroResetTimer();
            pomoDuroReset();
        }
    }, 1000);
};

const pomoDuroPauseTimer = () => {
    updateButton();
    clearInterval(intervalID);
};

const pomoDuroResetTimer = () => {
    pomoDuroSoundNotify();
    pomoDuroStopNotify();
    updateButton();
    clearInterval(intervalID);
    pomoDuroReset();
};

const pomodoroSwitchTimerMode = () => {
    let pomodoro_study = document.getElementById('pomodoro-study');
    let pomodoro_break = document.getElementById('pomodoro-break');
    let pomodoro_timer = document.getElementById('timer');

    pomodoro_study.style = 'background-color: #397097';

    pomodoro_study.addEventListener('click', () => {
        pomodoro_study.style = 'background-color: #397097';
        pomodoro_break.style = 'none';
        pomodoro_timer.setAttribute('name', 'study');
        pomodoro_timer.innerText = pomodoroWorkTime + ':00';
    });

    pomodoro_break.addEventListener('click', () => {
        pomodoro_break.style = 'background-color: #397097';
        pomodoro_study.style = 'none';
        pomodoro_timer.setAttribute('name', 'break');
        pomodoro_timer.innerText = pomodoroBreakTime + ':00';
    });
};

pomodoroSwitchTimerMode();
pomoDuroNotifyCheck();
