const vdom = require('petit-dom/dist/petit-dom.min');
const template = require('./template.js');
const logic = require('./logic.js');
const constants = require('./constants.js');

let state, tree;

const init = function(wrapper) {
    state = {
        board: logic.setupBoard(),
        playing: false,
        steps: 0,
        currentPlayer: 1,
        sandbox: true,
    };
    tree = template(state);
    const element = vdom.mount(tree);
    wrapper.append(element);
};

const update = function() {
    const newTree = template(state);
    vdom.patch(newTree, tree);
    tree = newTree;
};

const on = function(eventType, selector, fn) {
    document.addEventListener(eventType, function(event) {
        const target = event.target.closest(selector);
        if (target) {
            fn.call(target, state, event);
            update();
        }
    });
};

const play = function() {
    if (!state.playing && !state.steps) {
        return;
    }
    if (!state.playing) {
        state.steps -= 1;
    }
    logic.calculateNextGen(state);
    update();
    const speed = document.querySelector('[name="speed"]').value;
    const timeout = 2000 * Math.pow(0.95, speed);
    setTimeout(play, timeout);
};

on('mousedown', '.board-cell', function(state, event) {
    if (state.playing || state.steps) {
        return;
    }
    if (event.buttons != 1) {
        return;
    }
    const row = this.parentElement;
    const board = row.parentElement;
    const x = Array.prototype.indexOf.call(row.children, this);
    const y = Array.prototype.indexOf.call(board.children, row);
    const currentPlayer = state.currentPlayer === constants.EMPTY ? constants.GAIA : state.currentPlayer;
    if (state.board[y][x] === currentPlayer) {
        state.board[y][x] = constants.EMPTY;
    } else {
        state.board[y][x] = currentPlayer;
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
});

on('click', '.js-export', function(state) {
    const download = document.createElement('a');
    const s = JSON.stringify(state.board);
    download.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(s);
    download.download = 'board.json';
    download.hidden = true;
    document.body.appendChild(download);
    download.click();
    download.remove();
});

init(document.body);
