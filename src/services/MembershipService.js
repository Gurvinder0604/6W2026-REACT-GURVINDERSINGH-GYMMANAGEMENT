import MemebershiptModel from '../models/MembershipModel'

import { collection, addDoc, getDocs, doc, getDoc,deleteDoc, updateDoc } from "firebase/firestore";

import { db } from '../Firebase/FirebaseConfig'


class MembershipService{
    async add(data){
        let newMembership = new MemebershiptModel()
        newMembership.planname = data.planname
        newMembership.duration = data.duration
        newMembership.price = data.price
        newMembership.description = data.description

        await addDoc(collection(db, "memberships"), {...newMembership})
    }


      async all() {
        const querySnapshot = await getDocs(collection(db, "memberships"));
        let memberships = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            memberships.push({ id: doc.id, ...doc.data() })
        });
        return memberships;
    }
    async single(id) {
        const docRef = doc(db, "memberships", id);
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
        const trainerRef = doc(db, "memberships", id);
        return await updateDoc(trainerRef, payload);
    }

     async deletetrainer(id){
        const docRef = doc(db, "memberships", id);
         await deleteDoc(docRef)
    }


}

export default new MembershipService