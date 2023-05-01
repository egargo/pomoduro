const pomoDuroConfigs = {
    TITLE: 'POMODURO',
    YEAR: '2022',
    CURRENT_YEAR: new Date().getFullYear(),
    GITHUB: 'https://github.com/egargo/pomoduro',
    LICENSE: 'https://github.com/egargo/pomoduro/blob/master/LICENSE',
    ABOUT: 'https://github.com/egargo/pomoduro/blob/master/README.md',
};

document
    .getElementById('url-about')
    .setAttribute('href', pomoDuroConfigs.ABOUT);
document
    .getElementById('url-github')
    .setAttribute('href', pomoDuroConfigs.GITHUB);
document
    .getElementById('url-license')
    .setAttribute('href', pomoDuroConfigs.LICENSE);

document.getElementById('year').innerText +=
    pomoDuroConfigs.YEAR + ' - ' + new Date().getFullYear();
