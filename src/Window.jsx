
const Window = () => {

    console.dir(window)
    console.log(window.innerWidth)
    console.log(window.innerHeight)
    console.log(window.outerWidth)
    console.log(window.outerHeight)
    console.log(window.scrollX)
    console.log(window.scrollY)
    // window.location.href = 'https://google.com/'
    console.log(window.location.href)
    console.log(window.location.hostname)
    console.log(window.location.pathname)


    return (
        <>
            <button onClick={() => window.open()}>Open</button>
            <button onClick={() => window.close()}>Close</button>
            <button onClick={() => window.print()}>Print</button>
        </>
    )
}

export default Window
