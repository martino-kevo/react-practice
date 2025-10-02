function ExecutorDebugger({ executor, title = "Executor" }) {
    if (!executor.history) return <p>{title}: No history enabled</p>;

    const saveSession = () => {
        localStorage.setItem(`${title}-history`, executor.serializeHistory());
    };

    const loadSession = () => {
        const data = localStorage.getItem(`${title}-history`);
        if (data) executor.deserializeHistory(JSON.parse(data));
    };

    return (
        <div style={{ marginTop: "1rem", borderTop: "1px solid #ccc", paddingTop: "0.5rem" }}>
            <h3>{title} History</h3>

            {/* Buttons for session management */}
            <div style={{ marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}>
                <button onClick={saveSession}>💾 Save</button>
                <button onClick={loadSession}>📂 Load</button>
                <button onClick={executor.clearHistory}>🧹 Clear</button>
            </div>

            {/* History List */}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {executor.history.map((entry, index) => (
                    <li key={index} style={{ margin: "0.25rem 0" }}>
                        <button
                            onClick={() => executor.jumpTo(index)}
                            style={{
                                background: executor.value === entry.value ? "#4caf50" : "#eee",
                                color: executor.value === entry.value ? "white" : "black",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "5px",
                                cursor: "pointer",
                                border: "none"
                            }}
                        >
                            {/* #{index} → {JSON.stringify(entry.value)} */}
                            {entry.meta ? `${entry.meta}` : ""}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExecutorDebugger