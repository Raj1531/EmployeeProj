import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayEmployee from './components/employees/DisplayEmployees'
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddEmployees from './components/employees/AddEmployees';
import EditEmployee from './components/employees/EditEmployees';
import ReadEmployees from './components/employees/ReadEmployees';
import ReadRole from './components/role/ReadRole';
import EditRole from './components/role/EditRole';
import AddRole from './components/role/AddRole';
import DisplayHoliday from './components/holidays/DisplayHoliday';
import EditHoliday from './components/holidays/EditHoliday';
import AddHoliday from './components/holidays/AddHoliday';
import AboutUs from './components/AboutUs';
import LearnMore from './components/LearnMore';
import DisplayTime from './components/Time/DisplayTime';
import ContactUs from './components/Contact';
import AddRecord from './components/Time/AddRecord';
import "./components/Deletecall.css"

function App() {

  return (
      <>
        <Router>
          <div className='App'>
            <Navbar />
            <Routes>
              <Route path='*' element={<Home />} />
              <Route path='/DisplayEmployees' element={<DisplayEmployee />} />
              <Route path='/ReadRole' element={<ReadRole />} />
              <Route path='/DisplayHolidays' element={<DisplayHoliday />} />
              <Route path='/DisplayTime' element={<DisplayTime />} />
              <Route path='/AddEmployee' element={<AddEmployees />} />
              <Route path='/AddRole' element={<AddRole />} />
              <Route path='/EditEmployee/:id' element={<EditEmployee />} />
              <Route path='/ReadEmployee/:id' element={<ReadEmployees />} />
              <Route path='/EditRole/:id' element={<EditRole />} />
              <Route path='/AddHoliday' element={<AddHoliday />} />
              <Route path='/EditHoliday/:id' element={<EditHoliday />} />
              <Route path='/learnMore' element={<LearnMore />} />
              <Route path='/ContactUs' element={<ContactUs />} />
              <Route path='/AboutUs' element={<AboutUs />} />
              <Route path='/AttendanceSheet' element={<AddRecord />} />
            </Routes>
          </div>
        </Router>
      </>
  );
}

export default App;