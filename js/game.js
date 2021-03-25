'use strict'


// function createBoard(elLevel) {
//     resetGame();
//     updateLife();
//     updateSmileyMode('Normal');
//     var board = [];
//     var boardSize = +elLevel.value;

//     for (var i = 0; i < boardSize; i++) {
//         board.push([]);
//         for (var j = 0; j < boardSize; j++) {
//             board[i][j] = {
//                 minesAroundCount: 0,
//                 isShown: false,
//                 isMine: false,
//                 isMarked: true,
//                 id: cellID++
//             }
//         }
//     }
//     setLevel(boardSize, board);
//     gBoard = board;
//     renderBoard();
// }





// function renderBoard() {
//     var strHTML = '';
//     for (var i = 0; i < gBoard.length; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < gBoard.length; j++) {
//             var cellValue = gBoard[i][j].isMine;
//             if (gBoard[i][j] === FLAG) cellValue = FLAG;
//             else cellValue = (cellValue) ? MINE : setMinesNegsCount(i, j);
//             strHTML += `<td data-type=${cellValue} data-i=${i} data-j=${j} onclick="cellClicked(this,${i},${j})" 
//             oncontextmenu="cellMarked(this,${i},${j}) ">${cellValue}</td>`;
//         }
//         strHTML += '<tr>';
//     }
//     var elBoard = document.querySelector('.board');
//     elBoard.innerHTML = strHTML
// }


// function setLevel(boardSize, board) {
//     switch (boardSize) {
//         case 4:
//             setMineOnBoard(board, 2);
//             break;
//         case 8:
//             setMineOnBoard(board, 12);
//             break;
//         case 12:
//             setMineOnBoard(board, 30);
//             break;
//     }
// }



// function setMineOnBoard(board, minesNum) {
    //     var idx = getRandomInt(0, board.length - 1)
    //     var jdx = getRandomInt(0, board.length - 1)
    //     for (var i = 0; i < minesNum; i++) {
    //         while (board[idx][jdx].isMine) {
    //             idx = getRandomInt(0, board.length - 1)
    //             jdx = getRandomInt(0, board.length - 1)
    //         }
    //         board[idx][jdx].isMine = true;
    //     }
    // }



    // function setMinesNegsCount(idx, jdx) {
    //     var mineCount = 0;
    //     for (var i = idx - 1; i <= idx + 1 && i < gBoard.length; i++) {
    //         if (i < 0) continue;
    //         for (var j = jdx - 1; j <= jdx + 1 && j >= 0 && j < gBoard.length; j++) {
    //             if (j < 0) continue;
    //             if (gBoard[i][j].isMine) mineCount++;
    //         }
    //     }
    //     return mineCount;
    // }



    // function cellClicked(elCell, i, j) {
    //     if (!gGame.isOn) {
    //         renderTimer();
    //         gGame.isOn = true;
    //         setMineOnBoard(i, j);
    //     }
    //     var type = elCell.dataset.type;
    //     if (type === MINE) {
    //         gGame.life -= 1;
    //         updateLife();
    //         if (gGame.life === 0) {
    //             alert('You Lose!')
    //             updateSmileyMode('Lose');
    //             resetGame();
    //         }
    //     }
    //     else if (type !== FLAG) updateScore(type)
    //     renderCell(elCell, i, j);
    // }