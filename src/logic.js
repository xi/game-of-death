var constants = require('./constants.js');

var setupBoard = function(){
    var board = [];
    for(var x = 0; x< constants.width; x++){
        board[x] = [];
        for(var y = 0; y<constants.height; y++){
            board[x][y] = constants.EMPTY;
        }
    }
    return board;
};

var calculateNextGen = function (state){
    var board = state.board;
    calcBoard = [];

    //Calculate every player seperatly
    for(var p = 1; p< constants.playerCount; p++){
        calcBoard[p] = [];
        for(var x = 0; x< constants.width; x++){
            calcBoard[p][x] = [];
            for(var y = 0; y<constants.height; y++){
                var friendlyNeighboars = getFriendlyNeighboars(board, x, y, p);
                // Rules are here!
                if((board[x][y] == p && friendlyNeighboars > 1 && friendlyNeighboars < 4)||
                   (board[x][y] != p && friendlyNeighboars == 3)
                    ) calcBoard[p][x][y] = p;
                else calcBoard[p][x][y] = constants.EMPTY;
            }
        }
    }

    //Conflate all playerevolutions by clearing tiles that would be claimed by multiple players
    for(var x = 0; x< constants.width; x++){
        for(var y = 0; y<constants.height; y++){
            var empty = true;
            for(var p = 1; p< constants.playerCount; p++){
                if(calcBoard[p][x][y] == p){
                    if(empty == false){
                        board[x][y] = constants.EMPTY;
                        continue;
                    }
                    else {
                        empty = false;
                        board[x][y] = p;
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
            if((deltaX != 0 || deltaY != 0) && board[x + deltaX][y + deltaY] == p) count ++;
        }
    }
    return count;
}

module.exports = {
    setupBoard: setupBoard,
    calculateNextGen: calculateNextGen,
}