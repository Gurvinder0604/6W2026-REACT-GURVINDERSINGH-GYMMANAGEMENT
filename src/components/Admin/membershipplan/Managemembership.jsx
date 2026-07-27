// import { Link } from "react-router-dom"
// import MembershipService from "../../../services/MembershipService"
// import { useEffect, useState } from "react"
// import Swal from "sweetalert2"




// export default function Managemembership() {




//     const [membershipPlan, setMembershipPlan] = useState([])
//     const [loading, setLoading] = useState([])


//     async function fetchMembershipplan() {
//         let res = await MembershipService.all()
//         console.log( res)
//         setMembershipPlan(res)
//     }


//     useEffect(() => {
//         fetchMembershipplan();
//     }, [])

//     async function deletemembershipplan(id) {
//         try {

//             Swal.fire({
//                 title: "Are you sure?",
//                 text: "You won't be able to revert this!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Yes, delete it!"
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     MembershipService.deletemembershipplan(id)
//                     fetchMembershipplan();
//                     Swal.fire({
//                         title: "Deleted!",
//                         text: "Your file has been deleted.",
//                         icon: "success"
//                     });
//                 }
//             });





//         } catch (err) {
//             toast.error("Error Deleting Membershipplan")
//             console.log("Error: ", err)
//         }
//     }



//     return (
//         <>

//             <div className="container">

//                 <div class="d-flex justify-content-between my-4">
//                     <div >
//                         <h2>Manage Membership Plan</h2>
//                     </div>
//                     <div >
//                         <Link to="/admin/membershipPlan/add"  >
//                             <li><button class="btn btn-primary">Add Membership Plan</button></li>
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             <div className="container">
//                 <table class="table table-border">

//                     <thead class="table-danger text-black">
//                         <tr>

//                             <th scope="col">Sr no.</th>
//                             <th scope="col">Plan Name</th>
//                             <th scope="col">Duration</th>
//                             <th scope="col">Price</th>
//                             <th scope="col">Description</th>

                            
//                             <th scope="col">Status</th>
//                             <th scope="col">CreatedAt</th>

//                             <th scope="col">Action</th>

//                         </tr>
//                     </thead>
//                     <tbody>

//                         {membershipPlan.map((membershipPlan, index) => (

//                             <tr key={membershipPlan.id || index}>
//                                 <td>
//                                     <p className="mb-0 mt-4">{index + 1}</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{membershipPlan.planname}</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{membershipPlan.duration}</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{membershipPlan.price}</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{membershipPlan.description}</p>
//                                 </td>


//                                 <td>
//                                     <p className="mb-0 mt-4">{membershipPlan.status ? "Active" : "Inactive"}</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{new Date(membershipPlan.createdAt).toLocaleDateString()}</p>
//                                 </td>
//                                 <td>
//                                     <div className="mt-4">
//                                         {/* Uncomment the Link wrapper once your imports are ready */}
//                                         <Link to={`/admin/membershipplans/edit/${membershipPlan.id}`}>
//                                             <button className="btn btn-sm btn-outline-primary me-2" title="Edit">
//                                                 <i className="bi bi-pencil-square"></i>
//                                             </button>
//                                         </Link>
//                                         &nbsp;

//                                         <button onClick={() => { deletemembershipplan(membershipPlan.id) }} className="btn btn-sm btn-outline-danger" title="Delete">
//                                             <i className="bi bi-trash"></i>
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}

//                     </tbody>
//                 </table>
//             </div>


//         </>
//     )
// }



import { Link } from "react-router-dom"
import MembershipService from "../../../services/MembershipService"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

export default function Managemembership() {
    const [membershipPlan, setMembershipPlan] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchMembershipplan() {
        try {
            setLoading(true)
            let res = await MembershipService.all()
            console.log("Res: ", res)
            setMembershipPlan(res || [])
        } catch (err) {
            console.log("Error fetching membership plans: ", err)
            toast.error("Failed to load membership plans")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMembershipplan()
    }, [])

    async function deletemembershipplan(id) {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })

            if (result.isConfirmed) {
                await MembershipService.deletemembershipplan(id)
                await fetchMembershipplan()
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your membership plan has been deleted.",
                    icon: "success"
                })
            }
        } catch (err) {
            toast.error("Error deleting membership plan")
            console.log("Error: ", err)
        }
    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between my-4">
                    <div>
                        <h2>Manage Membership Plan</h2>
                    </div>
                    <div>
                        <Link to="/admin/membershipPlan/add">
                            <button className="btn btn-primary">Add Membership Plan</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <table className="table table-bordered">
                    <thead className="table-danger text-black">
                        <tr>
                            <th scope="col">Sr no.</th>
                            <th scope="col">Plan Name</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">CreatedAt</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {membershipPlan.map((plan, index) => (
                            <tr key={plan.id || index}>
                                <td>
                                    <p className="mb-0 mt-4">{index + 1}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{plan.planname || plan.name}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{plan.duration}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{plan.price}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{plan.description}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{plan.status ? "Active" : "Inactive"}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">
                                        {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </td>
                                <td>
                                    <div className="mt-4">
                                        <Link to={`/admin/membershipplans/edit/${plan.id}`}>
                                            <button className="btn btn-sm btn-outline-primary me-2" title="Edit">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </Link>

                                        <button 
                                            onClick={() => deletemembershipplan(plan.id)} 
                                            className="btn btn-sm btn-outline-danger" 
                                            title="Delete"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}