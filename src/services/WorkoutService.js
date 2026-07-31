import WorkoutModel from "../models/WorkoutModel";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

class WorkoutService {
    async add(data) {
        const newWorkout = new WorkoutModel();
        newWorkout.name = data.name;
        newWorkout.description = data.description;
        newWorkout.targetMuscle = data.targetMuscle;
        newWorkout.duration = data.duration;
        newWorkout.difficulty = data.difficulty;

        return await addDoc(collection(db, "workouts"), { ...newWorkout });
    }

    async all() {
        const querySnapshot = await getDocs(collection(db, "workouts"));
        const workouts = [];
        querySnapshot.forEach((doc) => {
            workouts.push({ id: doc.id, ...doc.data() });
        });
        return workouts;
    }

    async update(payload, id) {
        const docRef = doc(db, "workouts", id);
        return await updateDoc(docRef, payload);
    }

    async deleteWorkout(id) {
        const docRef = doc(db, "workouts", id);
        return await deleteDoc(docRef);
    }
}

export default new WorkoutService();
