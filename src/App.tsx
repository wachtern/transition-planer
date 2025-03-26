import "./App.css";
import List from "./views/List";
import { ThemeProvider } from "styled-components";
import { theme } from "./providers/theme";
import { useState } from "react";

function App() {
  const [page, setPage] = useState<number>(0);
  return <ThemeProvider theme={theme}>{page === 0 && <List />}</ThemeProvider>;
}

export default App;
