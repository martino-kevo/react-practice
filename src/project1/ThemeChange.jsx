import Biscuit from "biscuit-cache-js";
import { Executor, useExecutor } from "executor-fn";
import { useEffect } from "react";

// Biscuit.enableDebug();

const themeStore = Executor((theme) => theme, {
  callNow: true, // start immediately
  storeHistory: true, // enable undo/redo
  initialArgs: [(await Biscuit.get("theme", { extend: false })) || "light"], // set initial theme
  noDuplicate: true,
});

const ThemeChange = () => {
  const uiTtheme = useExecutor(themeStore);

  // console.log(themeStore.history);

  useEffect(() => {
    async function getTheme() {
      await Biscuit.set("theme", uiTtheme)
    }
    getTheme()
  }, [uiTtheme])

  const styles = {
    light: {
      background: "#ffffff",
      color: "#333",
      padding: "2rem",
      textAlign: "center",
      borderRadius: "12px",
    },
    dark: {
      background: "#222",
      color: "#f8f8f8",
      padding: "2rem",
      textAlign: "center",
      borderRadius: "12px",
    },
  };

  return (
    <>
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <label htmlFor="light">
          Light
          <input
            type="radio"
            id="light"
            name="theme"
            value="light"
            checked={themeStore.value === "light"}
            onChange={(e) => themeStore(e.target.value)}
            style={{ padding: "6px" }}
          />
        </label>
        <label htmlFor="dark">
          <input
            type="radio"
            id="dark"
            name="theme"
            value="dark"
            checked={themeStore.value === "dark"}
            onChange={(e) => themeStore(e.target.value)}
            style={{ padding: "6px" }}
          />
          dark
        </label>
      </div>

      <div style={styles[uiTtheme]}>
        <h2>{uiTtheme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}</h2>
        <p>Switch themes with the buttons above</p>
      </div>
    </>
  );
};

export default ThemeChange;
