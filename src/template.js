const h = petitDom.h;

const renderBoard = function(state) {
    return h(
        'div',
        {'class': 'board'},
        state.game.board.map(row => h(
            'div',
            {'class': 'board-row'},
            row.map(player => h(
                'div',
                {'class': 'board-cell bg-' + player}
            ))
        ))
    );
};

const renderControls = function(state) {
    if (state.game.sandbox) {
        return h('div', {'class': 'board-controls'}, [
            h('input', {type: 'range', value: 50, name: 'speed'}),
            h('input', {type: 'number', value: 1, name: 'steps'}),
            h('button', {'class': 'js-next-gen'}, 'Next Gen'),
            h('button', {'class': 'js-play'}, state.game.playing ? 'Pause' : 'Play'),
            h('button', {'class': 'js-current-player fg-' + state.game.currentPlayer}, 'Current Player'),
            h('button', {'class': 'js-export'}, 'Export'),
            h('button', {'class': 'js-quit'}, 'Quit'),
        ]);
    } else {
        return h('div', {'class': 'board-controls'}, [
            h('input', {type: 'hidden', value: 50, name: 'speed'}),
            h('input', {type: 'hidden', value: 1, name: 'steps'}),
            h('button', {'class': 'js-play'}, state.game.playing ? 'Pause' : 'Play'),
            h('button', {'class': 'js-quit'}, 'Quit'),
        ]);
    }
};

const renderMenu = function(state) {
    return h('div', {'class': 'menu'}, [
        h('button', {'class': 'js-menu-sandbox'}, 'Start sandbox game'),
    ]);
};

module.exports = function(state) {
    if (state.game) {
        return h('div', {}, [
            renderControls(state),
            renderBoard(state),
        ]);
    } else {
        return renderMenu(state);
    }
};
