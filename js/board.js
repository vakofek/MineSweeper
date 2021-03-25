'use strict'

const MINE = '💣';
const FLAG = '🚩';
const EMPTY = '';
const LIFE = '💓';
const NORMAL_MODE = '😀';
const SAD_MODE = '😢';
const WIN_MODE = '😎';
const HINT = '💡';

var cellID = 101;
var gBoard;
var gTimeInterval;
var gSeconds = 0;
var gMinute = 0;

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markCount: 0,
    secPassed: 0,
    score: 0,
    life: 3
}

function initGame() {
    createBoard();
}

function createBoard() {
    resetGame();
    updateLife();
    updateSmileyMode('Normal');
    var board = [];
    var boardSize = gLevel.SIZE;
    for (var i = 0; i < boardSize; i++) {
        board.push([]);
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                id: cellID++,
                value: ''
            }
        }
    }
    gBoard = board;
    renderBoard();
}

function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard.length; j++) {
            var cellValue = '';
            var cellId = gBoard[i][j].id;
            strHTML += `<td data-type=${cellValue} class="${cellId}" data-i=${i} data-j=${j} onclick="cellClicked(this,${i},${j})" 
            oncontextmenu="cellMarked(this,${i},${j}) ">${cellValue}</td>`;
        }
        strHTML += '<tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}


function setLevel(elRadio) {
    var boardSize = +elRadio.value;

    switch (boardSize) {
        case 4:
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;
        case 8:
            gLevel.SIZE = 8;
            gLevel.MINES = 12;
            break;
        case 12:
            gLevel.SIZE = 12;
            gLevel.MINES = 30;
            break;
    }
    createBoard();
    console.log(gLevel);
}

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) {
        renderTimer();
        gGame.isOn = true;
        setMineOnBoard(elCell, i, j);
    }
    renderCell(elCell, i, j);
    gBoard[i][j].isShown = true;
    gGame.shownCount++;
    // var type = elCell.dataset.type;
    if (gBoard[i][j].value === MINE) {
        gGame.life -= 1;
        updateLife();
        if (gGame.life === 0) {
            alert('You Lose!')
            updateSmileyMode('Lose');
            // resetGame();
            createBoard();
        }
    }
    // console.log('gGame.markCount', gGame.markCount);
    // console.log('gGame.shownCount', gGame.shownCount);
    checkGameOver();
    // else if (type !== FLAG) updateScore(type)
}

function cellMarked(elCell, i, j) {
    event.preventDefault();
    if (!gGame.isOn) {
        renderTimer();
        gGame.isOn = true;
        setMineOnBoard(elCell, i, j);
    }
    if (gBoard[i][j].value === FLAG) {
        // debugger;
        if (gBoard[i][j].isMine) gGame.markCount--;
        else gBoard[i][j].value = gBoard[i][j].minesAroundCount;


    }
    else if (gBoard[i][j].isMine) {
        gGame.markCount++;
        gBoard[i][j].value = FLAG;
        gBoard[i][j].isMarked = true;
        gBoard[i][j].isShown = true;
        // gGame.markCount++;
    } else {
        gBoard[i][j].value = FLAG;
    }
    renderCell(elCell, i, j);
    checkGameOver();
}

function renderCell(elCell, i, j) {
    if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) gBoard[i][j].value = MINE;
    elCell.innerHTML = gBoard[i][j].value;
}



function resetGame() {
    resetTimer();
    document.querySelector('.score').innerHTML = 'Score: 0';
    gGame.isOn = false;
    gGame.shownCount = 0;
    gGame.markCount = 0;
    gGame.secPassed = 0;
    gGame.score = 0;
    gGame.life = 3;

}





function setMineOnBoard(elCell, i, j) {
    var idx = getRandomInt(0, gBoard.length - 1)
    var jdx = getRandomInt(0, gBoard.length - 1)
    for (var i = 0; i < gLevel.MINES; i++) {
        while (gBoard[idx][jdx].isMine || (i === idx && j === jdx)) {
            idx = getRandomInt(0, gBoard.length - 1)
            jdx = getRandomInt(0, gBoard.length - 1)
        }
        gBoard[idx][jdx].isMine = true;
        console.log(idx, jdx);
    }
    // console.table(gBoard);
    setMinesNegsCount();
}




function updateScore(valueNum) {
    var score = gGame.score += valueNum * 10;
    gGame.score = score;
    document.querySelector('.score').innerHTML = 'Score: ' + score;
}

function setMinesNegsCount(idx, jdx) {
    var mineCount = 0;
    for (var idx = 0; idx < gBoard.length; idx++) {
        for (var jdx = 0; jdx < gBoard.length; jdx++) {
            if (gBoard[idx][jdx].isMine) continue;
            for (var i = idx - 1; i <= idx + 1 && i < gBoard.length; i++) {
                if (i < 0) continue;
                for (var j = jdx - 1; j <= jdx + 1 && j >= 0 && j < gBoard.length; j++) {
                    if (j < 0) continue;
                    if (gBoard[i][j].isMine) mineCount++;
                }
            }
            gBoard[idx][jdx].value = mineCount;
            gBoard[idx][jdx].minesAroundCount = mineCount;
            mineCount = 0;
        }
    }
    console.table(gBoard);
}



function updateLife() {
    var lifeStr = 'Life :'
    for (var i = 0; i < gGame.life; i++) {
        lifeStr += LIFE;
    }
    var elLife = document.querySelector('.life');
    elLife.innerHTML = lifeStr;
}

function updateSmileyMode(mode) {
    switch (mode) {
        case 'Normal':
            document.querySelector('.smiley-mode').innerHTML = NORMAL_MODE;
            break;
        case 'Lose':
            document.querySelector('.smiley-mode').innerHTML = SAD_MODE;
            break;
        case 'Win':
            document.querySelector('.smiley-mode').innerHTML = WIN_MODE;
            break;

        default:
            break;
    }
}

function checkGameOver() {
    if (gGame.shownCount === (Math.pow(gLevel.SIZE, 2) - gLevel.MINES) && gGame.markCount === gLevel.MINES) {
        console.log('WINER!!!!');
    }
}



