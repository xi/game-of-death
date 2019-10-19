var vdom = require('petit-dom/dist/petit-dom.min');
var template = require('./template.js');
var logic = require('./logic.js');
var constants = require('./constants.js');

var state, tree;

var init = function(wrapper) {
    state = {
        board: logic.setupBoard(),
        playing: false,
        steps: 0,
        currentPlayer: 1,
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
            fn.call(target, state, event);
            update();
        }
    });
};

var play = function() {
    if (!state.playing && !state.steps) {
        return;
    }
    if (!state.playing) {
        state.steps -= 1;
    }
    logic.calculateNextGen(state);
    update();
    setTimeout(play, constants.playTimeout);
};

on('mousedown', '.board-cell', function(state) {
    if (state.playing || state.steps) {
        return;
    }
    var row = this.parentElement;
    var board = row.parentElement;
    var x = Array.prototype.indexOf.call(row.children, this);
    var y = Array.prototype.indexOf.call(board.children, row);
    if (state.board[y][x] === state.currentPlayer) {
        state.board[y][x] = constants.EMPTY;
    } else {
        state.board[y][x] = state.currentPlayer;
    }
});

on('click', '.js-next-gen', function(state) {
    if (state.playing || state.steps) {
        return;
    }
    state.steps = document.querySelector('[name="steps"]').value;
    play();
});

on('click', '.js-play', function(state) {
    state.playing = !state.playing;
    play();
});

on('click', '.js-current-player', function(state) {
    state.currentPlayer = (state.currentPlayer + 1) % constants.playerCount;
    if (state.currentPlayer === 0) {
        state.currentPlayer = 1;
    }
});

on('click', '.js-export', function(state) {
    var download = document.createElement('a');
    var s = JSON.stringify(state.board);
    download.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(s);
    download.download = 'board.json';
    download.hidden = true;
    document.body.appendChild(download);
    download.click();
    download.remove();
});

init(document.body);
