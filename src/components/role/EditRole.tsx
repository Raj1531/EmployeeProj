import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRole: React.FC = () => {
    const { id } = useParams();
    const [role, setRole] = useState<any>({});
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/roles/${id}`)
            .then((response) => {
                console.log("Fetched data: ", response)
                const roleData = response.data[0];
                setRole(roleData)
            })
            .catch((error) => {
                console.error("Error fetching role data:", error);
            });
    }, [id]);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setRole({ ...role, [name]: value });
    };

    const hasValidationErrors = () => {
        const errors: Record<string, string> = {};
      
        if (!role.roleName.trim()) {
          errors.roleName = "Name cannot be empty";
        } else if (role.roleName.trim().length <= 4) {
          errors.roleName = "Name must have more than 4 letters";
        } else if (!/^[a-zA-Z. ]+$/.test(role.roleName)) {
          errors.roleName= "Name must be uppercase letter, lowercase letters only";
        }
        if (!role.roleID.trim()) {
          errors.roleID = "ID cannot be empty";
        } else if (!/^\d+$/.test(role.roleID.trim())) {
          errors.roleID = "ID must be a number";
        }
        if (!role.roleStatus) {
          errors.roleStatus = "status cannot be empty";
        }
        if (!role.createdDate.trim()) {
            errors.createdDate = "Date cannot be empty";
          } 
        if (!role.roleDescription) {
          errors.roleDescription = "Description cannot be empty";
        }
        if (!role.ruleRights) {
          errors.ruleRights = "RuleRights cannot be empty";
        }
        setErrorMsg(errors);
      
        return Object.keys(errors).length > 0;
      };
    const BackRole = () => {
        navigate("/ReadRole");
      }

    const updateRole = (e: React.FormEvent) => {
        e.preventDefault();
        if (hasValidationErrors()) {
            console.log("Validation errors. Form not submitted.");
          } else {
        axios.put(`http://localhost:5000/api/roles/${id}`, role)
            .then((response) => {
                console.log("Updated Role:", response.data);
                navigate('/ReadRole')
            })
            .catch((error) => {
                console.error("Error updating Role:", error);
            });
    };
};

    return (
        <div className="container border rounded p-4 mt-4">
            <h3 className="mb-4">Edit Role</h3>
            <form className="row col-xxl" onSubmit={updateRole}>
                <div className="col-md-6">
                    <label htmlFor="roleid" className="form-label">
                        Role ID
                    </label>
                    <input
                        type="id"
                        className="form-control"
                        id="roleid"
                        name="roleID"
                        disabled
                        value={role.roleID}
                        onChange={handleChange}
                    />
                    {errorMsg.roleID && <span style={{ color: "red" }}>{errorMsg.roleID}</span>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="roleName" className="form-label">
                        Role Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="roleName"
                        name="roleName"
                        value={role.roleName}
                        onChange={handleChange}
                    />
                    {errorMsg.roleName && <span style={{ color: "red" }}>{errorMsg.roleName}</span>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="ruleRigths" className="form-label">
                        Rule Rights
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="ruleRights"
                        name="ruleRights"
                        value={role.ruleRights}
                        onChange={handleChange}
                    />
                     {errorMsg.ruleRights  && <span style={{ color: "red" }}>{errorMsg.ruleRights}</span>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="roleStatus" className="form-label">
                        Status
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="roleStatus"
                        name="roleStatus"
                        value={role.roleStatus}
                        onChange={handleChange}
                    />
                    {errorMsg.roleStatus && <span style={{ color: "red" }}>{errorMsg.roleStatus}</span>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="createdDate" className="form-label">
                        Created Date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="createdDate"
                        name="createdDate"
                        value={role.createdDate}
                        onChange={handleChange}
                    />
                    {errorMsg.currentDate && <span style={{ color: "red" }}>{errorMsg.createdDate}</span>}
                </div>


                <div className="col-md-6 me-3">
                    <label htmlFor="roleDescription" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="roleDescription"
                        name="roleDescription"
                        value={role.roleDescription}
                        onChange={handleChange}
                    />
                    {errorMsg.roleDescription && <span style={{ color: "red" }}>{errorMsg.roleDescription}</span>}
                </div>

                <div className="p-5 text-center">
                    <button type="submit" className="btn btn-success me-3">
                        Update
                    </button>
                    <button type="reset" className="btn btn-danger " onClick={BackRole}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default EditRole;