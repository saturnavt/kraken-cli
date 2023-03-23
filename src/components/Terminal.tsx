import { invoke } from "@tauri-apps/api/tauri"
import type { NextPage } from "next"
import { useEffect, useState } from "react"

const Terminal: NextPage = () => {
    const [currentPath, setCurrentPath] = useState("");
    const [input, setInput] = useState("");
    const [cmdResult, setCmdResult] = useState<string[]>([]);
    const [previusInput, setPreviusInput] = useState<string[]>([]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (input == "cls") {
            setPreviusInput([]);
            setCmdResult([]);
        }

        // go back one folder
        if (input == "cd ..") {
            setCurrentPath(currentPath.replace(/\\[^\\]+$/, ""));

            if (currentPath.slice(-1) == ":") {
                setCurrentPath(currentPath + "\\")
            }
            setInput("");
        }

        // go to path
        if (input.substring(0, 2) == "cd" && input.slice(-2) != ".." && input.includes("\\") == true) {
            let verifyPath = await verify_path(input.replace("cd", "").trimStart());
            console.log(verifyPath)
            if (verifyPath) {
                setCurrentPath(input.replace("cd", "").trimStart())
                setInput("");
            }
        }

        // Go in one folder
        if (input.substring(0, 2) == "cd" && input.includes("\\") == false && input.slice(-2) != "..") {
            let verifyPath = await verify_path(currentPath + "\\" + input.replace("cd", "").trimStart());
            console.log(verifyPath)
            console.log(input.slice(-2))
            if (verifyPath) {
                setCurrentPath(currentPath + "\\" + input.replace("cd", "").trimStart())
                setInput("");
            }
        }

        if (input != "cd .." || input.substring(0, 2) == "cd") {
            setPreviusInput(previusInput => [...previusInput, input]);
            setInput("");

            await invoke<string>("cmd", { input: input, path: currentPath })
                .then((value) => {
                    if (value == "") {
                        setCmdResult(cmdResult => [...cmdResult, "Command " + '"' + input + '"' + " not found"]);
                    } else {
                        setCmdResult(cmdResult => [...cmdResult, value]);
                    }
                })
                .catch((err) => console.log("Error"))
        }
    }

    const handleInput = (e: any) => {
        setInput(e.target.value)
    }

    const verify_path = async (path: string) => {
        let promise = new Promise(function (resolve, reject) {
            return invoke<boolean>("verify_path", { path: path })
                .then((value) => {
                    resolve(value);
                })
                .catch((err) => console.log("Error"))
        });
        return promise
    }

    const current_path = async () => {
        await invoke<string>("current_path")
            .then((value) => {
                setCurrentPath(value)
            })
            .catch((err) => console.log("Error"))
    }

    function onInputKeyDown(event: any) {
        switch (event.keyCode) {
            case 38: // up
                setInput(previusInput[previusInput.length - 1])
                break;
            case 40: // down
                setInput(previusInput[0])
                break;
        }
    }

    let initialized = false
    useEffect(() => {
        if (!initialized) {
            initialized = true
            current_path();
        }
    }, [])

    return (
        <div style={{ backgroundColor: '#121212' }}>
            <br></br>
            <br></br>
            {/* <table>
                {
                    previusInput.map((inputs) => {
                        return <li style={{ color: 'white', marginLeft: '5px' }}>{inputs}</li>
                    })
                }
            </table> */}
            <table>
                <tbody>
                    {cmdResult.length == 0 ? null : cmdResult.map((cmdResults, index) => {
                        return <li key={index} style={{ color: 'white', marginLeft: '5px', }} id="p_wrap">{cmdResults}</li>
                    })}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <a style={{ color: 'white' }}>{currentPath}{'> '}</a>
                <input onChange={(value) => handleInput(value)} onKeyDown={(e) => onInputKeyDown(e)} value={input} autoFocus={true}></input>
            </form>
        </div>
    )
}

export default Terminal
