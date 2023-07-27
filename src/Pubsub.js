/* 
█▀▄ █ █ ██▄ ▄▀▀ █ █ ██▄ 
█▀  ▀▄█ █▄█ ▄█▀ ▀▄█ █▄█  */
/* https://gist.github.com/learncodeacademy/777349747d8382bfb722 */
var Pubsub = {
    Pubsub: {},
    on: function (eventName, fn) {
        this.Pubsub[eventName] = this.Pubsub[eventName] || [];
        this.Pubsub[eventName].push(fn);
    },
    off: function (eventName, fn) {
        if (this.Pubsub[eventName]) {
            for (var i = 0; i < this.Pubsub[eventName].length; i++) {
                if (this.Pubsub[eventName][i] === fn) {
                    this.Pubsub[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if (this.Pubsub[eventName]) {
            this.Pubsub[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    },
};

export default Pubsub;
