import axios from "axios";

const hello = (options, setResponse, setPending, SetPage) => {
  axios(options)
    .then(function (response) {
      console.log("    handle success");
      setResponse(response.data.data.data);
      SetPage(response.data.data.meta);

      setPending(false);
      console.log(response.data.data.data);
    })
    .catch(function (error) {
      console.log("    hande error");
      console.log(error);
    });
};

export default hello;
