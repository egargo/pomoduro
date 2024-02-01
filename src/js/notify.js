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

"use-strict";

// Check if notification is allowed, otherwise ask the user to allow the
// notifications.
const pomoduroNotifyCheck = () => {
  if (Notification.permission === "granted") {
    console.log("Notifications: enabled");
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notifications: enabled");
      }
    });
  }
};

const pomoduroSoundNotify = () => new Audio("res/audio/popcorn.mp3").play();

const pomoduroNotifyMessage = (notifyMessage) => {
  new Notification("POMODURO", {
    // icon: 'res/icons/pomoDuro-white.png',
    // icon: '🍅',
    icon: "res/icons/pomoduro.png",
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
