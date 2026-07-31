import { auth, db } from "../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import UserModel from "../models/UserModel";

class AuthService {
    async registerUser(data) {
        try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            // Create user model
            let newUser = new UserModel();
            newUser.name = data.name;
            newUser.email = data.email;
            newUser.phone = data.phone || "";
            newUser.address = data.address || "";
            newUser.userType = data.userType || "customer";

            // Save user data in Firestore
            await setDoc(doc(db, "users", user.uid), { ...newUser });
            
            return { id: user.uid, ...newUser };
        } catch (error) {
            throw error;
        }
    }

    async loginUser(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user details from Firestore
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = { id: user.uid, ...docSnap.data() };
                // Store in localStorage for persistence
                localStorage.setItem("user", JSON.stringify(userData));
                return userData;
            } else {
                throw new Error("User data not found in database.");
            }
        } catch (error) {
            throw error;
        }
    }

    async logoutUser() {
        try {
            await signOut(auth);
            localStorage.removeItem("user");
        } catch (error) {
            throw error;
        }
    }

    getCurrentUser() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
}

export default new AuthService();
