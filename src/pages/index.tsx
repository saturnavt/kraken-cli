import { invoke } from "@tauri-apps/api/tauri"
import type { NextPage } from "next"
import { useState } from "react"

import { useGlobalShortcut } from "@/hooks/tauri/shortcuts"
import { window } from '@tauri-apps/api'
import TabsComponent from "@/components/Tabs"
import DynamicCustomTitleBar from "@/components/DynamicCustomTitleBar"

const Home: NextPage = () => {
  return (
    <>
      <DynamicCustomTitleBar />
      <TabsComponent />

    </>
  )
}

export default Home
