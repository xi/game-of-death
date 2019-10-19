var on = function(eventType, selector, fn) {
    document.addEventListener(eventType, function(event) {
        var target = event.target.closest(selector);
        if (target) {
            return fn.call(target, event);
        }
    });
};

module.exports = {
    on: on,
};
