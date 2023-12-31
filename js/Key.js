class BasicPrintKey {
    static init_position_y_map = {
        'A': 0, 'Q': 0, 'Z': 0,
        'S': 1, 'W': 1, 'X': 1,
        'D': 2, 'E': 2, 'C': 2,
        'F': 3, 'R': 3, 'V': 3,
        'G': 4, 'T': 4, 'B': 4,
        'H': 5, 'Y': 5, 'N': 5,
        'J': 6, 'U': 6, 'M': 6,
        'K': 7, 'I': 7, '<': 7,
        'L': 8, 'O': 8, '>': 8,
        ';': 9, 'P': 9, '?': 9,
    }

    static img_key_map = {
        'A': 0, 'Q': 10, 'Z': 20,
        'S': 1, 'W': 11, 'X': 21,
        'D': 2, 'E': 12, 'C': 22,
        'F': 3, 'R': 13, 'V': 23,
        'J': 4, 'U': 14, 'M': 24,
        'K': 5, 'I': 15, '<': 25,
        'L': 6, 'O': 16, '>': 26,
        ';': 7, 'P': 17, '?': 27,
        'G': 8, 'T': 18, 'B': 28,
        'H': 9, 'Y': 19, 'N': 29,
    }

    static print_key_canvas_width = 600;
    static print_key_canvas_height = 600;

    constructor() {
        this.init();
    }

    init() {
        this.initOffset();
        this.initImgKeySize();
        this.initPrintKeySize();
        this.initPrintKeyPosition();
        this.initScoreValue();

        this.initImgKey();

        this.initEasyKeySize();
    }
    initImgKey(){
        const img_key = new Image();
        img_key.src = "/img/SongAlphabet.png"
        this.img_key =  img_key;
    }

    initOffset() {
        this.vx = -4;
        this.vy = 5;
    }

    initImgKeySize() {
        this.img_key_size_x = 41;
        this.img_key_size_y = 35;
    }

    initEasyKeySize(){
        this.easy_module_block_width = 35;
        this.easy_module_block_height = 20;
    }

    initPrintKeySize() {
        this.print_key_size_x = 28;
        this.print_key_size_y = 28;
    }

    initScoreValue(){
        this.perfect_position = 30;
        this.great_position = 60;
        this.bad_position = 120;
    }

    initKeyAtImgPosition(key) {
        const row_index = Math.floor(BasicPrintKey.img_key_map[key] / 10);
        const col_index = BasicPrintKey.img_key_map[key] % 10;
        return {
            img_position_x: col_index * this.img_key_size_x,
            img_position_y: row_index * this.img_key_size_y
        };
    }
    

    initPrintKeyPosition(key) {
        return (BasicPrintKey.init_position_y_map[key]) * 30 + 1;
    }


    matchStatus(current_x) {
        if (current_x < 0) {
            return -1;
        } else if (current_x < this.bad_position) {
            return 1;
        } else if (current_x < this.great_position) {
            return 2;
        } else if (current_x < this.perfect_position) {
            return 3;
        } else {
            return 0;
        }
    }
}


class PrintKey {
    static basicPrintKey = new BasicPrintKey();

    constructor(key) {
        this.key = key;
        this.basicPrintKey = PrintKey.basicPrintKey;
        this.init();
    }

    draw(ctx) {
        ctx.drawImage(this.basicPrintKey.img_key,
            this.img_position_x, this.img_position_y,
            this.basicPrintKey.img_key_size_x, this.basicPrintKey.img_key_size_y,
            this.init_print_x, this.init_print_y,
            this.basicPrintKey.print_key_size_x, this.basicPrintKey.print_key_size_y
        );
    }
    drawEasyModule(ctx){
        // console.log(`${this.init_print_x} / ${this.init_print_y}`)
        // console.log(`${BasicPrintKey.easy_module_block_width} / ${BasicPrintKey.easy_module_block_height}`)
        ctx.fillRect(this.init_print_x,this.init_print_y,
        this.basicPrintKey.easy_module_block_width,this.basicPrintKey.easy_module_block_height)

    }



    updateKey() {
        this.init_print_x += this.basicPrintKey.vx;
        if (this.init_print_x <= - 300) {
            this.status = 0;
        }
    }

    updateKeyEasyModule() {
        this.init_print_y += this.basicPrintKey.vy;
        if(this.init_print_y >= BasicPrintKey.print_key_canvas_height - 35 ){
            this.expire_key = 1;
        }
        if (this.init_print_y >= BasicPrintKey.print_key_canvas_height + 300) {
            this.status = 0;

        }
        // console.log(this.init_print_y);
    }

    init() {
        this.basicPrintKey.initImgKeySize();
        this.initPrintKeySize();
        // this.initPrintKeyPosition();
        this.initPrintKeyPositionEasyModule();
        this.initKeyAtImgPosition();
        this.initKeyStatus();
        
    }

    initKeyStatus(){
        this.status = 1;
        this.is_key_pressed = 0;
        this.expire_key = 0;
    }

    initPrintKeySize() {
        this.basicPrintKey.initPrintKeySize();
    }
    initKeyAtImgPosition() {
        const {img_position_x, img_position_y} = this.basicPrintKey.initKeyAtImgPosition(this.key);
        this.img_position_x = img_position_x;
        this.img_position_y = img_position_y;
    }

    initPrintKeyPosition() {
        this.init_print_x = BasicPrintKey.print_key_canvas_width;
        this.init_print_y = this.basicPrintKey.initPrintKeyPosition(this.key);
    }
    initPrintKeyPositionEasyModule() {
        this.init_print_y = 0 ;
        this.init_print_x = BasicPrintKey.init_position_y_map[this.key] * this.basicPrintKey.easy_module_block_width + 1;

    }

}

