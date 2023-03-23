#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use pcspecs::specs;
use serde::Serialize;
use std::env;
// use std::os::windows::process::CommandExt;
use std::path::Path;
use std::process::Command;
use std::process::Stdio;
use std::time::{SystemTime, UNIX_EPOCH};
use window_vibrancy::{apply_blur};
use tauri::Manager;
// const CREATE_NO_WINDOW: u32 = 0x08000000;
// const DETACHED_PROCESS: u32 = 0x00000008;

#[tauri::command]
fn on_button_clicked() -> String {
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_millis();
    format!(
        "on_button_clicked called from Rust! (timestamp: {}ms)",
        since_the_epoch
    )
}

#[tauri::command]
fn master() -> String {
    String::from("name")
}

#[derive(Debug, Serialize)]
struct Sysinfo {
    hostname: String,
    platform: String,
    os_number: String,
    cpu: String,
    gpu: String,
    ram: String,
    mainboard: String,
}

#[tauri::command]
fn pc_specs() -> Sysinfo {
    return Sysinfo {
        hostname: specs().hostname,
        platform: specs().platform,
        os_number: specs().os_number,
        cpu: specs().cpu,
        gpu: specs().gpu,
        ram: specs().ram,
        mainboard: specs().mainboard,
    };
}

#[tauri::command]
fn pvp() -> String {
    // Get the response from api call
    let response = api_call().map_err(|err| println!("{:?}", err)).unwrap();

    return response.to_string();
}

#[tokio::main]
async fn api_call() -> Result<String, Box<dyn std::error::Error>> {
    // Post request to worldofwarcraft.com
    let response = reqwest::Client::new()
        .get("https://worldofwarcraft.com/en-us/character/us/ragnaros/illud/pvp.json")
        .header(reqwest::header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36")
        .header("Content-type", "application/json")
        .header("If-None-Match", "wyzzy")
        .header("Accept", "*/*")
        .header("origin", "https://worldofwarcraft.com/en-us/character/us/ragnaros/illud/pvp")
        .header("referer", "https://worldofwarcraft.com/en-us/character/us/ragnaros/illud/pvp")
        .send()
        .await?;

    // Get response from worldofwarcraft.com
    let res_body = response.text().await?;

    // Return response from worldofwarcraft.com
    return Ok(res_body);
}

#[tauri::command]
fn current_path() -> String {
    let path = env::current_dir().unwrap();
    return String::from(path.display().to_string());
}

#[tauri::command]
fn verify_path(path: String) -> bool {
    return Path::new(&String::from(path.to_string())).exists();
}

#[tauri::command]
fn cmd(input: String, path: String) -> String {
    let output = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .current_dir(path.replace("\\", "/"))
            .args(["/C", &input])
            // .creation_flags(DETACHED_PROCESS)
            .stdout(Stdio::piped())
            .output()
            .expect("failed to execute process")
    } else {
        Command::new("sh")
            .current_dir(path.replace("\\", "/"))
            .arg("-c")
            .arg(String::from(input))
            .stdout(Stdio::piped())
            .output()
            .expect("failed to execute process")
    };

    // extract the raw bytes that we captured and interpret them as a string
    let stdout = String::from_utf8_lossy(&output.stdout).to_string();

    return stdout;
}

fn main() {
    // tauri::Builder::default()
    //     .invoke_handler(tauri::generate_handler![
    //         on_button_clicked,
    //         pc_specs,
    //         pvp,
    //         master,
    //         current_path,
    //         cmd,
    //         verify_path
    //     ])
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");

        tauri::Builder::default()
        .setup(|app| {
          let window = app.get_window("main").unwrap();
    
          #[cfg(target_os = "macos")]
          apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
            .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
    
          #[cfg(target_os = "windows")]
          apply_blur(&window, Some((18, 18, 18, 125)))
            .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
    
          Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            on_button_clicked,
            pc_specs,
            pvp,
            master,
            current_path,
            cmd,
            verify_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
