import db from "@/utils/firebase";
import {
  addDoc,
  collection,
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
};

// firestore api logic
export async function addList(userId: string, newList: TList) {
  const userListRef = collection(db, `users/${userId}/list`);
  const createdAt = new Date();
  try {
    const docRef = await addDoc(userListRef, {
      list: { ...newList },
      createdAt,
      userId,
    });

    return docRef;
  } catch (error) {
    console.error("Error adding list", error);
  }
}

export async function getAllMyList(userId: string) {
  console.log(`list firestore`, userId);
  const userListRef = collection(db, `users/${userId}/list`);
  const listQuery = query(userListRef, orderBy("createdAt", "desc"));
  const snapShot = await getDocs(listQuery);

  return snapShot.docs.map((doc: QueryDocumentSnapshot) => ({ ...doc.data() }));
}

export async function getList(userId: string) {}
