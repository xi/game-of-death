var h = require('petit-dom/dist/petit-dom.min').h;

var renderBoard = function(state) {
    return h(
        'div',
        {'class': 'board'},
        state.board.map(row => h(
            'div',
            {'class': 'board-row'},
            row.map(player => h(
                'div',
                {'class': 'board-cell player-' + player}
            ))
        ))
    );
};

module.exports = function(state) {
    return h('div', {}, [
        h('input', {type: 'number', value: 1, name: 'steps'}),
        h('button', {'class': 'js-next-gen'}, 'Next Gen'),
        h('button', {'class': 'js-play'}, state.playing ? 'Pause' : 'Play'),
        h('button', {'class': 'js-current-player fg-' + state.currentPlayer}, 'Current Player'),
        renderBoard(state),
    ]);
};
