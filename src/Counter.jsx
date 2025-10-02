import React from 'react'
import Executor, { useExecutor } from 'executor-fn'

const counter = Executor(x => x + 1, {
    storeHistory: true,
    callNow: true,
    initialArgs: [0],
    onError: (error) => console.log(`An error occured ${error}`),
})

const Counter = () => {
    const count = useExecutor(counter)

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                {/* Count value display */}
                <h1>Count: {count.value}</h1>

                {/* Controls */}
                <button
                    onClick={() => counter(counter.value)}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    ➕
                </button>
                <button
                    onClick={() => counter.undo()}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    Undo
                </button>
                <button
                    onClick={() => counter.redo()}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    Redo
                </button>
                <button
                    onClick={() => counter.reset()}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    Reset
                </button>
                <button
                    onClick={() => counter.pauseHistory()}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    Pause
                </button>
                <button
                    onClick={() => counter.resumeHistory()}
                    style={{ padding: '3px 7px', fontWeight: '600', cursor: 'pointer' }}>
                    Resume
                </button>

                {/* Mini history view because I do not know shit yet */}
                {counter.history && (
                    <ul style={{ marginTop: '2rem', listStyle: 'none' }}>
                        {counter.history.map((entry, index) => (
                            <li
                                key={index}
                                style={{ padding: '5px', marginTop: '5px', backgroundColor: 'darkolivegreen', color: 'white' }}>
                                Now: {JSON.stringify(entry.value)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Counter
