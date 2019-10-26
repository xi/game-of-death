import template from './template.js';
import scenarios from './scenarios.js';
import * as logic from './logic.js';
import * as constants from './constants.js';

let state, tree;

const init = function(wrapper) {
    state = {};
    tree = template(state);
    const element = petitDom.mount(tree);
    wrapper.append(element);
};

const update = function() {
    const newTree = template(state);
    petitDom.patch(newTree, tree);
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

const clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

const play = function() {
    if (!state.game.playing && !state.game.steps) {
        return;
    }
    if (!state.game.playing) {
        state.game.steps -= 1;
    }
    logic.calculateNextGen(state);
    update();
    const speed = document.querySelector('[name="speed"]').value;
    const timeout = 2000 * Math.pow(0.95, speed);
    setTimeout(play, timeout);
};

on('mousedown', '.board-cell', function(state, event) {
    if (state.game.playing || state.game.steps) {
        return;
    }
    if (event.buttons != 1) {
        return;
    }
    const row = this.parentElement;
    const board = row.parentElement;
    const x = Array.prototype.indexOf.call(row.children, this);
    const y = Array.prototype.indexOf.call(board.children, row);
    const currentPlayer = state.game.currentPlayer === constants.EMPTY ? constants.GAIA : state.game.currentPlayer;
    if (state.game.board[y][x] === currentPlayer) {
        state.game.board[y][x] = constants.EMPTY;
    } else if (state.game.board[y][x] === constants.EMPTY) {
        state.game.board[y][x] = currentPlayer;
    }
});

on('click', '.js-next-gen', function(state) {
    if (state.game.playing || state.game.steps) {
        return;
    }
    state.game.steps = document.querySelector('[name="steps"]').value;
    play();
});

on('click', '.js-play', function(state) {
    state.game.playing = !state.game.playing;
    play();
});

on('click', '.js-current-player', function(state) {
    state.game.currentPlayer = (state.game.currentPlayer + 1) % constants.playerCount;
});

on('click', '.js-export', function(state) {
    const download = document.createElement('a');
    const s = JSON.stringify(state.game.board);
    download.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(s);
    download.download = 'board.json';
    download.hidden = true;
    document.body.appendChild(download);
    download.click();
    download.remove();
});

on('click', '.js-quit', function(state) {
    state.game = null;
});

on('click', '.js-menu-sandbox', function(state) {
    state.game = {
        board: logic.setupBoard(),
        currentPlayer: 1,
        playing: false,
        steps: 0,
        turnCounter: 0,
        sandbox: true,
    }
});

on('click', '.js-menu-scenario', function(state) {
    const i = parseInt(this.dataset.scenario, 10);
    state.game = {
        board: clone(scenarios[i].board),
        description: scenarios[i].description,
        winCondition: scenarios[i].winCondition,
        currentPlayer: 1,
        playing: false,
        steps: 0,
        turnCounter: 0,
    }
});

init(document.body);
