import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

export default function SingleBlog(props) {
  const user = useSelector((state) => state.user.data);

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/blogs/${props.match.params.id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };

  useEffect(() => {
    axios(options)
      .then(function (response) {
        console.log("handle sucss");
        setResponse(response.data.data);
        setPending(false);
      })
      .catch(function (error) {
        console.log("hande rror");
        console.log(error);
      });

    // return () => {
    //   null;
    // };
    console.log("heello", response, Pending);
  }, []);

  return Pending ? (
    <Loading />
  ) : (
    <Container className="p-4">
      <h1> Blog id : {response.id}</h1>
      <h1> Blog En title : {response.title.en}</h1>
      <h1> Blog AR title : {response.title.ar}</h1>
      <h1> Blog En short description: {response.short_description.en}</h1>
      <h1> Blog AR short description: {response.short_description.ar}</h1>
      <h1> Blog En short description :{response.description.en}</h1>
      <h1> Blog Ar short description :{response.description.ar}</h1>
      <h1> Blog Main Image : </h1>
      <img src={response.image} style={{ width: "200px" }} />

      <h1> Blog Images : </h1>

      {response.images.map((img) => (
        <img src={img.url} style={{ width: "200px", padding: "20px" }} />
      ))}
    </Container>
  );
}
