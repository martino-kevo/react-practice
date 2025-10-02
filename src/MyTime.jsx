import Executor, { useExecutor } from "executor-fn"
import { useState } from "react"

const myTime = Executor(() => {
    let date = new Date()

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let amOrPm = hours >= 12 ? 'pm' : 'am'

    // Convert from millitary time to standard
    hours = (hours % 12) || 12

    hours = formatZereos(hours)
    minutes = formatZereos(minutes)
    seconds = formatZereos(seconds)

    function formatZereos(time) {
        time = time.toString()
        return time.length < 2 ? "0" + time : time
    }

    return `${hours}:${minutes}:${seconds} ${amOrPm}`
}, { storeHistory: true, maxHistory: 10 })


const MyTime = () => {
    const time = useExecutor(myTime)
    const [timerId, setTimerId] = useState(null)

    const handleResume = () => {
        let id = setInterval(myTime, 1000)
        console.log('Resume id', id)
        setTimerId(id)
    }

    const handlePause = () => {
        clearInterval(timerId)
        // console.log('Pause id', timerId)
        // console.log(time.history)
    }

    return (
        <>
            <button onClick={() => handleResume()}>Resume</button>
            <button onClick={() => handlePause()}>Pause</button>
            <h2>{time.value || myTime()}</h2>
        </>
    )
}

export default MyTime
