import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EmployeeProps {
  employeeID: string;
  employeeName: string;
  employeeAge: string;
  employeeDOJ: string;
  employeeRemarks: string;
  employeeAcuredLeaves: string;
  employeeGender: string;
  roleID:string;
}

export default function EmployeeForm() {
  const [employee, setEmployee] = useState<EmployeeProps>({
    employeeID: "",
    employeeName: "",
    employeeAge: "",
    employeeDOJ: "",
    employeeRemarks: "",
    employeeAcuredLeaves: "",
    employeeGender: "",
    roleID:"",
  });
  const navigate = useNavigate();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  
 

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};
    
    if (!employee.employeeName.trim()) {
      errors.employeeName = "Name cannot be empty";
    } else if (employee.employeeName.trim().length < 4) {
      errors.employeeName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(employee.employeeName)) {
      errors.employeeName = "Name must be uppercase letter, lowercase letters only";
    }
    if (!employee.employeeID.trim()) {
      errors.employeeID = "ID cannot be empty";
    } else if (!/^\d+$/.test(employee.employeeID.trim())) {
      errors.employeeID = "ID must be a number";
    }

    if (!employee.employeeAge.trim()) {
      errors.employeeAge = "Age cannot be empty";
    } else if (!/^(1[8-9]|[2-7]\d|80)$/.test(employee.employeeAge.trim())) {
      errors.employeeAge = "Age not Valid";
    }

    if (!employee.employeeDOJ.trim()) {
      errors.employeeDOJ = "Date of Joining cannot be empty";
    } else {
      const dojDate = new Date(employee.employeeDOJ);
      const currentDate = new Date();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

      if (dojDate > currentDate || dojDate < twoMonthsAgo) {
        errors.employeeDOJ = "Date of Joining must be within the last two months";
      }
    }

    if (!employee.employeeRemarks.trim()) {
      errors.employeeRemarks = "Remarks cannot be empty";
    }

    if (!employee.employeeGender) {
      errors.employeeGender = "Gender cannot be empty";
    }

    if (!employee.employeeAcuredLeaves.trim()) {
      errors.employeeAcuredLeaves = "cannot empty";
    } else if (!/^\d+$/.test(employee.employeeAcuredLeaves.trim())) {
      errors.employeeAcuredLeaves = "Accrued Leave must be a valid number";
    } else if (parseInt(employee.employeeAcuredLeaves, 10) > 24) {
      errors.employeeAcuredLeaves = "Accrued Leaves cannot exceed 24 days per year";
    }
    if(errors){
      console.log(errors)
    }

    setErrorMsg(errors as Record<string, string>);

    return Object.keys(errors).length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasValidationErrors()) {
      console.log("Validation errors. Form not submitted.");
    } else {
      axios
        .post("http://localhost:5000/api/employee/", employee)
        .then((res) => {
          console.log(res);
          navigate("/DisplayEmployees");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log("isSubmitDisabled:", isSubmitDisabled);
    console.log("Component re-rendered");
    setIsSubmitDisabled(hasValidationErrors());
  }, [employee]);

  return (
    <div className="container border rounded p-4 mt-5">
      <h3 className="mb-4">Employee Registration</h3>
      <form className="row col-xxl" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="Id" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="Id"
            name="employeeID"
            value={employee.employeeID}
            onChange={handleChange}
          />
          {errorMsg.employeeID && <span style={{ color: "red" }}>{errorMsg.employeeID}</span>}
        </div>

        <div className="col-md-6">
          <label htmlFor="empName" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control"
            id="empName"
            name="employeeName"
            value={employee.employeeName}
            onChange={handleChange}
          />
          {errorMsg.employeeName && <span style={{ color: "red" }}>{errorMsg.employeeName}</span>}
        </div>

        <div className="col-md-6">
          <label htmlFor="age" className="form-label">
            Employee Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="employeeAge"
            value={employee.employeeAge}
            onChange={handleChange}
          />
          {errorMsg && <span style={{ color: "red" }}>{errorMsg.employeeAge}</span>}
        </div>
        <div className="col-6">
          <label htmlFor="dateOfjoining" className="form-label">
            Date of Joining
          </label>
          <input
            type="date"
            className="form-control"
            id="Dateofjoining"
            name="employeeDOJ"
            value={employee.employeeDOJ}
            onChange={handleChange}
          />
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeDOJ}</span>)}
        </div>
        <div className="col-md-6">
          <label htmlFor="remark" className="form-label">
            Employee Remark
          </label>
          <input
            type="text"
            className="form-control"
            id="remark"
            name="employeeRemarks"
            value={employee.employeeRemarks}
            onChange={handleChange}
          />
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeRemarks}</span>)}
        </div>
        <div className="col-md-4">
          <label htmlFor="Gender" className="form-label">
            Gender
          </label>
          <select
            id="Gender"
            className="form-select"
            name="employeeGender"
            value={employee.employeeGender}
            onChange={handleChange}
          >
            <option selected>Choose...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeGender}</span>)}
        </div>
        <div className="col-md-2">
          <label htmlFor="AccruedLeaves" className="form-label">
            Accrued Leaves
          </label>
          <input
            type="text"
            className="form-control"
            id="AccruedLeaves"
            name="employeeAcuredLeaves"
            value={employee.employeeAcuredLeaves}
            onChange={handleChange}
          />
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeAcuredLeaves}</span>)}
        </div>
        <div className="col-md-2">
          <label htmlFor="roleID" className="form-label">
            roleID
          </label>
          <input
            type="text"
            className="form-control"
            id="roleID"
            name="roleID"
            value={employee.roleID}
            onChange={handleChange}
          />
          </div>
        <div className="p-5 text-center">
          <button type="submit" className="btn btn-success" disabled={isSubmitDisabled}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}