import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



interface HolidayProps {
  holidayName: string;
  holidayDateTime: string;
}

export default function HolidayForm() {
  const [holiday, setHoliday] = useState<HolidayProps>({
    holidayName: "",
    holidayDateTime: "",

  });
  const { opr } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setHoliday({ ...holiday, [name]: value });
  };
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};

    if (!holiday.holidayName.trim()) {
      errors.holidayName = "Name cannot be empty";
    } else if (holiday.holidayName.trim().length <= 4) {
      errors.holidayName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(holiday.holidayName)) {
      errors.holidayName= "Name must be uppercase letter, lowercase letters only";
    }
   

    if (!holiday.holidayDateTime.trim()) {
      errors.holidayDateTime = "Date cannot be empty";
    } 
    
    setErrorMsg(errors);
    return Object.keys(errors).length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasValidationErrors()) {
      console.log("Validation errors. Form not submitted.");
    } else {
    axios
      .post("http://localhost:5000/api/holiday/", holiday)
      .then((res) => {
        console.log(res);
        navigate("/DisplayHolidays");
      })
      .catch((err) => console.log(err));
  }
};

  useEffect(() => {
    setIsSubmitDisabled(hasValidationErrors());
  }, [holiday,opr]);

  return (
    <div className="container border rounded p-4 mt-5 ">
      <h3 className="mb-4">Holiday Registration</h3>
      <form className="row col-xxl " onSubmit={handleSubmit}>
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
            required
          />
           {errorMsg.holidayName && <span style={{ color: "red" }}>{errorMsg.holidayName}</span>}
        </div>

        <div className="col-6">
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
            required
          />
           {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.holidayDateTime}</span>)}
        </div>
        <div className="p-5 text-center">
          <button type="submit" className="btn btn-success " disabled={isSubmitDisabled}>Submit</button>
        </div>
      </form>
    </div>
  );
}

