import template from './template.js';
import scenarios from './scenarios.js';
import * as logic from './logic.js';
import * as constants from './constants.js';
import {clone} from './utils.js';

let state, tree;

const init = function(wrapper) {
    state = {};
    tree = template(state);
    const element = petitDom.mount(tree);
    wrapper.append(element);
};

const render = function() {
    const newTree = template(state);
    petitDom.patch(newTree, tree);
    tree = newTree;
};

const on = function(eventType, selector, fn) {
    document.addEventListener(eventType, function(event) {
        const target = event.target.closest(selector);
        if (target) {
            fn.call(target, state, event);
            render();
        }
    });
};

const play = function() {
    if (!state.game.playing) {
        return;
    }
    if (state.game.steps) {
        state.game.steps -= 1;
        if (!state.game.steps) {
            state.game.playing = false;
        }
    }
    logic.calculateNextGen(state);
    render();
    const speed = document.querySelector('[name="speed"]').value;
    const timeout = 2000 * Math.pow(0.95, speed);
    setTimeout(play, timeout);
};

const createGame = function(scenario) {
    return {
        board: clone(scenario.board),
        description: scenario.description,
        winCondition: scenario.winCondition,
        tileLimit: scenario.tileLimit || Infinity,
        limitBuildSpace: scenario.limitBuildSpace,
        sandbox: false,
        currentPlayer: 1,
        playing: false,
        steps: 0,
        turnCounter: 0,
        winState: null,
        resetGame: {
            board: clone(scenario.board),
            tileLimit: scenario.tileLimit || Infinity,
            turnCounter: 0,
        },
        restartGame: {
            board: clone(scenario.board),
            tileLimit: scenario.tileLimit || Infinity,
            turnCounter: 0,
        },
    };
};

on('mousedown', '.board-cell', function(state, event) {
    if (state.game.playing) {
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
    if (
        (state.game.limitBuildSpace) &&
        (x < state.game.limitBuildSpace.x1 || x > state.game.limitBuildSpace.x2 || y < state.game.limitBuildSpace.y1 || y > state.game.limitBuildSpace.y2)
    ) return;
    if (state.game.board[y][x] === currentPlayer) {
        state.game.board[y][x] = constants.EMPTY;
        state.game.tileLimit += 1;
    } else if (state.game.board[y][x] === constants.EMPTY) {
        if (state.game.tileLimit < 1) return;
        state.game.tileLimit -= 1;
        state.game.board[y][x] = currentPlayer;
    }

    state.game.resetGame.board = clone(state.game.board);
    state.game.resetGame.turnCounter = state.game.turnCounter;
    state.game.resetGame.tileLimit = state.game.tileLimit;
});

on('click', '.js-next-gen', function(state) {
    state.game.steps = document.querySelector('[name="steps"]').value;
    state.game.playing = true;
    play();
});

on('click', '.js-play', function(state) {
    state.game.playing = !state.game.playing;
    play();
});

on('click', '.js-reset', function(state) {
    state.game.playing = false;
    state.game.winState = null;
    state.game.board = clone(state.game.resetGame.board);
    state.game.turnCounter = state.game.resetGame.turnCounter;
    state.game.tileLimit = state.game.resetGame.tileLimit;
});

on('click', '.js-restart', function(state) {
    state.game.playing = false;
    state.game.winState = null;
    state.game.board = clone(state.game.restartGame.board);
    state.game.turnCounter = state.game.restartGame.turnCounter;
    state.game.tileLimit = state.game.restartGame.tileLimit;
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
    state.game = createGame({
        board: logic.setupBoard(),
    });
    state.game.sandbox = true;
});

on('click', '.js-menu-scenario', function(state) {
    const i = parseInt(this.dataset.scenario, 10);
    state.game = createGame(scenarios[i]);
});

init(document.body);
