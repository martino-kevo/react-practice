import { useState, useEffect } from "react";

const useKeyPress = (keyPressed) => {
    const [pressed, setPressed] = useState(null)

    useEffect(() => {
        const keyDown = (event) => {
            if (event.key === keyPressed) setPressed(true)
        }

        const keyUp = (event) => {
            if (event.key === keyPressed) setPressed(false)
        }

        window.addEventListener("keydown", keyDown)
        window.addEventListener("keyup", keyUp)

        return () => {
            window.removeEventListener("keydown", keyDown)
            window.removeEventListener("keyup", keyUp)
        }
    }, [keyPressed])

    return pressed
}

export default useKeyPress
