import Biscuit, { createBiscuit } from "biscuit-cache-js"
import React, { useEffect, useState } from "react"
import Executor, { useExecutor } from "executor-fn"

// const User = createBiscuit({ namespace: "user", secret: "love:you" })
// const Product = createBiscuit({ namespace: "product" })

const theName = Executor(name => name, {
    storeHistory: true,
    callNow: true,
    initialArgs: ["Ben"],
})

console.log('Milli seconds:', new Date(1759234466698))

const BiscuitCache = () => {

    const name = useExecutor(theName)

    const randomNames = () => {
        const names = ['Ben', 'Tom', 'Boyce', 'Mike', 'Chris']
        let index = Math.floor(Math.random() * 5)
        return names[index]
    }

    console.log('Random Name', randomNames())
    console.log('Online', Biscuit.isOnline())
    console.log('History', theName.history[theName.history.length - 1])

    useEffect(() => {
        // Biscuit.enableDebug()
        // const unsub = Biscuit.subscribeKey('name', theName)
        // const unsub = Biscuit.subscribeKey("name", Function(theName))

        const callme = async () => {
            // Biscuit.registerFetcher("rand", randomNames)
            // await Biscuit.ready()
            // await Biscuit.clear()
            const nameData = await Biscuit.get("name:history", { extend: false })
            if (nameData) theName.deserializeHistory(JSON.parse(nameData))
            console.log(theName.history)

            // if (!Biscuit.has("name")) {
            //     await Biscuit.set("name:history", name.value, 2 * 60 * 1000)
            // }
        }

        callme()

        // return unsub
    }, [])

    const handleMutate = async () => {
        const newName = randomNames()
        theName(newName)
        // await Biscuit.set("name:history", theName.serializeHistory(), 120000)
        await Biscuit.mutate("name:history", nameHistory => {
            nameHistory = JSON.parse(nameHistory)
            if (Array.isArray(nameHistory)) nameHistory.push(theName.history[theName.history.length - 1])
            return JSON.stringify(nameHistory)
        })
    }

    // useEffect(() => {
    //     (async () => {
    //         // await Biscuit.ready()
    //         User.enableDebug()
    //         Product.enableDebug()

    //         // Make sure something is stored (only do this once)
    //         // if (!Biscuit.has("first_name")) {
    //         await User.set("first_name", "SpongeBob", 1 * 60 * 1000)
    //         await User.set("last_name", "Squarepants", 1 * 60 * 1000)
    //         await User.set("email", "sponge@gmail.com", 1 * 60 * 1000)
    //         // }
    //         // if (!User.has("last_name")) {
    //         await Product.set("name", "Cooking pot", 1 * 60 * 1000)
    //         await Product.set("price", 2.99, 1 * 60 * 1000, {})
    //         // }
    //         // if (!User.has("email")) {
    //         // }

    //         console.log("User First name:", await User.get("first_name"))
    //         console.log("User Last name:", await User.get("last_name"))
    //         console.log("User Email:", await User.get("email"))

    //         console.log("Product Name:", await Product.get("name"))
    //         console.log("Product Price:", await Product.get("price"))

    //         console.log("User Size:", User.size())
    //         console.log("Product Size:", Product.size())

    //         // await Biscuit.remove("email")
    //         console.log("Internal state:", window.__BISCUIT__product)
    //     })();
    // }, []); // ✅ Run once after component mounts

    return (
        <>
            <h2>{name.value}</h2>
            <button onClick={() => handleMutate()}>Change name</button>
        </>
    )
};

export default BiscuitCache;

