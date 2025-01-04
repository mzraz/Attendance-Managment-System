import * as React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import AddEmployeForm from "../Employee/AddEmployee/AddEmployee";
import UserRights from "../AdminModule/UserRights/UserRights";
import DashboradHome from "./DashboradHome";
import AdminManualAttendance from "../ManualAttendance/AdminManualAttendance";
import EmployeeReport from "../ReportModule/EmployeeReport/EmployeeReport";
import AddCompanies from "../AdminModule/AddCompanies/AddCompanies";
import AddStoreLocation from "../AdminModule/AddStoreLocation/AddStoreLocation";
import BasicLeave from "../leaveModule/BasicLeave";
import LeaveReport from "../ReportModule/LeaveReport/LeaveReport";
import AttendanceReport from "../ReportModule/AttendanceReport/AttendanceReport";
import CalendarView from "../RotaModule/CalenderView/calendar";
import RotaShedule from "../RotaModule/RotaShedule/RotaShedule";
import FirmManagement from "../FirmManagement/FirmManagement";
import StoreLocationList from "../AdminModule/AddStoreLocation/StoreLocationList";
import EmployeeList from "../Employee/AddEmployee/EmployeeList";
import AdminManualAttendanceList from "../ManualAttendance/AdminManualAttendanceList";
import BasicLeaveList from "../leaveModule/BasicLeaveList";
import GroupedFeatures from "./GroupedFeatures";

export default function Dashboard() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [state, setState] = React.useState({
    session:[],
  });
  return (
   
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 12,
          pl: 0,
          pb: 10,
          backgroundColor: "#fff",
        }}
      >
        <Routes>
          <Route exact path="/AddEmployee" element={<AddEmployeForm />} />
          <Route exact path="/AddEmployee/:id" element={<AddEmployeForm />} />
          <Route exact path="/EmployeeList" element={<EmployeeList />} />
          <Route exact path="/AdminManualAttendance" element={<AdminManualAttendance />} />
          <Route exact path="/AdminManualAttendance/:id" element={<AdminManualAttendance />} />
          <Route exact path="/AdminManualAttendanceList" element={<AdminManualAttendanceList />} />
          <Route exact path="/EmployeeReport" element={<EmployeeReport />} />
          <Route exact path="/LeaveReport" element={<LeaveReport />} />
          <Route exact path="/UserRights" element={<UserRights />} />
          <Route exact path="/AddStoreLocation/:id" element={<AddStoreLocation />} />
          <Route exact path="/AddStoreLocation" element={<AddStoreLocation />} />
          <Route exact path="/BasicLeave" element={<BasicLeave />} />
          <Route exact path="/BasicLeave/:id" element={<BasicLeave />} />
          <Route exact path="/BasicLeaveList" element={<BasicLeaveList />} />
          <Route exact path="/AddCompanies" element={<AddCompanies />} />
          <Route exact path="/AttendanceReport" element={<AttendanceReport />} />
          <Route exact path="/CalendarView" element={<CalendarView />} />
          <Route exact path="/RotaShedule" element={<RotaShedule />} />
          <Route exact path="/FirmManagement" element={<FirmManagement />} />
          <Route exact path="/StoreLocationList" element={<StoreLocationList />} />       
          <Route exact path="/GroupedFeatures" element={<GroupedFeatures />} />       
          <Route exact path="/GroupedFeatures/:groupId" element={<GroupedFeatures />} />       
          <Route exact path="*" element={<DashboradHome />} />
        </Routes>
      </Box>
     
    
  );
}
