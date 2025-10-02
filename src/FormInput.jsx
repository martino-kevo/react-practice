import React, { useState } from 'react'
import { useExecutor } from 'executor-fn'
import { aInput } from '../utils/store'

const FormInput = () => {
    const [temperation, setTemperation] = useState("")
    const [unit, setUnit] = useState("celsius")
    const myInput = useExecutor(aInput)

    console.log(myInput.history)

    const toCelsius = (temp) => {
        return (temp - 32) * (5 / 9)
    }

    const toFahrenheit = (temp) => {
        return temp * 9 / 5 + 32
    }

    const handleConvert = () => {
        if (isNaN(Number(temperation))) return

        let rUnit

        if (unit === "celsius") {
            rUnit = toCelsius(Number(temperation))
        } else {
            rUnit = toFahrenheit(Number(temperation))
        }
        rUnit = Math.round(rUnit).toLocaleString(
            undefined, {
            style: "unit",
            unit: unit === "celsius" ? "celsius" : "fahrenheit"
        })
        aInput({ temperation: temperation, unit: unit, result: rUnit })
    }

    const handleValueChange = () => {
        setTemperation(myInput.value?.temperation)
        setUnit(myInput.value?.unit)
    }

    return (
        <>
            <div style={{
                marginTop: '3rem', textAlign: 'center',
                width: '50%', backgroundColor: 'lightblue',
                padding: '10px'
            }}>
                <label
                    htmlFor="myInput"
                    style={{ width: '100%', display: 'block', marginBottom: '1.5rem' }}>
                    Enter a number to convert: <br />
                    <input
                        type="text"
                        id='myInput'
                        value={temperation}
                        onChange={(e) => setTemperation(e.target.value)}
                        style={{ padding: '6px' }} />
                </label>

                <label
                    style={{ width: '100%', display: 'block', marginBottom: '0.5rem' }}>
                    Convert to:
                </label>
                <label htmlFor="celsius">
                    <input
                        type="radio"
                        id='celsius'
                        name='unit'
                        value="celsius"
                        checked={unit === "celsius"}
                        onChange={(e) => setUnit(e.target.value)}
                        style={{ padding: '6px' }}
                    />
                    Celsius
                </label><br />
                <label htmlFor="fahrenheit">
                    <input
                        type="radio"
                        id='fahrenheit'
                        name='unit'
                        value="fahrenheit"
                        checked={unit === "fahrenheit"}
                        onChange={(e) => setUnit(e.target.value)}
                        style={{ padding: '6px' }}
                    />
                    Fahrenheit
                </label><br />

                <button
                    onClick={() => handleConvert()}
                    style={{
                        padding: '3px 7px',
                        fontWeight: '600', cursor: 'pointer',
                        marginBottom: '8px'
                    }}>
                    Convert
                </button><br />

                <h3>{myInput.value?.result}</h3>

                <button
                    onClick={() => {
                        aInput.undo()
                        handleValueChange()
                    }}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    Undo
                </button>
                <button
                    onClick={() => {
                        aInput.redo()
                        handleValueChange()
                    }}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    Redo
                </button>
                <button
                    onClick={() => {
                        aInput.clearHistory()
                        handleValueChange()
                    }}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    clear
                </button>
            </div>
        </>
    )
}

export default FormInput
