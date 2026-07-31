import React, { useEffect, useState } from 'react';
import MembershipService from '../../../services/MembershipService';
import AuthService from '../../../services/AuthService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/FirebaseConfig';

export default function BrowseMemberships() {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        const loadScript = () => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
        };
        loadScript();

        const fetchMemberships = async () => {
            try {
                const data = await MembershipService.all();
                setMemberships(data);
            } catch (error) {
                toast.error("Failed to load plans");
            }
            setLoading(false);
        };
        fetchMemberships();
    }, []);

    const handlePurchase = (plan) => {
        if (!user) {
            toast.error("Please login to purchase");
            navigate("/login");
            return;
        }

        const options = {
            key: "rzp_test_YOUR_KEY_HERE", // User will add testing key here
            amount: plan.price * 100, // Amount in paise
            currency: "INR",
            name: "Gym Management System",
            description: `Purchase ${plan.planname} Plan`,
            handler: async function (response) {
                try {
                    const userRef = doc(db, "users", user.id);
                    const startDate = new Date().toISOString().split('T')[0];
                    // Simple end date calculation assuming duration is in months (e.g., '3' for 3 months)
                    const durationMonths = parseInt(plan.duration) || 1;
                    const endDateObj = new Date();
                    endDateObj.setMonth(endDateObj.getMonth() + durationMonths);
                    const endDate = endDateObj.toISOString().split('T')[0];

                    const updateData = {
                        membershipId: plan.id,
                        membershipName: plan.planname,
                        membershipStartDate: startDate,
                        membershipEndDate: endDate
                    };

                    await updateDoc(userRef, updateData);
                    
                    // Update local storage
                    const updatedUser = { ...user, ...updateData };
                    localStorage.setItem("user", JSON.stringify(updatedUser));

                    toast.success("Payment Successful! Plan activated.");
                    navigate("/dashboard");
                } catch (error) {
                    toast.error("Error activating plan");
                }
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Browse Membership Plans</h2>
            <div className="row">
                {loading ? <div className="text-center">Loading...</div> : memberships.map((plan) => (
                    <div className="col-md-4 mb-4" key={plan.id}>
                        <div className="card shadow h-100 text-center">
                            <div className="card-header bg-dark text-white">
                                <h3>{plan.planname}</h3>
                            </div>
                            <div className="card-body">
                                <h2>₹{plan.price}</h2>
                                <p className="text-muted">Duration: {plan.duration} months</p>
                                <p>{plan.description}</p>
                                <button onClick={() => handlePurchase(plan)} className="btn btn-primary w-100">
                                    Purchase Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
