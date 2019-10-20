const constants = require('./constants.js');

const setupBoard = function() {
    const board = [];
    for (let y = 0; y < constants.height; y++) {
        board[y] = [];
        for (let x = 0; x < constants.width; x++) {
            board[y][x] = constants.EMPTY;
        }
    }
    return board;
};

const calculateNextGen = function(state) {
    const board = state.board;
    const calcBoard = [];

    // Calculate every player seperatly
    for (let p = 1; p < constants.playerCount; p++) {
        calcBoard[p] = [];
        for (let y = 0; y < constants.height; y++) {
            calcBoard[p][y] = [];
            for (let x = 0; x < constants.width; x++) {
                if (board[y][x] === constants.GAIA) continue;
                const friendlyNeighbors = getFriendlyNeighbors(board, x, y, p);
                // Rules are here!
                if (
                    (board[y][x] === p && constants.alive.includes(friendlyNeighbors)) ||
                    (board[y][x] !== p && constants.born.includes(friendlyNeighbors))
                ) {
                    calcBoard[p][y][x] = p;
                } else {
                    calcBoard[p][y][x] = constants.EMPTY;
                }
            }
        }
    }

    // Conflate all playerevolutions by clearing tiles that would be claimed by multiple players
    for (let y = 0; y < constants.height; y++) {
        for (let x = 0; x < constants.width; x++) {
            let empty = true;
            board[y][x] = constants.EMPTY;
            for (let p = 1; p < constants.playerCount; p++) {
                if (calcBoard[p][y][x] === p) {
                    if (!empty) {
                        board[y][x] = constants.EMPTY;
                        continue;
                    } else {
                        empty = false;
                        board[y][x] = p;
                    }
                }
            }
        }
    }
};

const getFriendlyNeighbors = function(board, x, y, p){
    let count = 0;
    for (let deltaX = -1; deltaX <= 1; deltaX++) {
        for (let deltaY = -1; deltaY <= 1; deltaY++) {
            if (deltaY + y < 0 || deltaY + y >= constants.height || deltaX + x < 0 || deltaX + x >= constants.width) {
                continue;
            }
            if ((deltaX !== 0 || deltaY !== 0) && board[y + deltaY][x + deltaX] === p) {
                count += 1;
            }
        }
    }
    return count;
};

module.exports = {
    setupBoard: setupBoard,
    calculateNextGen: calculateNextGen,
};