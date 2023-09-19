class Song{
    constructor(path) {
        this.path = path;
        this.current_song = null;
    }

    end(){

    }
    async init(){
        console.log()
        const song = new Audio();
        const src = this.path;
        try {
            await song.load();
            song.src = src;
            await new Promise((resolve) => {
                song.addEventListener('loadeddata', () => {
                    resolve();
                });
                song.addEventListener('error', (event) => {
                    console.error('song resource error', event);
                    console.log(`song loading exception: ${src}`);
                    resolve();
                });
            });
        } catch (error) {
            console.log('song load error', error);
            console.log(`song loading exception: ${src}`);
        }
        const variableManager = VariableManager.getInstance();
        if (!variableManager.variableExists('current_song')){
            variableManager.setVariable('current_song',this.current_song);
        }
        this.current_song = song;
    }

    play(){
        try {
            this.current_song.play();
        }catch (error){
            console.log(`song play error : ${error}`)
            console.log(this.current_song)
        }
    }

    getCurrentTime(){
        return this.current_song.currentTime;

    }



}