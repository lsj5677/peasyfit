import { TOAuthUser } from "@/types/user";
import db from "@/utils/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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
