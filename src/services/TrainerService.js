import { collection, addDoc, getDocs, doc, getDoc,deleteDoc, updateDoc } from "firebase/firestore";
import TrainerModel from '../models/TrainerModel'
import { db } from "../Firebase/FirebaseConfig";

class TrainerService {
    async add(data) {

        let newTrainer = new TrainerModel();

        newTrainer.name = data.name;
        newTrainer.specialization = data.specialsation;
        newTrainer.experience = data.experience;
        newTrainer.phoneno = data.phoneno
        newTrainer.email = data.email
        newTrainer.address= data.address
        newTrainer.image = data.image
        console.log("trainer: ", newTrainer)
        const docRef = await addDoc(collection(db, "trainers"), { ...newTrainer })
        return docRef;
    }


    async all() {
        const querySnapshot = await getDocs(collection(db, "trainers"));
        let trainers = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            trainers.push({ id: doc.id, ...doc.data() })
        });
        return trainers;
    }
    async single(id) {
        const docRef = doc(db, "trainers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    }


     async update(payload, id) {
        const trainerRef = doc(db, "trainers", id);
        return await updateDoc(trainerRef, payload);
    }

     async deletetrainer(id){
        const docRef = doc(db, "trainers", id);
         await deleteDoc(docRef)
    }



}
export default new TrainerService

