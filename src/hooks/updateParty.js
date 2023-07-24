import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updatePartyOnFirebase = async (userId, updatedFields) => {
  console.log("update", updatedFields)
  try {
    // Step 1: Get the document reference for the specific transaction in Firestore
    // using their uniqe doc id
    const partyRef = doc(
      db,
      `users/${userId}/parties/${updatedFields.id}`
    );
    const transactionDoc = await getDoc(partyRef); // Corrected: Use getDoc to fetch the transaction document
    if (transactionDoc.exists()) {
      // Step 2: Get the transaction data from the document
      const transactionData = transactionDoc.data();
      // Step 3: Update the desired fields of the transaction data with the new values
      const updatedTransaction = { ...transactionData, ...updatedFields };
      // Step 4: Update the transaction in Firestore
      await updateDoc(partyRef, updatedTransaction);
      alert("Party data updated successfully.");
    } else {
      alert("Party not found in the database.");
    }
  } catch (error) {
    alert(error.message);
  }
};
