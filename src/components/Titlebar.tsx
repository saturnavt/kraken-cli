
import type { NextPage } from "next"
import { window } from '@tauri-apps/api'
import close from '../../public/redClose.png'
import clexpand from '../../public/greenExpand.png'
import yellowMinimized from '../../public/yellowMinimised.png'
import krakenTerminalLogo from '../../public/krakenterminallogo.png'
import Image from 'next/image';

const Titlebar: NextPage = () => {
    return (
        <div data-tauri-drag-region className="titlebar">
            <Image src={krakenTerminalLogo} className="kraken-terminal-logo" alt="kraken-terminal-logo" width={20} height={10} />
            <p className="titlebar-text">Kraken Terminal</p>
            <div className="titlebar-button" id="titlebar-minimize" onClick={() => window.appWindow.minimize()}>
                <Image src={yellowMinimized} alt="minimize" width={20} height={20} />
            </div>
            <div className="titlebar-button" id="titlebar-maximize" onClick={() => window.appWindow.toggleMaximize()}>
                <Image src={clexpand} alt="maximize" width={20} height={20} />
            </div>
            <div className="titlebar-button" id="titlebar-close" onClick={() => window.appWindow.close()}>
                <Image src={close} alt="close" width={20} height={20} />
            </div>
        </div>
    )
}

export default Titlebar
