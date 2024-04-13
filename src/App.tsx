
import './App.css';
// import MyForm from './components/extra/My/MyForm';
// import MyFormPlain from './components/extra/My/MyFormPlain';
// import MyPractice from './components/extra/My/MyPractice';
// import TableWithCrud from './components/extra/Table/TableWithCrud';
import { Box, Modal, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Dashboard, Home } from '@mui/icons-material';
import ButtonAppBar from './component/registration/ButtonAppBar';
import UserInfoTable from './component/registration/userInfo/UserInfoTable';
import TaskInfoTable from './component/registration/taskInfo/TaskInfoTable';
import ProjectInfoTable from './component/registration/projectinfo/ProjectInfoTable';
import AssignedTaskTable from './component/registration/assignedTask/AssignedTaskTable';
import Signin from './component/registration/Signin';
import Signup from './component/registration/Signup';

const theme = createTheme()
const App: React.FC = () => {
  return (

    <div className="App">
      <ButtonAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/userinfo' element={<UserInfoTable />} />
        <Route path='/taskinfo' element={<TaskInfoTable />} />
        <Route path='/projectinfo' element={<ProjectInfoTable />} />
        <Route path='/assignedtask' element={<AssignedTaskTable />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      {/* <ThemeProvider theme={theme}>
        <AllEmpDetails />
      </ThemeProvider> */}

      {/* <Game /> */}

      {/* <TableWithCrud />. */}
      {/* <MyPractice name={"nidhi"} /> */}
      {/* <ThemeProvider theme={theme}>
        <MyForm />
      </ThemeProvider> */}
      {/* <MyFormPlain /> */}
    </div>
  );
}

export default App;