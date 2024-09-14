import GlobalStyle from "./globalStyles";
import Component from "./wrapper/routes";

function App() {
  return (
    <div className="App">
      <GlobalStyle>
        <Component />
      </GlobalStyle>
    </div>
  );
}

export default App;
