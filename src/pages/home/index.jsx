import React from 'react'
import Login from '../Login';
import MyNavbar from "../../components/MyNavbar";
import Drawer from "../../components/Drawer";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const [visible, setvisible] = useState(false);
  return (
    <main>
      {localStorage.getItem("token") === null ? (
          <Login/>
          ) : (<>
            <MyNavbar visible={visible} drawr={setvisible} />
    
            <Drawer setvisible={setvisible} visible={visible} />
          </>
      )}

    </main>
  );
}

export default Home;