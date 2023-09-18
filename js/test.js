

async function main(){
const fc = new FileController("../page/SR/SR01/song.txt");
console.log(fc)
const key_song_path = '../page/SR/SR01/Key/';
const song_key_sound_postfix = '.ogg';

await fc.init()
await fc.preloadAudio(key_song_path, song_key_sound_postfix);
console.log("---------------------------------------------------------------")
console.log("---------------------------------------------------------------")
console.log("---------------------------------------------------------------")
console.log("---------------------------------------------------------------")
console.log(new VariableManager())
}
main();

