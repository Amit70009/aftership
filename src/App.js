import axios from "axios";
import React, { useEffect, useState } from "react";
import { parse } from "json2csv";
import FileDownload from "js-file-download";
const cors = require('cors');

function App () { 
  const [user, setUser] = useState([]);

 const fetchData = async (e) => {
      const newres = await axios.get("https://api.aftership.com/v4/trackings/?tag=Exception", {
        headers: {
          "Content-Type": "application/json",
          "aftership-api-key": "asat_4cdc59b79a484dfb83418a4975de728f"
        },
        responseType: "blob"
      }).then((newres) => {
        console.log(newres);
        FileDownload(newres.data, "ExceptionReport.csv")})
  }

  return (
    <main>
      <h1>Please click here to download the file</h1>
    <button onClick={fetchData}> Download file </button>
    </main>
  );
}

export default App;