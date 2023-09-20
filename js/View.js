class PrintKeyView{
    constructor(main_canvas) {
        this.main_canvas = main_canvas
        this.ctx = main_canvas.getContext("2d");


        this.frames = 1000/200;

        this.vaild_key_pool = [];
        this.current_vaild_key_count = 0;


        this.off_screen_canvas = new OffscreenCanvas(this.main_canvas.width, this.main_canvas.height);
        this.off_screen_ctx = this.off_screen_canvas.getContext('2d');


    }   
    init(){
        this.vaild_key_pool = [];
        this.current_vaild_key_count = 0;
        this.print_key_count = 0;

    }

    offScreenCanvasDraw() {
        this.off_screen_ctx.clearRect(0, 0, this.off_screen_canvas.width, this.off_screen_canvas.height);
        this.vaild_key_pool.forEach((key) => {
            key.updateKey();
            if (key.status === 0) {
                this.removeKeyInCanvas(key);
            }
            key.draw(this.off_screen_ctx);
        });

    }
    updateKeyInCanvas() {
        this.offScreenCanvasDraw();
        this.ctx.clearRect(0, 0, this.main_canvas.width, this.main_canvas.height);
        this.ctx.drawImage(this.off_screen_canvas, 0, 0);
    }
    getKeyIndex0(){
        return this.vaild_key_pool[0];
    }
    removeKeyIndex0(){
        this.vaild_key_pool.splice(0, 1);
    }

    addKeyInCanvas(key){
        this.vaild_key_pool.push(key);
        this.current_vaild_key_count ++;

    }
    removeKeyInCanvas(key){
        const index = this.vaild_key_pool.indexOf(key);
        if (index !== -1) {
            this.vaild_key_pool.splice(index, 1);
            this.current_vaild_key_count--;
        }
    }
    async refresh() {
        let last_timestamp = 0;
        const animate = (timestamp) => {
            const elapsed = timestamp - last_timestamp;

            if (elapsed >= this.frames) {
                this.ctx.clearRect(0, 0, this.main_canvas.width, this.main_canvas.height);
                // console.log(this.vaild_key_pool)
                this.updateKeyInCanvas();

                last_timestamp = timestamp;
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }
    listenerTimeline(song,sound_controller){
        console.log("-----------------------------")
        this.current_time = String(Math.floor(song.currentTime * 10) / 10);
        // console.log(`${ Math.floor(( this.sound_controller.key_sound_info[this.sound_controller.current_count].key_time - 2) * 10 ) / 10  } / ${this.current_time }`)
        // console.log(`${ String(Math.floor(( this.sound_controller.key_sound_info[this.sound_controller.current_count].key_time - 2) * 10 ) / 10)   === this.current_time }`)
        if (!song.paused) {

            if (sound_controller.current_count <= sound_controller.audio_segments.length -1 ) {

                if ( String(Math.floor(( sound_controller.key_sound_info[this.print_key_count].key_time - 2) * 10 ) / 10)   === this.current_time) {
                    console.log("-----------------------")
                    // console.log(sound_controller.key_sound_info[this.print_key_count].key_pressed)
                    // console.log(KeyBoard.checkKey(sound_controller.key_sound_info[this.print_key_count].key_pressed))
                    if (this.mark_key_time !== this.current_time){
                        const printKey = new PrintKey(KeyBoard.checkKey(sound_controller.key_sound_info[this.print_key_count].key_pressed));
                        // const printKey = new PrintKey(';');
                        console.log(printKey);
                        this.addKeyInCanvas(printKey)
                        this.print_key_count ++;
                        this.mark_key_time = this.current_time

                    }

                }

                //  song current time
                if (sound_controller.key_sound_info[sound_controller.current_count].key_time === this.current_time) {
                }

            }
        }
    }

}



class  PrintResultView{

}
