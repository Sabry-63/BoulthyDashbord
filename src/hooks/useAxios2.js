// import { useState, useEffect } from "react";
import axios from "axios";

const useAxios2 = (options, setResponse, setPending) => {
  axios(options)
    .then(function (response) {
      console.log("    handle success");
      // setResponse(response.data.data.data);
      // setPending(false);
    })
    .catch(function (error) {
      console.log("    handle error");
      console.log(error);
    });
};

export default useAxios2;
