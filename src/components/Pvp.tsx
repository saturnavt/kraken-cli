import { invoke } from "@tauri-apps/api/tauri"
import type { NextPage } from "next"
import { useState } from "react"
import { useGlobalShortcut } from "@/hooks/tauri/shortcuts"


const Pvp: NextPage = () => {
    const onButtonClick = async () => {
        await invoke<string>("master")
            .then((value) => {
                console.log(value)
            })
            .catch((err) => console.log("Error"))
    }

    class pcinfo {
        hostname?: string
        platform?: string
        os_number?: string
        cpu?: string
        gpu?: string
        ram?: string
        mainboard?: string
    }

    const [pcspecs, setPcspecs] = useState<pcinfo>()

    const tester = async () => {
        await invoke<string>("pc_specs")
            .then((value) => {
                setPcspecs(value as pcinfo)
            })
            .catch(() => console.log("Error"))
    }

    useGlobalShortcut("CommandOrControl+P", () => {
        console.log("Ctrl+P was pressed!")
    })

    return (
        <div>
            <button onClick={() => onButtonClick()}>CLICKME</button>
        </div>
    )
}

export default Pvp
