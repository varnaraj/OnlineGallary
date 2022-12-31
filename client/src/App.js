import React from "react";
import Gallary from "./components/Gallary";
import MyGal from "./components/MyGal";

// import ImageUploadCard from "./components/ImageUploadCard";
import UploadImages from "./components/UploadImages";
import "bootstrap/dist/css/bootstrap.min.css";

// import SignUp from './components/SignUp'
function App() {
  return (
    <div className="App">
      {/* <SignUp/> */}
      <MyGal/>
      {/* <UploadImages /> */}
      {/* <Gallary /> */}
      {/* <ImageUploadCard /> */}
    </div>
  );
}

export default App;
