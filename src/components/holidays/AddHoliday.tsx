import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface HolidayAddProps {
  HolidayAddData;
}

interface HolidayProps {
  holidayID: string;
  holidayName: string;
  holidayDateTime: string;
}

export default function HolidayForm(data: HolidayAddProps) {
  const [holiday, setHoliday] = useState<HolidayProps>({
    holidayID: "",
    holidayName: "",
    holidayDateTime: "",

  });
  const { opr } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHoliday({ ...holiday, [name]: value });
  };
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});

  const hasValidationErrors = () => {
    const errors = {};
  
    if (!holiday.holidayName.trim()) {
      errors.holidayName = "Name cannot be empty";
    } else if (holiday.holidayName.trim().length <= 4) {
      errors.holidayName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(holiday.holidayName)) {
      errors.holidayName= "Name must be uppercase letter, lowercase letters only";
    }
   

    if (!holiday.holidayDateTime.trim()) {
      errors.holidayDateTime = "Date cannot be empty";
    } else {
      const datetimeDate = new Date(holiday.holidayDateTime);
      const currentDate = new Date();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

      if (datetimeDate > currentDate || datetimeDate < twoMonthsAgo) {
        errors.holidayDateTime= "Date must be within the last two months";
      }
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
      .post("http://localhost:5006/api/holidays/", holiday)
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

