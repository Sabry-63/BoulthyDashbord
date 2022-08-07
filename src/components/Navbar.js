import MyNavbar from "./MyNavbar";
import Drawer from "./Drawer";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [visible, setvisible] = useState(false);

  let location = useLocation();

  if (location.pathname !== "/")
    return (
      <>
        <MyNavbar visible={visible} drawr={setvisible} />

        <Drawer setvisible={setvisible} visible={visible} />
      </>
    );
  else return null;
}
