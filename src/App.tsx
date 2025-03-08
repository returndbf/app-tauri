import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
      <main class="container">
          <h1>Welcome to Tauri + Solid</h1>

          <h1 class="text-3xl font-bold underline">
              Hello world!
          </h1>
          <button class="btn">Default</button>
          <input type="file" class="file-input"/>

      </main>
  );
}

export default App;
