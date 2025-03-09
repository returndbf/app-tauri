import {createSignal} from "solid-js";

import {invoke} from "@tauri-apps/api/core";
import "./App.css";
import {FFmpeg} from '@ffmpeg/ffmpeg';


function App() {
    const [file, setFile] = createSignal<Uint8Array | string>();

    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files!;
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e!.target!.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            setFile(uint8Array)
            console.log('Uint8Array:', uint8Array);
        };
        reader.readAsArrayBuffer(files[0]);


    };
    const click = async () => {

        // const ffmpeg = new FFmpeg();
        // console.log("Clicked")
        // await ffmpeg.load().then(res=>{
        //     console.log(res,"load")
        // })
        // await ffmpeg.writeFile("test.mp4", file).then(res=>{
        //     console.log(res,"write")
        // })
        // await ffmpeg.exec(['-i', 'test.mp4','-vn ','-acodec','copy','output.mp3'])
        // const data = await ffmpeg.readFile('output.mp3')
        // console.log(data,"Data")

        const ffmpeg = new FFmpeg();
        await ffmpeg.load();
        await ffmpeg.writeFile("video.mp4", file);
       await ffmpeg. exec(["-i", "video.mp4", "video.mp3"]);
       const data = ffmpeg. readFile("video.mp4");
       console.log(data,"Data")

    }

    return (
        <main class="container">
            <h1>Welcome to Tauri + Solid</h1>

            <h1 class="text-3xl font-bold underline">
                Hello world!
            </h1>
            <button class="btn" onClick={click}> Default</button>
            <input type="file" class="file-input" onChange={handleFileChange}/>

        </main>
    );
}

export default App;
