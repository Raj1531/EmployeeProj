import { useEffect, useState } from "react"

const DisplayHoliday = () => {
  const [data, setData] = useState<any[]>([]);
 

  function getData() {
    fetch("http://localhost:5000/api/time")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
      <div style={{ padding: "50px" }}>
        <table className="table table-hover table-bordered table-striped text-center">
          <caption className="">List of CheckIn And CheckOut </caption>
          <thead>
            <tr>
              <th>Entry ID</th>
              <th>Employee ID</th>
              <th>CheckInDateTime</th>
              <th>CheckOutDateTime</th>
              <th>totalWorkingHours</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.entryID}</td>
                <td>{d.employeeID}</td>
                <td>{d.checkInDateTime}</td>
                <td>{d.checkOutDateTime}</td>
                <td>{d.totalWorkingHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
           
    
    </>
  );
};

export default DisplayHoliday;
