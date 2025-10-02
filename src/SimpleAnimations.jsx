import Executor, { useExecutor } from "executor-fn"

const x = Executor(x => x, {
    // storeHistory: true,
    callNow: true,
    initialArgs: [0],
})

const y = Executor(y => y, {
    // storeHistory: true,
    callNow: true,
    initialArgs: [0],
})

const scaleX = Executor(scaleX => scaleX, {
    // storeHistory: true,
    callNow: true,
    initialArgs: [1],
})

const scaleY = Executor(scaleY => scaleY, {
    // storeHistory: true,
    callNow: true,
    initialArgs: [1],
})

const degrees = Executor(degrees => degrees, {
    // storeHistory: true,
    callNow: true,
    initialArgs: [0],
})

const both = Executor.combine(x, y)

const SimpleAnimations = () => {
    const xPos = useExecutor(x)
    const yPos = useExecutor(y)
    const myScaleX = useExecutor(scaleX)
    const myScaleY = useExecutor(scaleY)
    const myDegrees = useExecutor(degrees)

    const handleBegin = () => {
        const id = setInterval(frame, 5)

        function frame() {
            if (myScaleX.value <= 0.1 || myScaleY.value <= 0.1) {
                clearInterval(id)
                console.log(id)
            } else {
                scaleX(scaleX.value - 0.01)
                scaleY(scaleY.value - 0.01)
            }
        }
    }

    // const handleBegin = () => {
    //   const id = setInterval(frame, 5)
    //   // console.log(id)
    //   // setTimerId(id)

    //   function frame() {
    //     if (xPos.value >= 250 || yPos.value >= 250) {
    //       clearInterval(id)
    //       console.log(id)
    //     } else {
    //       x(x.value + 1)
    //       y(y.value + 1)
    //       degrees(degrees.value + 5)
    //     }
    //   }
    // }

    // useEffect(() => {
    //   const move = (event) => {
    //     switch (event.key) {
    //       case "ArrowDown":
    //         setY(y + 10)
    //         break
    //       case "ArrowUp":
    //         setY(y - 10)
    //         break
    //       case "ArrowRight":
    //         setX(x + 10)
    //         break
    //       case "ArrowLeft":
    //         setX(x - 10)
    //         break
    //       default:
    //         break
    //     }
    //   }

    //   window.addEventListener("keydown", move)

    //   return () => window.removeEventListener("keydown", move)
    // }, [x, y])

    return (
        <>
            <button className='myBtn'
                onClick={() => handleBegin()}>
                Begin
            </button>
            <button className='myBtn'
                onClick={() => both.reset()}>
                Reset
            </button>

            <div className='myDiv'
                style={{
                    transform: "scale(" + myScaleX.value + ',' + myScaleY.value + ")"
                }}>
            </div>


            {/* <div className='myDiv'
                style={{
                transform: 'rotateZ(' + myDegrees.value + 'deg)',
                top: yPos.value + 'px', left: xPos.value + 'px'
                }}>
            </div> */}
        </>
    )
}

export default SimpleAnimations
