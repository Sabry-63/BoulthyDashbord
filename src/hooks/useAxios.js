import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (options) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // setData(option);
    // console.log(option);

    axios(options)
      .then(function (response) {
        // handle success
        console.log("    handle success");
        console.log(response);
        setData(response);
        setIsPending(false);
      })
      .catch(function (error) {
        console.log("    handle error");
        setError(error);
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        console.log(" always executed");
      });
  }, []);

  return { data, isPending, error };
};

export default useAxios;
