import * as constants from './constants.js';

export const setupBoard = function() {
    const board = [];
    for (let y = 0; y < constants.height; y++) {
        board[y] = [];
        for (let x = 0; x < constants.width; x++) {
            board[y][x] = constants.EMPTY;
        }
    }
    return board;
};

export const calculateNextGen = function(state) {
    state.game.turnCounter++;
    const board = state.game.board;
    const calcBoard = [];

    // Calculate every player seperatly
    for (let p = 1; p < constants.playerCount; p++) {
        calcBoard[p] = [];
        for (let y = 0; y < constants.height; y++) {
            calcBoard[p][y] = [];
            for (let x = 0; x < constants.width; x++) {
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
            if(board[y][x] == constants.GAIA) continue;
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

    //Scenariostuff
    var winstate = state.game.winCondition(state);
    return winstate;
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

export const compareBoards = function(boardA, boardB){
    for (let y = 0; y < constants.height; y++) {
        for (let x = 0; x < constants.width; x++) {
            if(boardA[x][y] != boardB[x][y]) return false;
    }}
    return true;
}