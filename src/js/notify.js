'use-strict';

// Check if notification is allowed, otherwise ask the user to allow the
// notifications.
const pomoduroNotifyCheck = () => {
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

const pomoduroSoundNotify = () => new Audio('res/audio/popcorn.mp3').play();

const pomoduroNotifyMessage = (notifyMessage) => {
    new Notification('POMODURO', {
        // icon: 'res/icons/pomoDuro-white.png',
        // icon: '🍅',
        icon: 'res/icons/pomoduro.png',
        body: notifyMessage,
    });
};

export const pomoduroSendNotify = (notifyMessage) => {
    pomoduroNotifyMessage(notifyMessage);
    pomoduroSoundNotify();
};

if (!navigator.userAgent.match(/(Android|iPhone)/i)) {
    pomoduroNotifyCheck();
}
