import db from "@/utils/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from "@firebase/firestore";

export type TRecord = {
  userId?: string;
  id?: string;
  // record: Record<string, number | boolean | string>;
  record: any;
  createdAt?: Date;
  listId?: string;
};

export async function addRecord(
  userId: string,
  listId: string,
  newRecord: TRecord,
) {
  const recordRef = collection(db, `users/${userId}/list/${listId}/record`);
  const createdAt = Timestamp.now();
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
      const q = query(recordRef, orderBy("createdAt", "desc"), limit(5));
      const recordSnapshot = await getDocs(q);

      const records = recordSnapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000).toLocaleString()
          : "Unknown Date";

        return {
          id: doc.id,
          ...data,
          createdAt,
        };
      });

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
