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
    state.board[0][0] += 1;
    preact.render(template(state), wrapper);
});
