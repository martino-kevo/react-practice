import Executor, { useExecutor } from 'executor-fn'
import { useState } from 'react'

const guessText = (uG, sG) => {
    return `You chose ${uG} - ${sG} Computer`
}

const guess = Executor(userGuess => {
    const systemGuess = Math.floor(Math.random() * 10 + 1)

    if (userGuess === systemGuess) {
        return { win: true, text: `${guessText(userGuess, systemGuess)} (YOU WIN!)` }
    }
    else if (userGuess > systemGuess) {
        return { win: false, text: `${guessText(userGuess, systemGuess)} (TOO BIG!)` }
    }
    else {
        return { win: false, text: `${guessText(userGuess, systemGuess)} (TOO SMALL!)` }
    }
}, {
    storeHistory: true,
    maxHistory: 10,
    // historyStep: 2,
    onError: (err) => console.log(`Error! ${err}`),
})

const displayText = Executor(d => d, {
    onError: (err) => console.log(`Error! ${err}`),
})


const NumberGuessing = () => {
    const guessDisplayText = useExecutor(displayText)
    const userGuess = useExecutor(guess)

    const [guessInput, setGuessInput] = useState("")
    const [guesses, setGuesses] = useState(0)
    const [guessHistory, setGuessHistory] = useState()

    const handleSubmitGuess = () => {
        if (isNaN(Number(guessInput))) return
        if (Number(guessInput) < 1 || Number(guessInput) > 10) return

        guess(Number(guessInput))
        setGuesses(guesses + 1)

        setGuessHistory(userGuess.history)

        userGuess.value.win ? displayText("YOU WIN! 😎") : displayText("YOU LOSE! 😆")
        setGuessInput("")
    }

    const handleResetGame = () => {
        guess.reset()
        guessDisplayText('')
        setGuesses(0)
    }

    return (
        <>
            <div
                style={{
                    textAlign: 'center',
                    margin: '2rem',
                    height: '80vh',
                    padding: '20px',
                    backgroundColor: 'lightcyan',
                    fontFamily: 'sans-serif'
                }}>
                {/* Game title and result text */}
                <h1>Number Guessing Game</h1>
                <button
                    style={{ fontWeight: '600', border: '2px solid green', cursor: 'pointer' }}
                    onClick={() => handleResetGame()}>
                    Reset game
                </button>

                <h3>{guessDisplayText.value}</h3>

                {/* Guessing section */}
                <section style={{ display: 'flex', width: '100%', height: '70%' }}>
                    <div style={{
                        backgroundColor: 'lightblue',
                        paddingTop: '6rem',
                        padding: '10px',
                        borderRadius: '5px',
                        width: '70%'
                    }}>
                        <label htmlFor="userGuess" style={{ width: '100%', fontWeight: '600' }}>
                            Guess by entering a number from 1 - 10: <br />
                            <input
                                type="text"
                                id='userGuess'
                                value={guessInput}
                                onChange={(e) => setGuessInput(e.target.value)}
                                style={{ padding: '10px', marginTop: '10px', marginBottom: '20px' }} />
                        </label><br />
                        <div style={{}}>
                            <button
                                style={{
                                    padding: '7px 9px',
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    backgroundColor: 'blue', color: 'whitesmoke',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleSubmitGuess()}
                            >
                                This is my guess
                            </button>

                            <span style={{
                                padding: '5px', backgroundColor: 'lightgrey',
                                border: '2px solid green',
                                borderRadius: '5px',
                                marginLeft: '2px'
                            }}>
                                Guesses: {guesses}
                            </span>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: 'lightgreen',
                        padding: '3px',
                        borderRadius: '5px',
                        width: '30%',
                        overflow: 'auto'
                    }}>
                        <div style={{
                            display: 'flex', gap: '2rem',
                            position: 'sticky', borderBottom: '1px dotted black',
                        }}>
                            <h3 style={{ margin: '10px 4px' }}>Guess History</h3>

                            <button
                                title='Undo'
                                style={{ border: 'none', cursor: 'pointer' }}
                                onClick={() => guess.undo()}>
                                ⏪
                            </button>
                            <button
                                title='Redo'
                                style={{ border: 'none', cursor: 'pointer' }}
                                onClick={() => guess.redo()}>
                                ⏩
                            </button>
                            <button
                                title='Reset'
                                style={{ border: 'none', cursor: 'pointer' }}
                                onClick={() => guess.reset()}>
                                🔄
                            </button>
                        </div>

                        {guessHistory?.length > 0 && (
                            <ul style={{ marginTop: '0.6rem', listStyle: 'none', padding: 0 }}>
                                {guess.history?.map((entry, index) => (
                                    entry.value !== undefined && (
                                        <li
                                            key={index}
                                            style={{
                                                padding: '5px',
                                                margin: "0.25rem 0",
                                                backgroundColor: entry.value?.win
                                                    ? 'green' : 'red',
                                                borderRadius: '5px',
                                                color: 'white'
                                            }}>
                                            {entry.value?.text}
                                        </li>
                                    )
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </div>
        </>
    )
}

export default NumberGuessing