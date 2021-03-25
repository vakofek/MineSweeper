'use strict'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function renderTimer() {
    gTimeInterval = setInterval(countTimer, 1000);
}

function countTimer() {
    gGame.secPassed++;
    var strTime = '';
    gSeconds++;
    if (gSeconds === 60) {
        gMinute++;
        gSeconds = 0;
    }
    if (gSeconds < 10 && gMinute < 10) strTime = 'Time: 0' + gMinute + ':0' + gSeconds;
    else if (gSeconds < 10) strTime = 'Time: ' + gMinute + ':0' + gSeconds;
    else if (gMinute < 10) strTime = 'Time: 0' + gMinute + ':' + gSeconds;
    var elTimeBox = document.querySelector('.timer');
    elTimeBox.innerHTML = strTime;
}

function resetTimer() {
    document.querySelector('.timer').innerHTML = 'Time: 00:00';;
    clearInterval(gTimeInterval);
    gSeconds = 0;
    gMinute = 0;
}