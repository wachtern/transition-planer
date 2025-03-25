import { useState } from "react";
import "./App.css";
import List from "./views/List";

function App() {
  const [page, setPage] = useState<number>(0);

  return <>{page === 0 && <List />}</>;
}

export default App;
