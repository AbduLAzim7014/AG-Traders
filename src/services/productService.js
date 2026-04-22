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
} from "firebase/firestore";
import { db } from "../pages/config/firebase";

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};

export const getProductBySlug = async (slug) => {
  const q = query(collection(db, "products"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } else {
    return null;
  }
};

export const addProduct = async (product) => {
  return await addDoc(collection(db, "products"), product);
};

export const updateProduct = async (id, product) => {
  const docRef = doc(db, "products", id);
  return await updateDoc(docRef, product);
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, "products", id);
  return await deleteDoc(docRef);
};
