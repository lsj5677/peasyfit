import db from "@/utils/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from "@firebase/firestore";
import { TList } from "./list";

export type TUserList = {
  createdAt?: Date;
  list: string[];
  userId: string;
  id?: string;
};

export async function addList(userId: string, newList: TList) {
  const listRef = collection(db, `users/${userId}/list`);
  const createdAt = Timestamp.now();
  try {
    const docRef = await addDoc(listRef, {
      list: { ...newList },
      createdAt,
    });

    return docRef;
  } catch (error) {
    console.error("Error adding list", error);
  }
}

export async function getAllMyList(userId: string) {
  const userListRef = collection(db, `users/${userId}/list`);
  const listQuery = query(userListRef, orderBy("createdAt", "desc"));
  const snapShot = await getDocs(listQuery);

  return snapShot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getListById(userId: string, listId: string) {
  const listRef = doc(db, `users/${userId}/list/${listId}`);
  try {
    const snapShot = await getDoc(listRef);
    if (snapShot.exists()) {
      return { id: snapShot.id, ...snapShot.data() };
    } else {
      throw new Error("List not found");
    }
  } catch (error) {
    console.error("Error fetching list", error);
    throw error;
  }
}

export async function deleteListById(userId: string, listId: string) {
  const listRef = doc(db, `users/${userId}/list/${listId}`);
  return deleteDoc(listRef);
}
