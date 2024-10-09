import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';





import Login from './Login';
import Welcome from './Welcome';
import CreateEmployee from './CreateEmployee';
import EmployeeList from './EmployeeList';
import EmployeeEdit from './EmployeeEdit';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path='/Createemployee' element={<CreateEmployee/>}/>
        <Route path='/EmployeeList' element={<EmployeeList/>}/>
        <Route path='/edit-employee/:id' element={<EmployeeEdit/>}/>
         
        
      </Routes>
    </Router>
  );
};

export default App;
