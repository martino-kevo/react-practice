import { useState, useEffect, useRef } from 'react'
import './styles/Canvas.css'
import Executor, { useExecutor } from "executor-fn"

// == DRAW LINES ==
// const draw = (context) => {
//     context.strokeStyle = 'red' // Line colour
//     context.lineWidth = 10 // Line thickness
//     context.beginPath()
//     context.moveTo(0, 0) // Place brush on which path / co-ordinate
//     context.lineTo(300, 250)
//     context.lineTo(500, 100) // Draw line to which path / co-ordinate
//     context.lineTo(500, 500)
//     context.stroke()
// }

// == DRAW TRIANGLE ==
// const draw = (context) => {
//     context.fillStyle = 'yellow' // Fill colour
//     context.strokeStyle = 'black' // Stroke / border color
//     context.lineWidth = 5 // Stroke / border width
//     context.beginPath()
//     context.moveTo(300, 0) // Place brush on which path / co-ordinate
//     context.lineTo(0, 250) // Draw line to which path / co-ordinate
//     context.lineTo(600, 250)
//     context.lineTo(300, 0)
//     context.stroke() // fill() with stroke() for fill with stroke / border line
//     context.fill() // fill() with no stroke() for fill without stroke / border line
// }

// == DRAW RECTANGLE / SQURE ==
// const draw = (context) => {
//     context.fillStyle = 'black' // Fill colour
//     context.fillRect(0, 0, 300, 250)
//     context.strokeStyle = 'black' // Stroke / border color
//     context.strokeRect(0, 0, 300, 250)

//     context.fillStyle = 'red' // Fill colour
//     context.fillRect(0, 250, 300, 250)
//     context.strokeStyle = 'black' // Stroke / border color
//     context.strokeRect(0, 250, 300, 250)

//     context.fillStyle = 'green' // Fill colour
//     context.fillRect(300, 250, 300, 250)
//     context.strokeStyle = 'black' // Stroke / border color
//     context.strokeRect(300, 250, 300, 250)

//     context.fillStyle = 'blue' // Fill colour
//     context.fillRect(300, 0, 300, 250)
//     context.strokeStyle = 'black' // Stroke / border color
//     context.strokeRect(300, 0, 300, 250)
// }

// == DRAW CIRCLE ==
// (x-path, y-path, radius, starting-Angle, ending-Angle, counter-clockwise)
// Centre of circle will begin at x-path, y-path
// Radius - how wide circle would be
// const draw = (context) => {
//     context.fillStyle = 'lightblue'
//     context.strokeStyle = 'yellow'
//     context.lineWidth = 10
//     context.beginPath()
//     context.arc(300, 250, 200, 0, 2 * Math.PI)
//     // context.arc(300, 250, 50, 1, 2 * Math.PI) // Incomplete circle
//     // context.arc(300, 250, 50, 1, 2 * Math.PI, true) // Reverse incomplete circle
//     context.stroke()
//     context.fill()
// }

// == DRAW TEXT ==
// const draw = (canvas, context) => {
//     context.font = '50px MV Boli'
//     context.fillStyle = 'grey'
//     // context.fillText("YOU WIN!", 100, 100)
//     // Centre text within canvas
//     context.textAlign = 'center'
//     context.fillText(
//         "YOU WIN!", canvas.width / 2, canvas.height / 2
//     )
// }


const CanvasAPI = () => {
    const canvasRef = useRef(null)

    // Path: top-left 0, 0 -> top-right 500, 0 -> bottom-left 0, 500
    // -> bottom-right 500, 500
    const draw = (canvas, context) => {
        context.font = '50px MV Boli'
        context.fillStyle = 'grey'
        // context.fillText("YOU WIN!", 100, 100)
        // Centre text within canvas
        context.textAlign = 'center'
        context.fillText(
            "YOU WIN!", canvas.width / 2, canvas.height / 2
        )
    }

    useEffect(() => {
        const canvas = canvasRef.current // Like getElementById()
        const context = canvas.getContext('2d')

        draw(canvas, context)
    }, [draw])

    return (
        <>
            <canvas
                ref={canvasRef}
                className='myCanvas'
                width={'600'} height={'500'}>
            </canvas>
        </>
    )
}

export default CanvasAPI

// import React, { useRef, useEffect } from 'react'

// const Canvas = props => {
  
//   const canvasRef = useRef(null)
  
//   const draw = (ctx, frameCount) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
//     ctx.fillStyle = '#000000'
//     ctx.beginPath()
//     ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
//     ctx.fill()
//   }
  
//   useEffect(() => {
    
//     const canvas = canvasRef.current
//     const context = canvas.getContext('2d')
//     let frameCount = 0
//     let animationFrameId
    
//     //Our draw came here
//     const render = () => {
//       frameCount++
//       draw(context, frameCount)
//       animationFrameId = window.requestAnimationFrame(render)
//     }
//     render()
    
//     return () => {
//       window.cancelAnimationFrame(animationFrameId)
//     }
//   }, [draw])
  
//   return <canvas ref={canvasRef} {...props}/>
// }

// export default Canvas
