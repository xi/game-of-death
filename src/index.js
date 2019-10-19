var preact = require('preact');
var template = require('./template.js');
var logic = require('./logic.js');
var _ = require('./helpers.js');

var wrapper = document.body;

var state = {
    board: logic.setupBoard(),
};

preact.render(template(state), wrapper);

_.on('click', '.board-cell', function(event) {
    var row = this.parentElement;
    var board = row.parentElement;
    var x = Array.prototype.indexOf.call(row.children, this);
    var y = Array.prototype.indexOf.call(board.children, row);
    state.board[y][x] = (state.board[y][x] + 1) % 5;
    preact.render(template(state), wrapper);
});

_.on('click', '.js-next-gen', function(event) {
    console.log('foo');
    logic.calculateNextGen(state);
    preact.render(template(state), wrapper);
});
