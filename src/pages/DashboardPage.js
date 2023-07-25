import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar/sidebar";
import Card from "../components/Card";
import Table from "../components/Table";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const [parties, setParties] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchPartyDta = async () => {
    if (user) {
      const dataRef = query(collection(db, `users/${user.uid}/parties`));
      const querySnapshot = await getDocs(dataRef);
      let partiesArray = [];
      querySnapshot.forEach((doc) => {
        partiesArray.push({ ...doc.data(), id: doc.id });
      });
      setParties(partiesArray);
      // toast.success("Data Fetched!");
    }
  };

  useEffect(() => {
    // get all the docs from collections
    fetchPartyDta();
  }, [user]);

  const logout = () => {
    try {
      signOut(auth)
        .then(() => {
          alert("Lgout Suceessfully");
          navigate("/");
        })
        .catch((err) => {
          // toast.err(err.message);
        });
    } catch (err) {
      // toast.error(err.message);
    }
  };

  return (
    <div className="dashboard-box container">
      {user && (
        <h4 onClick={logout} className="profile">
          <FaUserCircle className="user-circle"/>
          Logout
        </h4>
      )}
      <SideBar />
      <Card fetchPartyDta={fetchPartyDta} parties={parties} />
      <Table fetchPartyDta={fetchPartyDta} parties={parties} />
    </div>
  );
};

export default Dashboard;
