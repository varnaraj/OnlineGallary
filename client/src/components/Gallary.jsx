import React from "react";
import "./gallary.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Grid } from "@mui/material";
// import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import Img1 from "../img/1.JPEG";
import Img2 from "../img/2.JPEG";
import Img3 from "../img/3.JPEG";
import Img4 from "../img/4.JPEG";
import Img5 from "../img/5.JPEG";
import Img6 from "../img/6.JPEG";
import Img7 from "../img/7.JPEG";
import Img8 from "../img/8.JPEG";
import Img9 from "../img/9.JPEG";

function Gallary() {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("http://localhost:8080/files/");

  const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
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
        // setUrl("http://localhost:8080/files/");
        
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
      window.location = "/";
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setImageInfos(response.data);
      console.log(response);
    });
  }, []);
  // let data = [
  //   {
  //     id: 1,
  //     imgSrc: Img1,
  //   },
  //   {
  //     id: 2,
  //     imgSrc: Img2,
  //   },
  //   {
  //     id: 3,
  //     imgSrc: Img3,
  //   },
  //   {
  //     id: 4,
  //     imgSrc: Img4,
  //   },
  //   {
  //     id: 5,
  //     imgSrc: Img5,
  //   },
  //   {
  //     id: 6,
  //     imgSrc: Img6,
  //   },
  //   {
  //     id: 7,
  //     imgSrc: Img7,
  //   },
  //   {
  //     id: 8,
  //     imgSrc: Img8,
  //   },
  //   {
  //     id: 9,
  //     imgSrc: Img9,
  //   },
  // ];
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography fontWeight={"bold"} fontSize={40}>
          My Gallary
        </Typography>
      </Box>
      <Box mt={4} sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* <Stack direction="row" alignItems="center" spacing={2}> */}
        <Button variant="contained" component="label">
          Upload
          <input hidden accept="image/*" multiple type="file" id="file" />
        </Button>
      </Box>
      <Box
      // mt={4}
      // // maxWidth="100"
      // component="span"
      // sx={{
      //   border: "1px solid black",
      //   display: "flex",
      //   // justifyContent: "space-evenly",
      //   // alignContent: "center",
      //   height: 300,
      //   width: 300,
      // }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Box
              mt={4}
              maxWidth="100%"
              component="span"
              sx={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-evenly",
                // alignContent: "center",
                height: 300,
                width: 300,
                backgroundPosition: "center",
              }}
            >
              <img src={Img5} alt="A img"></img>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <div className="gallary">
        {/* <Grid container item spacing={25} sx={{ ml: 5, mr: 5, mt: -2 }}> */}
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid container>
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
                    {/* {console.log(item.url)} */}

                    <img width={425} src={url + item.name} alt={item.name} />
                    {setUrl(url[6] + item.name)}
                    {console.log(url)}
                    {/* <img width={425} src={item.url} alt={item.name} /> */}
                  </Box>
                );
              })}
            </Grid>
          </Grid>
          {/* <Divider light /> */}
        </Grid>
        {/* </Grid> */}
      </div>
    </div>
  );
}

export default Gallary;
