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
        h('button', {'class': 'js-next-gen'}, 'Next Gen'),
        h('button', {'class': 'js-play'}, 'Play'),
        renderBoard(state),
    ]);
};
