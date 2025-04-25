import "./App.css";
import List from "./views/List";
import { ThemeProvider } from "styled-components";
import { theme } from "./providers/theme";
import { useState } from "react";
import Navigationbar from "./components/Navigationbar";
import styled from "styled-components";

function App() {
  const [page, setPage] = useState<number>(0);
  
  const renderPage = () => {
    switch (page) {
      case 0:
        return <List />;
      case 1:
        return <div></div>;
      case 2:
        return <div></div>;
      default:
        return <List />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <ContentContainer>
          {renderPage()}
        </ContentContainer>
        <Navigationbar currentPage={page} changePage={setPage} />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 70px;
`;
