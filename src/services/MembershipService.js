import MemebershiptModel from '../models/MembershipModel'

import { addDoc,collection } from 'firebase/firestore'

import { db } from '../Firebase/FirebaseConfig'


class MembershipService{
    async add(data){
        let newMembership = new MemebershiptModel()
        newMembership.planname = data.planname
        newMembership.duration = data.duration
        newMembership.price = data.price
        newMembership.description = data.description

        await addDoc(collection(db, "products"), {...newProduct})
    }
}

export default new ProductService;