var vdom = require('petit-dom/dist/petit-dom.min');
var template = require('./template.js');
var logic = require('./logic.js');

var state, tree;

var init = function(wrapper) {
    state = {
        board: logic.setupBoard(),
    };
    tree = template(state);
    var element = vdom.mount(tree);
    wrapper.append(element);
}

var update = function() {
    newTree = template(state);
    vdom.patch(newTree, tree);
    tree = newTree;
};

var on = function(eventType, selector, fn) {
    document.addEventListener(eventType, function(event) {
        var target = event.target.closest(selector);
        if (target) {
            fn.call(target, event);
            update();
        }
    });
};

on('click', '.board-cell', function(event) {
    var row = this.parentElement;
    var board = row.parentElement;
    var x = Array.prototype.indexOf.call(row.children, this);
    var y = Array.prototype.indexOf.call(board.children, row);
    state.board[y][x] = (state.board[y][x] + 1) % 5;
});

on('click', '.js-next-gen', function(event) {
    logic.calculateNextGen(state);
});

init(document.body);
