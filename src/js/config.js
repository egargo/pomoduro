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

const pomoDuroConfigs = {
  TITLE: "POMODURO",
  GH_PAGES: "/pomoduro",
  YEAR: "2022",
  CURRENT_YEAR: new Date().getFullYear(),
  GITHUB: "https://github.com/egargo/pomoduro",
  LICENSE: "https://github.com/egargo/pomoduro/blob/master/LICENSE",
  ABOUT: "https://github.com/egargo/pomoduro/blob/master/README.md",
};

const home_url = document.getElementById("logo");

if (window.location.href.match(/github/i)) {
  home_url.setAttribute("href", "/pomoduro");
} else {
  home_url.setAttribute("href", "/");
}

document
  .getElementById("url-about")
  .setAttribute("href", pomoDuroConfigs.ABOUT);
document
  .getElementById("url-github")
  .setAttribute("href", pomoDuroConfigs.GITHUB);
document
  .getElementById("url-license")
  .setAttribute("href", pomoDuroConfigs.LICENSE);

document.getElementById("year").innerText += pomoDuroConfigs.YEAR + " - " +
  new Date().getFullYear();
