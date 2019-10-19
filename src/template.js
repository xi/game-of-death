var h = require('preact').h;

var renderBoard = function(state) {
    return h(
        'div',
        {className: 'board'},
        state.board.map(row => h(
            'div',
            {className: 'board-row'},
            row.map(player => h(
                'div',
                {className: 'board-cell player-' + player}
            ))
        ))
    );
};

module.exports = function(state) {
    return h('div', {}, [
        h('button', {className: 'js-next-gen'}, 'Next Gen'),
        renderBoard(state),
    ]);
};
