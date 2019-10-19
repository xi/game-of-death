var constants = require('./constants.js');
var example = function(a, b) {
    //content
};

var setupboard = function(){
    var board = [];
    for(var i = 0; i< constants.width; i++){
        board[i] = [];
        for(var j = 0; j<constants.hight; j++){
            board[i][j] = constants.EMPTY;
        }
    }
    return board;
};

module.exports = {
    example: example,
}