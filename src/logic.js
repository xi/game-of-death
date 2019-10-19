var constants = require('./constants.js');

var setupBoard = function(){
    var board = [];
    for(var y = 0; y < constants.height; y++){
        board[y] = [];
        for(var x = 0; x < constants.width; x++){
            board[y][x] = constants.EMPTY;
        }
    }
    return board;
};

var calculateNextGen = function (state){
    var board = state.board;
    calcBoard = [];

    //Calculate every player seperatly
    for(var p = 1; p < constants.playerCount; p++){
        calcBoard[p] = [];
        for(var y = 0; y < constants.height; y++){
            calcBoard[p][y] = [];
            for(var x = 0; x < constants.width; x++){
                var friendlyNeighboars = getFriendlyNeighboars(board, x, y, p);
                // Rules are here!
                if((board[y][x] == p && friendlyNeighboars > 1 && friendlyNeighboars < 4) ||
                   (board[y][x] != p && friendlyNeighboars == 3)
                    ) calcBoard[p][y][x] = p;
                else calcBoard[p][y][x] = constants.EMPTY;
            }
        }
    }

    //Conflate all playerevolutions by clearing tiles that would be claimed by multiple players
    for(var y = 0; y < constants.height; y++){
        for(var x = 0; x < constants.width; x++){
            var empty = true;
            board[y][x] = constants.EMPTY;
            for(var p = 1; p < constants.playerCount; p++){
                if(calcBoard[p][y][x] == p){
                    if(empty == false){
                        board[y][x] = constants.EMPTY;
                        continue;
                    }
                    else {
                        empty = false;
                        board[y][x] = p;
                    }
                }
            }
        }
    }
}

var getFriendlyNeighboars = function(board, x, y, p){
    var count = 0;
    for(var deltaX = -1; deltaX <= 1; deltaX++){
        for(var deltaY = -1; deltaY <= 1; deltaY++){
            if(deltaY+y <0 || deltaY+y >= constants.height || deltaX+x <0 || deltaX+x >= constants.width) continue;
            if((deltaX != 0 || deltaY != 0) && board[y + deltaY][x + deltaX] == p) count ++;
        }
    }
    return count;
}

module.exports = {
    setupBoard: setupBoard,
    calculateNextGen: calculateNextGen,
}