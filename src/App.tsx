import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import AllEmpDetails from './component/allEmpTable/AllEmpDetails';

const theme = createTheme()

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AllEmpDetails />
      </ThemeProvider>
    </div>
  );
}

export default App;
