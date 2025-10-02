import Executor from 'executor-fn'

export const aInput = Executor(input => input, {
    storeHistory: true,
    // callNow: true,
    // initialArgs: [{}],
    noDuplicate: true,
    // equalityFn: (a, b) => a === b,
    metadataFn: () => `user ${Math.floor(Math.random() * 3 + 1)}`,
    groupBy: (aInput) => `text--${aInput.temperation < 50 ? 'Low' : 'High'}`,
    onError: (err) => console.log(`Error! ${err}`)
})

