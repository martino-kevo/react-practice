import { useState, useEffect } from 'react'
import './App.css'
import Executor, { useExecutor } from "executor-fn"

const MyDate = () => {
    const [date, setDate] = useState(null)

    useEffect(() => {
        let tDate = new Date()
        // let tDate = new Date(0)
        // let tDate = new Date(1700000000000)
        // let tDate = new Date(2022, 3, 4, 3, 11, 45, 5)
        // let tDate = new Date('January 1, 2023 00:11:01')

        let year = tDate.getFullYear()
        let dayOfMonth = tDate.getDate()
        let dayOfWeek = tDate.getDay()
        let month = tDate.getMonth()
        let hour = tDate.getHours() // millitary time (0 - 23)
        let minutes = tDate.getMinutes()
        let seconds = tDate.getSeconds()
        let ms = tDate.getMilliseconds()

        // tDate.setFullYear(2024)
        // tDate.setMonth(11)
        // tDate.setDate(31)
        // tDate.setHours(23) // millitary time (0 - 23)
        // tDate.setMinutes(1)
        // tDate.setSeconds(30)
        // tDate.setMilliseconds(0)

        // tDate = tDate.toLocaleString()

        // tDate = tDate.toLocaleDateString()
        // tDate = tDate.toLocaleTimeString()

        setDate(formatTime(tDate))
    }, [])

    const formatDate = (date) => {
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()

        return `${day}/${month}/${year}`
    }

    const formatTime = (date) => {
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()

        let amOrPm = hours >= 12 ? 'pm' : 'am'

        // Convert from millitary time to standard
        hours = (hours % 12) || 12

        return `${hours}:${minutes}:${seconds} ${amOrPm}`
    }


    // How to add leading zeros 00:00:01
    // function addZero(x) {
    //     return x < 10 ? "0" + String(x) : String(x);
    // }

    // const formatZereos = (time) => {
    //     time = time.toString()
    //     return time.length < 2 ? "0" + time : time
    // }


    return (
        <>
            <h2>{date}</h2>
        </>
    )
}

export default MyDate
