class Launcher{
    constructor(canvas_main) {
        this.canvas_main = canvas_main;
    }

    async init(){
        this.current_song = await new Song("../page/SR/SR01/song.ogg");

        
        this.fc = new FileController('/page/SR/SR01/song.txt');

        
        this.view = new PrintKeyView(this.canvas_main);
        
    }
    
    end(){
        
        
    }
    
    
    async main(){
        
        await this.current_song.init()
        this.listener = new Listener(this.current_song.current_song);

        
        
        
        
        const key_song_path = '../page/SR/SR01/Key/';
        const song_key_sound_postfix = '.ogg';
        
        
        await this.fc.init()
        await this.fc.preloadAudio(key_song_path, song_key_sound_postfix);
        
        console.log(this.fc);
        
        this.sc = new SoundController(this.fc.key_song_info, this.fc.audio_segments);
        this.sc.init();
        
        
        this.view.init();
        
        this.current_song.play();
        await this.view.refresh()
        
        const timeLine  = () =>{
            this.view.listenerTimeline(this.current_song.current_song,this.sc);
            this.sc.sync_key_sound(this.sc.current_count,this.current_song.current_song);
        }
        this.listener.addListenerMethod(timeLine);
        await this.listener.main();


    }

    event_main(){

        const eventListener = new EventListener();
        function getKey(key){
            console.log(key);
        }
        eventListener.keyEvent(
             (key) => {
                // console.log("_________________________________________")
                this.sc.audioPlayCurrentSound();
                // console.log(this);
                // console.log(this.current_song.getCurrentTime());
                getKey(`+++++++++++++++++${key}++++++++++++++++++++`)
            }
        );

    }



}