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
  userId?: string;
  id?: string;
  // record: Record<string, number | boolean | string>;
  record: any;
  createdAt?: Date;
  listId?: string;
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

///////////// record

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
      // listId,
    });

    return docRef;
  } catch (error) {
    console.error("Error adding list", error);
  }
}

export async function getAllRecord(userId: string) {
  try {
    const listRef = collection(db, `users/${userId}/list`);
    const listSnapshot = await getDocs(listRef);

    const recordPromises = listSnapshot.docs.map(async (listDoc) => {
      const listId = listDoc.id;
      const recordRef = collection(db, `users/${userId}/list/${listId}/record`);
      const q = query(recordRef, orderBy("createdAt", "desc"));
      const recordSnapshot = await getDocs(q);
      const records = recordSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        listId,
        records:
          records.length > 0
            ? records
            : [
                {
                  userId: "none",
                  record: listDoc.data().list,
                },
              ],
      };
    });

    return Promise.all(recordPromises);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

// 데이터 없는 경우 출력 X
// export async function getAllRecord(userId: string) {
//   try {
//     // get list
//     const listRef = collection(db, `users/${userId}/list`);
//     const listSnapshot = await getDocs(listRef);

//     // get record
//     const recordPromises = listSnapshot.docs.map(async (listDoc) => {
//       const recordRef = collection(
//         db,
//         `users/${userId}/list/${listDoc.id}/record`,
//       );
//       const recordSnapshot = await getDocs(recordRef);

//       // 데이터가 존재하면
//       if (!recordSnapshot.empty) {
//         return recordSnapshot.docs.map((doc) => doc.data());
//       }
//       // 데이터 없는 경우
//       return [];
//     });

//     const records = await Promise.all(recordPromises);
//     // 단일배열 만들기
//     return records.flat();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw new Error("Failed to fetch data. Please try again later.");
//   }
// }

export async function getRecordById(
  userId: string,
  listId: string,
  recordId: string,
) {
  const recordRef = doc(
    db,
    `users/${userId}/list/${listId}/record/${recordId}`,
  );
  try {
    const docSnapshot = await getDoc(recordRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      throw new Error("Record not found");
    }
  } catch (error) {
    console.error("Error fetching record:", error);
    throw error;
  }
}

export async function deleteRecordById(userId: string, recordId: string) {}
