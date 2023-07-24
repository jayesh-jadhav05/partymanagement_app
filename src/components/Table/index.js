import React, { useState } from "react";
import "./styles.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditParty from "../EditDelete/editData";
import { deleteTransactionOnFirebase } from "../../hooks/deleteTransactionOnFirebase";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PartyTable = ({ fetchPartyDta, parties, search }) => {
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editParty, setEditParty] = useState();

  // Function to delete a party record
  const handleDelete = (party) => {
    deleteTransactionOnFirebase(user.uid, party);
    fetchPartyDta();
  };

  // Function to delete a party record
  const handleEdit = (party) => {
    setIsModalOpen(true);
    setEditParty(party);
  };

  // Filter parties based on the search input
  const filteredParties = parties.filter((party) => {
    const nameMatch = party.name.toLowerCase().includes(search.toLowerCase());
    const phoneMatch = party.phone.includes(search);
    return nameMatch || phoneMatch;
  });

  // JSX for rendering the table
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Party Name</th>
            <th>Mobile Number</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParties.map((partie, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{partie.name}</td>
              <td>{partie.phone}</td>
              <td style={{ color: "#BC5C5C" }}>-25.966 Gm</td>
              <td style={{ color: "#BC5C5C" }}>-14.200 kg</td>
              <td style={{ color: "#55A654" }}>+1,8550.00</td>
              <td>
                <button onClick={() => handleEdit(partie)}>
                  <AiOutlineEdit style={{ color: "#fff" }} />
                </button>
                <button onClick={() => handleDelete(partie)}>
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EditParty
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          fetchPartyDta={fetchPartyDta}
          editParty={editParty}
        />
      )}
    </div>
  );
};

export default PartyTable;
