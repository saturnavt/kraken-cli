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
        setPreviusInput(previusInput => [...previusInput, input]);
        setInput("");

        await invoke<string>("cmd", { input: input })
            .then((value) => {
                if (value == "") {
                    setCmdResult(cmdResult => [...cmdResult, "Command " + '"' + input + '"' + " not found"]);
                } else {
                    setCmdResult(cmdResult => [...cmdResult, value]);
                }
            })
            .catch((err) => console.log("Error"))
    }

    const handleInput = (e: any) => {
        setInput(e.target.value)
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

    useEffect(() => {
        current_path();
    })

    return (
        <div style={{ backgroundColor: 'black' }}>
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
                {cmdResult.length == 0 ? null : cmdResult.map((cmdResults) => {
                    return <li style={{ color: 'white', marginLeft: '5px', }} id="p_wrap">{cmdResults}</li>
                })}
            </table>
            <form onSubmit={handleSubmit}>
                <a style={{ color: 'white' }}>{currentPath}{'> '}</a>
                <input onChange={(value) => handleInput(value)} onKeyDown={(e) => onInputKeyDown(e)} value={input} autoFocus={true}></input>
            </form>
        </div>
    )
}

export default Terminal
