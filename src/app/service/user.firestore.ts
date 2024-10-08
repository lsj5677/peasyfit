import db from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type TOAuthUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  image?: string | null;
};

export async function addUser(user: TOAuthUser) {
  if (!user) return undefined;

  const { id, email, name, image } = user;
  const createdAt = new Date();
  const userRef = doc(db, `users/${id}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    try {
      await setDoc(userRef, {
        id,
        name: name || "",
        image,
        email,
        username: email?.split("@")[0],
        createdAt,
      });
    } catch (error) {
      console.error("Error adding user", error);
    }
  }
  return userRef;
}

export async function getUser(id: string) {
  const userRef = doc(db, `users/${id}`);
  const snapShot = await getDoc(userRef);

  if (snapShot.exists()) {
    const userData = snapShot.data();

    if (userData.createdAt) {
      userData.createdAt = userData.createdAt.toDate();
    }
    return userData;
  } else {
    console.log("No such document!");
  }
}
