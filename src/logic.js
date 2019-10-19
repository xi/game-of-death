var constants = require('./constants.js');
var example = function(a, b) {
    //content
};

var setupBoard = function(){
    var board = [];
    for(var i = 0; i< constants.width; i++){
        board[i] = [];
        for(var j = 0; j<constants.hight; j++){
            board[i][j] = constants.EMPTY;
        }
    }
    return board;
};

var calculateNextGen = function (board){

}

module.exports = {
    example: example,
    setupBoard: setupBoard,
}