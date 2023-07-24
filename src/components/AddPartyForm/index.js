import React from "react";
import "./styles.css";
import Modal from "react-modal";
import { MdPhotoCamera } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";

const ModalForm = ({ isModalOpen, setIsModalOpen, fetchPartyDta }) => {
  // Define the Yup validation schema
  const [user] = useAuthState(auth);

  const validationSchema = Yup.object().shape({
    partyGroup: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    phone: Yup.string()
      .required("Required")
      .matches(/^\d+$/, "Invalid phone number"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    pincode: Yup.string()
      .required("Required")
      .matches(/^\d{6}$/, "Invalid pincode"),
    gstin: Yup.string().required("Required"),
    pan: Yup.string()
      .required("Required")
      .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Invalid PAN number"),
    adhar: Yup.string()
      .required("Required")
      .matches(/^\d{12}$/, "Invalid Aadhar number"),
  });

  // Initial form values
  const initialValues = {
    partyGroup: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    gstin: "",
    pan: "",
    adhar: "",
  };

  const handleSubmit = async (values) => {
    // Handle form submission here
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/parties`),
        values
      );
      alert("Party Added!");
      closeModal();
      fetchPartyDta();
    } catch (err) {
      alert("Couldn't add party");
    }
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
          validationSchema={validationSchema}
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
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalForm;
