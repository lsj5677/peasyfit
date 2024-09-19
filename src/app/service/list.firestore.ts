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
} from "@firebase/firestore";
import { TList } from "./list";

export type TUserList = {
  createdAt?: Date;
  list: string[];
  userId: string;
  id?: string;
};

export type TRecord = {
  userId: string;
  id?: string;
  record: string[];
};

export async function addList(userId: string, newList: TList) {
  const listRef = collection(db, `users/${userId}/list`);
  const createdAt = new Date();
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
    const docSnapshot = await getDoc(listRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
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

export async function addRecord(
  userId: string,
  listId: string,
  newRecord: TRecord,
) {
  const recordRef = collection(db, `users/${userId}/list/${listId}/record`);
  const createdAt = new Date();
  try {
    const docRef = await addDoc(recordRef, {
      record: { ...newRecord },
      createdAt,
      userId,
    });

    return docRef;
  } catch (error) {
    console.error("Error adding list", error);
  }
}

export async function deleteRecordById(userId: string, recordId: string) {}
