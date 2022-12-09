import axios from "axios";
import React, { useEffect, useState } from "react";
import { parse } from "json2csv";
import FileDownload from "js-file-download";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../src/App.css';
import moment from "moment";
const cors = require('cors');

function App () { 
  const [user, setUser] = useState([]); 
  const [apikey, setapikey] = useState("");
  const [tag, settag] = useState("");
  const [mincreate, setmincreate] = useState("");
  const [maxcreate, setmaxcreate] = useState("");

 

  const fetchData = async (e) => {
      const newres = await axios.get(`https://api.aftership.com/v4/trackings/?tag=${tag}&created_at_min=${mincreate}&created_at_max=${maxcreate}`, {
        headers: {
          "Content-Type": "application/json",
          "aftership-api-key": `${apikey}`
        },
        responseType: "blob"
      }).then((newres) => {
      
        FileDownload(newres.data, `${tag}_Report.csv`)})
  }

  return (
    <main>
      <h1 className="header">AfterShip account tracking number Download Tool</h1>
      <div className="left">
      <label> Please enter your API key </label>
      <Box
                sx={{
                    width: 500,
                   
                }}
                >
            <div className="main"><TextField required fullWidth label="API KEY" id="fullWidth" onChange={(event) => setapikey(event.target.value)} /></div>
            <label>Please enter the status</label>
            <div className="main"><TextField required fullWidth label="Status" type={"text"} id="fullWidth" onChange={(event) => settag(event.target.value)} /> </div>
            <label className="main">Please enter the Min create date</label>
            <div className="main"><TextField required className="main" fullWidth type={"date"} id="fullWidth" onChange={(event) => setmincreate(event.target.value)} /></div>
            <label className="main">Please enter the Max create date</label>
            <div className="main"><TextField required className="main" fullWidth type={"date"} id="fullWidth" onChange={(event) => setmaxcreate(event.target.value)} /></div>
            </Box>
    <button className="button" onClick={fetchData}> Download file </button>
    </div>
    
    </main>
  );

}

export default App;