const h = require('petit-dom/dist/petit-dom.min').h;

const renderBoard = function(state) {
    return h(
        'div',
        {'class': 'board'},
        state.board.map(row => h(
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
    if (state.sandbox) {
        return h('div', {'class': 'board-controls'}, [
            h('input', {type: 'range', value: 50, name: 'speed'}),
            h('input', {type: 'number', value: 1, name: 'steps'}),
            h('button', {'class': 'js-next-gen'}, 'Next Gen'),
            h('button', {'class': 'js-play'}, state.playing ? 'Pause' : 'Play'),
            h('button', {'class': 'js-current-player fg-' + state.currentPlayer}, 'Current Player'),
            h('button', {'class': 'js-export'}, 'Export'),
        ]);
    } else {
        return h('div', {'class': 'board-controls'}, [
            h('input', {type: 'hidden', value: 50, name: 'speed'}),
            h('input', {type: 'hidden', value: 1, name: 'steps'}),
            h('button', {'class': 'js-play'}, state.playing ? 'Pause' : 'Play'),
        ]);
    }
};

module.exports = function(state) {
    return h('div', {}, [
        renderControls(state),
        renderBoard(state),
    ]);
};
