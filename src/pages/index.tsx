import { invoke } from "@tauri-apps/api/tauri"
import type { NextPage } from "next"
import { useState } from "react"

import { useGlobalShortcut } from "@/hooks/tauri/shortcuts"
import { window } from '@tauri-apps/api'
import TabsComponent from "@/components/Tabs"
import DynamicCustomTitleBar from "@/components/DynamicCustomTitleBar"
import TabsDockView from "@/components/TabsDockView"
import 'dockview/dist/styles/dockview.css';
const Home: NextPage = () => {
  return (
    <>
      <TabsDockView />
      <DynamicCustomTitleBar />
      <TabsComponent />

    </>
  )
}

export default Home
