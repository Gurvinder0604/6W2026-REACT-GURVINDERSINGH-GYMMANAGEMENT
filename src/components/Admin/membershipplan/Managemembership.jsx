import { Link } from "react-router-dom"
import MembershipService from "../../../services/MembershipService"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"




export default function Managemembership() {




    const [membershipPlan, setMembershipPlan] = useState([])
    const [loading, setLoading] = useState([])


    async function fetchTrainer() {
        let res = await MembershipService.all()
        console.log("Res", res)
        setMembershipPlan(res)
    }


    useEffect(() => {
        fetchTrainer();
    }, [])

    async function deleteTrainer(id) {
        try {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    TrainerService.deletetrainer(id)
                    fetchTrainer();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });





        } catch (err) {
            toast.error("Error Deleting Trainer")
            console.log("Error: ", err)
        }
    }



    return (
        <>

            <div className="container">

                <div class="d-flex justify-content-between my-4">
                    <div >
                        <h2>Manage Membership Plan</h2>
                    </div>
                    <div >
                        <Link to="/admin/membershipPlan/add"  >
                            <li><button class="btn btn-primary">Add Membership Plan</button></li>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <table class="table table-border">

                    <thead class="table-danger text-black">
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

                        {membershipPlan.map((membershipPlan, index) => (

                            <tr key={membershipPlan.id || index}>
                                <td>
                                    <p className="mb-0 mt-4">{index + 1}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{membershipPlan.planname}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{membershipPlan.duration}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{membershipPlan.price}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{membershipPlan.description}</p>
                                </td>


                                <td>
                                    <p className="mb-0 mt-4">{membershipPlan.status ? "Active" : "Inactive"}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{new Date(membershipPlan.createdAt).toLocaleDateString()}</p>
                                </td>
                                <td>
                                    <div className="mt-4">
                                        {/* Uncomment the Link wrapper once your imports are ready */}
                                        <Link to={`/admin/membershipplans/edit/${membershipPlan.id}`}>
                                            <button className="btn btn-sm btn-outline-primary me-2" title="Edit">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </Link>
                                        &nbsp;

                                        <button onClick={() => { deletemembershipplan(membershipPlan.id) }} className="btn btn-sm btn-outline-danger" title="Delete">
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