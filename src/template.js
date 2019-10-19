var h = require('preact').h;

module.exports = function(state) {
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
