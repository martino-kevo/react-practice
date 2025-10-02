import { useState, useEffect } from 'react'
import './App.css'
import Executor, { useExecutor } from "executor-fn"
import Biscuit from 'biscuit-cache-js'
import ExecutorDebugger from "./ExecutorDebugger"
import BiscuitCache2 from './BiscuitCache2'



function App() {



  return (
    <>
      {/* <h1>Nothing to display</h1> */}
      <BiscuitCache2 />
    </>
  )
}

export default App

const style = {

}
