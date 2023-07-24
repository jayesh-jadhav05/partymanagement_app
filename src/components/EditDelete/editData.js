import React from "react";
import Modal from "react-modal";
import { MdPhotoCamera } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth} from "../../firebase";
import { updatePartyOnFirebase } from "../../hooks/updateParty";

const EditParty = ({ isModalOpen, setIsModalOpen, fetchPartyDta, editParty }) => {
  // Define the Yup validation schema
  const [user] = useAuthState(auth);
    
  // Initial form values
  const initialValues = {
    partyGroup: editParty.partyGroup,
    id:editParty.id,
    name: editParty.name,
    phone: editParty.phone,
    address: editParty.address,
    city: editParty.city,
    pincode: editParty.pincode,
    gstin: editParty.gstin,
    pan: editParty.pan,
    adhar: editParty.adhar,
  };

  const handleSubmit = async (party) => {
    // Handle form submission here
    updatePartyOnFirebase(user.uid, party);
    fetchPartyDta();

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        // To prevent a warning in some cases, but be aware of accessibility concerns
        ariaHideApp={false}
        style={{ width: "100px" }}
      >
        {/* Add your form content here */}
        <h2>
          Add Party <MdPhotoCamera />
        </h2>
        <AiOutlineClose onClick={closeModal} className="close" />

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="form-container">
              <div className="party-group">
                <label htmlFor="partyGroup">Party Group</label>
                <Field as="select" id="partyGroup" name="partyGroup">
                  <option value="">Select Party Group</option>
                  <option value="karagir">Karagir</option>
                  <option value="bullion">Bullion</option>
                  <option value="supplier">Supplier</option>
                  <option value="customer">Customer</option>
                  {/* Add more options as needed */}
                </Field>
                <ErrorMessage
                  name="partyGroup"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input-box">
                <div>
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter 10 digit number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="input-box">
                <div>
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="city">City</label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter City"
                  />
                  <ErrorMessage name="city" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="pincode">Pincode</label>
                  <Field
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Enter Pincode"
                  />
                  <ErrorMessage
                    name="pincode"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="input-box">
                <div>
                  <label htmlFor="gstin">GSTIN</label>
                  <Field
                    type="text"
                    id="gstin"
                    name="gstin"
                    placeholder="Enter 16 digit GSTIN"
                  />
                  <ErrorMessage
                    name="gstin"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="pan">PAN Number</label>
                  <Field
                    type="text"
                    id="pan"
                    name="pan"
                    placeholder="Enter 10 PAN number"
                  />
                  <ErrorMessage name="pan" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="adhar">Aadhar Number</label>
                  <Field
                    type="text"
                    id="adhar"
                    name="adhar"
                    placeholder="Enter 12 digit Adhar"
                  />
                  <ErrorMessage
                    name="adhar"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="submit-cancel">
                <button onClick={closeModal} className="cancel">
                  Cancel
                </button>
                <button type="submit" className="submit">
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default EditParty;
