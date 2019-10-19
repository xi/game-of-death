var preact = require('preact');
var template = require('./template.js');
var logic = require('./logic.js');

var state = {
    board: logic.setupBoard(),
};

var tree = template(state);
preact.render(tree, document.body);
