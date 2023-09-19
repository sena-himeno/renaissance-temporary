class KeyBoard{
    static key_map = {
        'A': 10, 'Q':20, 'Z': 30,
        'S': 9, 'W': 19, 'X': 29,
        'D': 8, 'E': 18, 'C': 28,
        'F': 7, 'R': 17, 'V': 27,
        'G': 6, 'T': 16, 'B': 26,
        'H': 5, 'Y': 15, 'N': 25,
        'J': 4, 'U': 14, 'M': 24,
        'K': 3, 'I': 13, '<': 23,
        'L': 2, 'O': 12, '>': 22,
        ';': 1, 'P': 11, '?': 21,
    }
    constructor(sound_controller) {
        this.sound_controller = sound_controller;
        this.init();
    }

    init(){
        this.key_array = [];
        this.valid_key = 0;
        this.key_count = 0;
    }
    static checkKey(key){
        if(key === ';' || key ==='<' || key === '>' || key === '?'){
            return key
        }
        if( this.key_map[key.toUpperCase().charAt(0)] !== undefined ){

            return key.toUpperCase().charAt(0)

        }
        return undefined
    }





}