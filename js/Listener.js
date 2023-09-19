class Listener{
    constructor(song) {
        this.song = song;
        this.init();
    }

    init() {
        this.listenerMethods = [];
        this.paused = false;
    }

    addListenerMethod(method) {
        if (typeof method === 'function' && !this.listenerMethods.includes(method)) {
            this.listenerMethods.push(method);
        } else {
            console.error('invalid');
        }
    }

    removeListenerMethod(method) {
        const index = this.listenerMethods.indexOf(method);
        if (index !== -1) {
            this.listenerMethods.splice(index, 1);
        } else {
            console.error('not found');
        }
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
        this.main();
    }

    executeListenerMethods() {
        this.listenerMethods.forEach((method) => {
            method();
        });
    }

    removeAllListeners() {
        this.listenerMethods = [];
    }

    async main() {
        let last_timestamp = performance.now();
        const loop = (timestamp) => {
            if (1) {
            // if (!this.song.paused) {
                const elapsedTime = timestamp - last_timestamp;
                if (elapsedTime >= 20) {
                    this.executeListenerMethods();
                    last_timestamp = timestamp;
                }
                requestAnimationFrame(loop);
            } else {
                cancelAnimationFrame(loop);
                this.removeAllListeners();
            }
        };

        requestAnimationFrame(loop);
    }

}
class EventListener{
    constructor() {
    }
    init(){
        this.events = {};
        this.eventHandlers = [];
    }
    eventOn(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    eventOff(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((cb) => cb !== callback);
        }
    }

    emit(event) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => {
                callback();
            });
        }
    }

    keyEvent(callback) {
        this.key_event = (event) => {
            const key_pressed = event.key;
            const mapped_key = KeyBoard.checkKey(key_pressed);
            if (mapped_key !== undefined) {
                console.log(`valid key：${key_pressed}`);
                if (callback) {
                    callback(mapped_key);
                }
            } else {
                console.log(`invalid key：${key_pressed}`);
                return 0;
            }
        };
        document.addEventListener('keydown', this.key_event);
    }
    cancelKeyEvent() {
        document.removeEventListener('keydown', this.key_event);
    }


}