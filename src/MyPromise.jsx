import { useState, useEffect } from 'react'
import './App.css'
import Executor, { useExecutor } from "executor-fn"

const loadFile = Executor(async () => {
  let fileLoaded = true

  if (fileLoaded) {
    return 'File loaded'
  } else {
    throw new Error('File NOT loaded')
  }
})

const MyPromise = () => {

  const start = async () => {
    try {
      await loadFile()
      console.log(loadFile.value)
    } catch (error) {
      console.log(error)
    }
  }
  start()

  return (
    <>

    </>
  )
}

export default MyPromise
