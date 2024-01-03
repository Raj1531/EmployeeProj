import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditHoliday: React.FC = () => {
  const { id } = useParams();
  const [holiday, setHoliday] = useState<any>({});
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});


  useEffect(() => {
    axios.get(`http://localhost:5000/api/holiday/${id}`)
      .then((response) => {
        console.log("Fetched data: ", response)
        console.log("Fetched data: ", response)
        const holidayData = response.data[0];
        const formattedDate = new Date(holidayData.holidayDateTime).toISOString().split('T')[0];
        holidayData.holidayDateTime = formattedDate;
        setHoliday(holidayData);
      })
      .catch((error) => {
        console.error("Error fetching holiday data:", error);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHoliday({ ...holiday, [name]: value });
  };

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};

    if (!holiday.holidayName.trim()) {
      errors.holidayName = "Name cannot be empty";
    } else if (holiday.holidayName.trim().length <= 4) {
      errors.holidayName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(holiday.holidayName)) {
      errors.holidayName = "Name must be uppercase letter, lowercase letters only";
    }
    if (!holiday.holidayDateTime.trim()) {
      errors.holidayDateTime = "Date cannot be empty";
    }
    setErrorMsg(errors);
    return Object.keys(errors).length > 0;
  };


  const Backholiday = () => {
    navigate("/DisplayHolidays");
  }


  const updateHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasValidationErrors()) {
      console.log("Validation errors. Form not submitted.");
    } else {
      axios.put(`http://localhost:5000/api/holiday/${id}`, holiday)
        .then((response) => {
          console.log("Updated holiday:", response.data);
          navigate('/DisplayHolidays')
        })
        .catch((error) => {
          console.error("Error updating holiday:", error);
        });
    };
  };

  return (
    <div className="container border p-4 rounded mt-4">
      <h3 className="mb-4">Edit Holiday</h3>
      <form className="row g-3" onSubmit={updateHoliday}>

        <div className="col-md-6">
          <label htmlFor="holidayName" className="form-label">
            Holiday Name
          </label>
          <input
            type="text"
            className="form-control"
            id="holidayName"
            name="holidayName"
            value={holiday.holidayName}
            onChange={handleChange}
          />
          {errorMsg.holidayName && <span style={{ color: "red" }}>{errorMsg.holidayName}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="hoidayDateTime" className="form-label">
            Holiday Date
          </label>
          <input
            type="date"
            className="form-control"
            id="holidayDateTime"
            name="holidayDateTime"
            value={holiday.holidayDateTime}
            onChange={handleChange}
          />
          {errorMsg && <span style={{ color: "red" }}>{errorMsg.holidayDateTime}</span>}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-info me-3">Update</button>
          <button type="button" className="btn btn-danger" onClick={Backholiday}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default EditHoliday;
