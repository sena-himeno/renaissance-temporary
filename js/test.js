

// async function main(){
// const fc = new FileController("../page/SR/SR01/song.txt");
// console.log(fc)
// const key_song_path = '../page/SR/SR01/Key/';
// const song_key_sound_postfix = '.ogg';
//
// await fc.init()
// await fc.preloadAudio(key_song_path, song_key_sound_postfix);
// console.log("---------------------------------------------------------------")
// console.log("---------------------------------------------------------------")
// console.log("---------------------------------------------------------------")
// console.log("---------------------------------------------------------------")
// console.log(new VariableManager())
// console.log(new VariableManager().getVariable('key_info'))
//     function a (key_info,audio_arguments){
//         console.log(key_info)
//         console.log(audio_arguments)
//
//     }
//     a(new VariableManager().getVariable('key_info'),null)
// }
// main();
//


async function main(){
    
    const canvas_main = document.getElementById("main_canvas");
    canvas_main.width = 600;
    canvas_main.height = 600;


    const  launcher = new Launcher(canvas_main);
    await launcher.init();
    launcher.main();
    launcher.event_main();

}

// function main(){

//     const launchar = new Launcher();
//     launchar.event_main();

// }