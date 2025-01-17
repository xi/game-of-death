import scenarios from './scenarios.js';

const h = petitDom.h;

const getSpaceClass = function(state, y, x) {
    if ((state.game.limitBuildSpace) && (
        x < state.game.limitBuildSpace.x1
        || x > state.game.limitBuildSpace.x2
        || y < state.game.limitBuildSpace.y1
        || y > state.game.limitBuildSpace.y2
    )) {
        return 'limit-outside';
    }
};

const renderBoard = function(state) {
    return h(
        'div',
        {'class': 'board'},
        state.game.board.map((row, y) => h(
            'div',
            {'class': 'board-row'},
            row.map((player, x) => h(
                'div',
                {'class': `board-cell bg-${player} ${getSpaceClass(state, y, x)}`}
            ))
        ))
    );
};

const renderControls = function(state) {
    if (state.game.sandbox) {
        return h('div', {'class': 'board-controls'}, [
            state.game.turnCounter,
            ' ',
            h('input', {type: 'range', value: 50, name: 'speed'}),
            ' ',
            h('input', {type: 'number', value: 1, name: 'steps'}),
            ' ',
            h('button', {'class': 'js-next-gen'}, 'Next Gen'),
            ' ',
            h('button', {'class': 'js-play'}, state.game.playing ? 'Pause' : 'Play'),
            ' ',
            h('button', {'class': 'js-reset'}, 'Reset'),
            ' ',
            h('button', {'class': 'js-restart'}, 'Restart'),
            ' ',
            h('button', {'class': `js-current-player fg-${state.game.currentPlayer}`}, 'Current Player'),
            ' ',
            h('button', {'class': 'js-export'}, 'Export'),
            ' ',
            h('a', {'class': 'btn', 'href': '#!'}, 'Back'),
        ]);
    } else {
        return h('div', {'class': 'board-controls'}, [
            state.game.tileLimit === Infinity ? '∞' : state.game.tileLimit,
            ' ',
            state.game.turnCounter,
            ' ',
            h('input', {type: 'range', value: 50, name: 'speed'}),
            ' ',
            h('input', {type: 'hidden', value: 50, name: 'speed'}),
            ' ',
            h('input', {type: 'hidden', value: 1, name: 'steps'}),
            ' ',
            h('button', {'class': 'js-play', disabled: state.game.playing}, 'Play'),
            ' ',
            h('button', {'class': 'js-reset'}, 'Reset'),
            ' ',
            h('button', {'class': 'js-restart'}, 'Restart'),
            ' ',
            h('a', {'class': 'btn', 'href': '#!'}, 'Back'),
        ]);
    }
};

const renderMenu = function() {
    return h('div', {'class': 'menu'}, [
        h('img', {'class': 'logo', 'src': 'logo.jpg', 'alt': 'Game of Death'}),
        h('a', {'class': 'btn', 'href': '#!sandbox'}, 'Start sandbox game'),
    ].concat(scenarios.map((scenario, i) => h(
        'a',
        {'class': 'btn', 'href': `#!scenario/${i}`},
        `Start scenario: ${scenario.title}`,
    ))));
};

const renderWinState = function(state) {
    if (state.game.winState) {
        const items = ['You have won!'];
        if (state.scenario !== null && state.scenario + 1 < scenarios.length) {
            items.push(' ');
            items.push(h('a', {
                'class': 'btn',
                'href': `#!scenario/${state.scenario + 1}`,
            }, 'Next'));
        }
        return h('p', {}, items);
    } else if (state.game.winState === false) {
        return h('p', {}, 'You have lost');
    }
};

export default function(state) {
    if (state.game) {
        return h('div', {}, [
            renderControls(state),
            h('p', {}, state.game.description),
            renderBoard(state),
            renderWinState(state),
        ]);
    } else {
        return renderMenu(state);
    }
}
