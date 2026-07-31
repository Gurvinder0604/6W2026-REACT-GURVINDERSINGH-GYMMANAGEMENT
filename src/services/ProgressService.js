import ProgressModel from "../models/ProgressModel";
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

class ProgressService {
    async add(data, userId) {
        const newProgress = new ProgressModel();
        newProgress.userId = userId;
        newProgress.weight = data.weight;
        newProgress.bodyFat = data.bodyFat;
        newProgress.notes = data.notes;
        newProgress.date = data.date;

        return await addDoc(collection(db, "progress"), { ...newProgress });
    }

    async getUserProgress(userId) {
        const q = query(collection(db, "progress"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const progressList = [];
        querySnapshot.forEach((doc) => {
            progressList.push({ id: doc.id, ...doc.data() });
        });
        // Sort by date descending
        return progressList.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    async deleteProgress(id) {
        const docRef = doc(db, "progress", id);
        return await deleteDoc(docRef);
    }
}

export default new ProgressService();
