import Biscuit from "biscuit-cache-js"
import { useState, useEffect } from "react"

const BiscuitCache2 = () => {
    const [name, setName] = useState('Kel')

    const randomNames = () => {
        const names = ['Ben', 'Tom', 'Boyce', 'Mike', 'Chris']
        let index = Math.floor(Math.random() * 5)
        return names[index]
    }

    console.log('Online', Biscuit.isOnline())

    Biscuit.registerFetcher("rand", randomNames)
    useEffect(() => {
        // Biscuit.enableDebug()
        const unsub = Biscuit.subscribeKey("name", setName)

        console.log(Biscuit.getMissingFetcherIds())

        const callme = async () => {
            // await Biscuit.ready()
            // await Biscuit.clear()
            // let tn = await Biscuit.get("name")
            // setName(tn)

            if (!Biscuit.has("name")) {
                await Biscuit.set("name", name, 0.5 * 60 * 1000, {
                    fn: randomNames,
                    id: "rand",
                })
            }
        }
        callme()

        return unsub
    }, [])

    return (
        <h2>
            Current Name: {name}
        </h2>
    )
}

export default BiscuitCache2
