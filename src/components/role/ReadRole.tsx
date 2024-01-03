import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReadRole = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  function getData() {
    fetch("http://localhost:5000/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const updateRole = (id: string) => {
    navigate("/EditRole/" + id);
  }

  const confirmDelete = (id: SetStateAction<null>) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }
  

  const executeDelete = (id: string) => {
    fetch("http://localhost:5000/api/roles/" + id, {
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
  const AddRole = () => {
    navigate("/AddRole/");
  }

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
      <div className="d-flex align-items-end flex-column">
        <button className="btn btn-info mt-3 me-4" onClick={AddRole}> + Add Role</button>
      </div>
      <div style={{ padding: "50px" }}>
        <table className="table table-hover table-bordered table-striped text-center">
          <caption className="">Role List </caption>
          <thead>
            <tr>
              <th>Role ID</th>
              <th>Role Name</th>
              <th>Role Status</th>
              <th>Rule Rights</th>
              <th>Created Date</th>
              <th>Role Description</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.roleID}</td>
                <td>{d.roleName }</td>
                <td>{d.roleStatus }</td>
                <td>{d.ruleRights }</td>
                <td>{d.createdDate }</td>
                <td>{d.roleDescription }</td>
                <td className="d-flex justify-content-evenly">
                  <input
                    type="button"
                    className="btn btn-success"
                    onClick={() => updateRole(d.roleID)}
                    value="Edit"
                  />
                  <br />
                  <input
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => confirmDelete(d.roleID)}
                    value="Delete"
                  />
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
              <p>Are you sure you want to delete this Employee Role?</p>
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

export default ReadRole;