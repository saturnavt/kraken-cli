import { invoke } from "@tauri-apps/api/tauri"
import type { NextPage } from "next"
import { useState } from "react"

import { useGlobalShortcut } from "@/hooks/tauri/shortcuts"

import TabsComponent from "@/components/Tabs"

const Home: NextPage = () => {
  return (
    <div style={{backgroundColor: 'black'}}>
      <TabsComponent />
    </div>
  )
}

export default Home
