import { useState } from 'react'

class Card {
    constructor(value, suit) {
        this.value = value
        this.suit = suit
    }
}

const values = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
]
const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']

let deckOfcards = []

for (let value of values) {
    for (let suit of suits) {
        if (value === 'J') {
            if (suit === 'Hearts') {
                deckOfcards.push(new Card(value, suit))
                continue
            }
        } else if (value === 'Q') {
            if (suit === 'Spades') {
                deckOfcards.push(new Card(value, suit))
                continue
            }
        } else if (value === 'K') {
            if (suit === 'Diamonds') {
                deckOfcards.push(new Card(value, suit))
                continue
            }
        } else {
            deckOfcards.push(new Card(value, suit))
        }
    }
}

const CardShuffle = () => {
    const [cards, setCards] = useState(deckOfcards)
    const [shuffleId, setShuffleId] = useState()

    const shuffling = (cards) => {
        let currentIndex = cards.length

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * cards.length)
            currentIndex -= 1

            let temp = cards[currentIndex]
            cards[currentIndex] = cards[randomIndex]
            cards[randomIndex] = temp
        }

        return cards
    }

    const handleShuffle = () => {
        let id = setInterval(() => {
            shuffling(deckOfcards)
            setCards(deckOfcards)
        }, 1000)

        setShuffleId(id)
    }

    const handleEndShuffle = () => {
        clearInterval(shuffleId)
    }

    return (
        <>
            <div style={{
                marginTop: '0.5rem', textAlign: 'end',
                padding: '0.7rem'
            }}>
                <button
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handleEndShuffle()}>
                    End
                </button>
                <button
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleShuffle()}>
                    Shuffle
                </button>
            </div>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {cards.map((card, index) => (
                    <li key={index} style={{
                        margin: "0.25rem 0", background: 'lightgrey',
                        padding: "0.25rem 0.5rem",
                        borderRadius: "5px",
                    }}>
                        {card.value} {card.suit}
                    </li>
                ))}
            </ul>
        </>

    )
}

export default CardShuffle
