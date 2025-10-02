import { useState, useEffect } from 'react'
import './App.css'
import Executor, { useExecutor } from "executor-fn"
import Biscuit from 'biscuit-cache-js'
import ExecutorDebugger from "./ExecutorDebugger"
import BiscuitCache from './BiscuitCache'



function App() {



  return (
    <>
      {/* <h1>Nothing to display</h1> */}
      <BiscuitCache />
    </>
  )
}

export default App

const style = {

}
