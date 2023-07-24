import React, { useState } from "react";
import "./styles.css";
import ModalForm from "../AddPartyForm";
import PartyTable from "../Table";

const Card = ({ fetchPartyDta, parties }) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="card-container">
        <div className="card">
          <div className="toggle-btn">
            <p>Gold</p>
            <p>Silver</p>
            <p className="both">Both</p>
          </div>
          <div className="card-box">
            <div className="top">
              <p className="party">Party</p>
              <button onClick={() => setIsModalOpen(true)}>
                <span>+ </span>Add Party
              </button>
            </div>
            <div className="bottom">
              <div>
                <p style={{ fontWeight: "500" }}>Silver</p>
                <p style={{ color: "#BC5C5C", fontWeight: "500" }}>14.200</p>
                <p style={{ color: "#BC5C5C", fontWeight: "500" }}>Lena</p>
              </div>
              <div>
                <p style={{ fontWeight: "500" }}>Gold</p>
                <p style={{ color: "#BC5C5C", fontWeight: "500" }}>14.200</p>
                <p style={{ color: "#BC5C5C", fontWeight: "500" }}>Lena</p>
              </div>
              <div>
                <p style={{ fontWeight: "500" }}>Amount</p>
                <p style={{ color: "#55A654", fontWeight: "500" }}>₹‎ 14.200</p>
                <p style={{ color: "#55A654", fontWeight: "500" }}> Dena</p>
              </div>
            </div>
          </div>
        </div>

        <div className="export-box">
          <div className="input excel-pdf">
            <label htmlFor="excel">Excel </label>
            <input type="radio" name="export" id="excel" />
            <label htmlFor="pdf">PDF </label>
            <input type="radio" name="export" id="pdf" />
          </div>
          <hr />
          <div className="input detailed-summury">
            <label htmlFor="detailed">Detailed </label>
            <input type="radio" name="detailed" id="detailed" />
            <label htmlFor="summury">Summury </label>
            <input type="radio" name="detailed" id="summury" />
          </div>
          <div className="buttons">
            <button>Export</button>
            <button>Print</button>
          </div>
        </div>
      </div>
      <div className="search-bar">
        <div className="search">
          <input type="text" placeholder="Search Karigar" onChange={(e)=> setSearch(e.target.value)}/>
          <button>Search</button>
        </div>
        <button>Export</button>
      </div>

      <PartyTable parties={parties} fetchPartyDta={fetchPartyDta} search={search}/>

      {isModalOpen && (
        <ModalForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          fetchPartyDta={fetchPartyDta}
        />
      )}
    </div>
  );
};

export default Card;
