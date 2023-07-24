import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteTransactionOnFirebase = async (userId, delteField) => {
  try {
    // Step 1: Get the document reference for the specific transaction in Firestore
    // using their uniqe doc id
    const transactionRef = doc(
      db,
      `users/${userId}/parties/${delteField.id}`
    );
    const transactionDoc = await getDoc(transactionRef); // Corrected: Use getDoc to fetch the transaction document
    if (transactionDoc.exists()) {
      // Step 2: Get the transaction data from the document
      const transactionData = transactionDoc.data();
      // Step 4: Update the transaction in Firestore
      await deleteDoc(transactionRef, transactionData);
      alert("Party Delete Successfully");
    } else {
      alert("Party not found in the database.");
    }
  } catch (error) {
    alert(error.message);
  }
};