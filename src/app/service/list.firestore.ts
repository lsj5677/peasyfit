import db from "@/utils/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { TList } from "./list";

// firestore api logic
export const addList = async (userId: string, newList: TList) => {
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
};
