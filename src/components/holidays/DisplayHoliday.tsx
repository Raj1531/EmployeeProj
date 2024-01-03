import {SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Deletecall.css";


const DisplayHoliday = () => {
  const [data, setData] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  function getData() {
    fetch("http://localhost:5000/api/holiday")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const updateHoliday= (id: string) => {
    navigate("/EditHoliday/" + id);
  }

  const AddHolidays = () => {
    navigate("/AddHoliday/");
  }
  
  const confirmDelete = (id: SetStateAction<null>) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }

  const executeDelete = (id: string) => {
    fetch("http://localhost:5000/api/holiday/" + id, {
      method: "DELETE"
    })
      .then(() => {
        getData();
        setDeleteId(null);
      })
      .catch((err) => {
        console.log(err.message)
      });
  }
 
  useEffect(() => {
    getData();
  }, [data]);
  return (
    <>
       <div className="d-flex align-items-end flex-column">
        <button className="btn btn-info mt-3 me-4" onClick={AddHolidays}> + Add Holidays</button>
      </div>
      <div style={{ padding: "50px" }}>
        <table className="table table-hover table-bordered table-striped text-center">
          <caption className="">List of Holidays </caption>
          <thead>
            <tr>
              <th>Holiday ID</th>
              <th>Holiday Name</th>
              <th>Holiday Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.holidayID}</td>
                <td>{d.holidayName}</td>
                <td>{d.holidayDateTime}</td>
                <td className="d-flex justify-content-evenly">
               
                  <input
                    type="button"
                    className="btn btn-success"
                    onClick={() => updateHoliday(d.holidayID)}
                    value="Edit"
                  />
                  <br />
                  <input
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDelete(d.holidayID)}
                    value="Delete"
                  />
                  <br />
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId && (
        <div className="modal-background">
          <div className="modal-card">
            <div className="card-body">
              <p>Are you sure you want to delete this holiday?</p>
              <div className="d-flex justify-content-evenly">
              <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayHoliday;
