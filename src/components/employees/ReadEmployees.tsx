import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReadEmployees: React.FC = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>({});
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const updateEmployee = (id: string) => {
    navigate("/EditEmployee/" + id);
  }

  const confirmDelete = (id: SetStateAction<null>) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }

  const executeDelete = (id: string) => {
    fetch("http://localhost:5000/api/employee/" + id, {
      method: "DELETE"
    })
      .then(() => {
        setDeleteId(null);
        navigate("/DisplayEmployees");
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employee/${id}`)
      .then((response) => {
        console.log("Fetched data: ", response)
        const employeeData= response.data[0];
        setEmployee(employeeData)
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);
  
  const formatDate = (dateTimeString: string | number | Date) => {
    const date = new Date(dateTimeString); // Create a new Date object from the dateTimeString
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Employee Details</h3>
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">Employee Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Employee ID:</strong> {employee.employeeID}
            </li>
            <li className="list-group-item">
              <strong>Name:</strong> {employee.employeeName}
            </li>
            <li className="list-group-item">
              <strong>Age:</strong> {employee.employeeAge}
            </li>
            <li className="list-group-item">
              <strong>Date of Joining:</strong> {formatDate(employee.employeeDOJ)}
            </li>
            <li className="list-group-item">
              <strong>Remarks:</strong> {employee.employeeRemarks}
            </li>
            <li className="list-group-item">
              <strong>Gender:</strong> {employee.employeeGender}
            </li>
            <li className="list-group-item">
              <strong>Accrued Leaves:</strong> {employee.employeeAcuredLeaves}
            </li>
            <li className="list-group-item">
              <strong>Role ID:</strong> {employee.roleID}
            </li>
          </ul>
          <div className="d-flex gap-3 ms-3 pt-3">
            <input
              type="button"
              className="btn btn-info "
              onClick={() => updateEmployee(employee.employeeID)}
              value="Edit"
            />
            <br />
            <input
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => confirmDelete(employee.employeeID)}
                    value="Delete"
                  />
          </div>
        </div>
      </div>
      {deleteId && (
        <div className="modal-background">
          <div className="modal-card">
            <div className="card-body">
              <p>Are you sure you want to delete this employee?</p>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadEmployees;
