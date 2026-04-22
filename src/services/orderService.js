import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../pages/config/firebase";

export const getOrders = async (userId) => {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    orderBy("date", "desc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addOrder = async (order) => {
  return await addDoc(collection(db, "orders"), order);
};

export const updateOrder = async (id, order) => {
  const docRef = doc(db, "orders", id);
  return await updateDoc(docRef, order);
};

export const deleteOrder = async (id) => {
  const docRef = doc(db, "orders", id);
  return await deleteDoc(docRef);
};
