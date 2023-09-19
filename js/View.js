class PrintKeyView{
    constructor(main_canvas,img_key) {
        this.main_canvas = main_canvas
        this.ctx = main_canvas.getContext("2d");

        this.img_key = img_key;

        this.frames = 1000/144;

        this.vaild_key_pool = [];
        this.current_vaild_key_count = 0;


        this.off_screen_canvas = new OffscreenCanvas(this.main_canvas.width, this.main_canvas.height);
        this.off_screen_ctx = this.off_screen_canvas.getContext('2d');


    }
    init(){
        this.vaild_key_pool = [];
        this.current_vaild_key_count = 0;
    }

    offScreenCanvasDraw() {
        this.off_screen_ctx.clearRect(0, 0, this.off_screen_canvas.width, this.off_screen_canvas.height);
        this.vaild_key_pool.forEach((key) => {
            key.updateKey();
            if (key.status === 0) {
                this.removeKeyInCanvas(key);
            }
            key.draw(this.img_key, this.off_screen_ctx);
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

}



class  PrintResultView{

}
