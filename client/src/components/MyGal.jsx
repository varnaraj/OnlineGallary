import React from "react";
import "./gallary.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";

// import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";

function MyGal() {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (event) => {
    console.log(event);
    setCurrentFile(event.target.files[0]);
    // setPreviewImage(URL.createObjectURL(event.target.files[0]));
    // console.log(previewImage);
    setProgress(0);
    setMessage("");
  };

  const upload = () => {
    setProgress(0);

    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);

        return UploadService.getFiles();
      })
      .then((files) => {
        setImageInfos(files.data);
        console.log(files.data);
      })
      .catch((err) => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the Image!");
        }

        setCurrentFile(undefined);
      });
  };
  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setImageInfos(response.data);
      console.log(response);
    });
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography fontWeight={"bold"} fontSize={40}>
          Mathu Model Gallary
        </Typography>
      </Box>
      <Box mt={4} sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* <Stack direction="row" alignItems="center" spacing={2}> */}
        <Button variant="contained" component="label">
          Select
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            id="file"
            onChange={selectFile}
          />
        </Button>
      </Box>
      <Box mt={4} ml={10} mr={10}>
        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
      </Box>
      <Box mt={4} sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* <Stack direction="row" alignItems="center" spacing={2}> */}
        <Button
          color="success"
          onClick={upload}
          variant="contained"
          component="label"
        >
          Upload
        </Button>
      </Box>

      <Box mt={4} sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}
      </Box>

      <Box mt={3} sx={{ display: "flex" }}>
        <div className="gallary">
          {console.log("line 121"+ imageInfos)}
          {/* <Grid container item spacing={25} sx={{ ml: 5, mr: 5, mt: -2 }}> */}
          {/* <Grid item xs={12} sm={6}>
            <Grid container>
              <Grid container> */}
          {imageInfos.map((item, index) => {
            return (
              <Box
                sx={{
                  // display: "flex",
                  justifyContent: "space-between",
                  p: 0.2,
                  m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
                className="pics"
                key={index}
              >
                {console.log(item.url)}
                {console.log(
                  "line 141= http://ec2-13-213-36-94.ap-southeast-1.compute.amazonaws.com:8080/files/" +
                    item.name
                )}
                <img
                  width={425}
                  src={
                    "http://ec2-13-213-36-94.ap-southeast-1.compute.amazonaws.com:8080/files/" +
                    item.name
                  }
                  // src={item.imgSrc}
                  alt={item.id}
                />
                {/* <img width={425} src={item.url} alt={item.name} /> */}
              </Box>
            );
          })}
          {/* </Grid> */}
          {/* </Grid> */}
          {/* <Divider light /> */}
          {/* </Grid> */}
          {/* </Grid> */}
        </div>
      </Box>
    </div>
  );
}

export default MyGal;
