import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

class UserService {
    async allCustomers() {
        const querySnapshot = await getDocs(collection(db, "users"));
        let customers = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.userType === "customer") {
                customers.push({ id: doc.id, ...data });
            }
        });
        return customers;
    }
}

export default new UserService();
