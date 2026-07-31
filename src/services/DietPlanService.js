import DietPlanModel from "../models/DietPlanModel";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

class DietPlanService {
    async add(data) {
        const newDietPlan = new DietPlanModel();
        newDietPlan.name = data.name;
        newDietPlan.description = data.description;
        newDietPlan.goal = data.goal;
        newDietPlan.duration = data.duration;

        return await addDoc(collection(db, "dietPlans"), { ...newDietPlan });
    }

    async all() {
        const querySnapshot = await getDocs(collection(db, "dietPlans"));
        const dietPlans = [];
        querySnapshot.forEach((doc) => {
            dietPlans.push({ id: doc.id, ...doc.data() });
        });
        return dietPlans;
    }

    async update(payload, id) {
        const docRef = doc(db, "dietPlans", id);
        return await updateDoc(docRef, payload);
    }

    async deleteDietPlan(id) {
        const docRef = doc(db, "dietPlans", id);
        return await deleteDoc(docRef);
    }
}

export default new DietPlanService();
