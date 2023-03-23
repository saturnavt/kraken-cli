
import type { NextPage } from "next"
import { window } from '@tauri-apps/api'

const Titlebar: NextPage = () => {
    return (
        <><div style={{ background: 'transparent !important' }}>
            <div className="titlebar-button" id="titlebar-minimize" onClick={() => window.appWindow.minimize()}>
                <img
                    src="https://api.iconify.design/mdi:window-minimize.svg"
                    alt="minimize" style={{color: 'white'}}/>
            </div>
            <div className="titlebar-button" id="titlebar-maximize" onClick={() => window.appWindow.toggleMaximize()}>
                <img
                    src="https://api.iconify.design/mdi:window-maximize.svg"
                    alt="maximize" />
            </div>
            <div className="titlebar-button" id="titlebar-close" onClick={() => window.appWindow.close()}>
                <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
            </div>
        </div></>
    )
}

export default Titlebar
