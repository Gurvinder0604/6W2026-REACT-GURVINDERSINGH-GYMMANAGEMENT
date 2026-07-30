// import { Link } from "react-router-dom";
// import TrainerService from "../../../services/TrainerService";
// import { useEffect,  useState } from "react";
// import { PacmanLoader } from "react-spinners";
// import Swal from "sweetalert2";

// export default function ManageTrainers() {
   
   
//     const [trainer, setTrainers] = useState([])
//     const [loading, setLoading] = useState([])


//   async function fetchTrainer() {
//     let res = await TrainerService.all()
//     console.log(res)
//     setTrainers(res)
//   }


//   useEffect(() => {
//     fetchTrainer();
//   }, [])

//    async function deleteTrainer(id) {
//     try {

//       Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//       }).then((result) => {
//         if (result.isConfirmed) {
//           TrainerService.deletetrainer(id)
//           fetchTrainer();
//           Swal.fire({
//             title: "Deleted!",
//             text: "Your file has been deleted.",
//             icon: "success"
//           });
//         }
//       });





//     } catch (err) {
//       toast.error("Error Deleting Trainer")
//       console.log("Error: ", err)
//     }
//   }


//     return (
//         <>
//             {/* <div className="container mt-5">
//                 <h1 className="text-center">Manage Trainers</h1>
//                  </div> */}
//             <div className="container">

//                 <div class="d-flex justify-content-between my-4">
//                     <div >
//                         <h2>Manage Trainers</h2>
//                     </div>
//                     <div >
//                         <Link to="/admin/trainers/add"  >
//                             <li><button class="btn btn-primary">Add Trainer</button></li>
//                         </Link>
//                     </div>
//                 </div>
//             </div>

            
//             {/* <PacmanLoader
//           color="#81C408"
//           loading={loading}
          
//           size={50}
//           aria-label="Loading Spinner"
//           data-testid="loader"
//         /> */}


//             <div className="container">
//                 <table class="table table-border">

//                     <thead class="table-danger text-black">
//                         <tr>

//                             <th scope="col">Sr no.</th>
//                             <th scope="col">Name</th>
//                             <th scope="col">Specialsation</th>
//                             <th scope="col">Experience</th>
//                             <th scope="col">Phone No</th>
//                              <th scope="col"> Email</th>
//                          <th scope="col">Address</th>
//                          <th scope="col">Image</th>
//                          <th scope="col">Status</th>
//                          <th scope="col">CreatedAt</th>
                         
//                             <th scope="col">Action</th>

//                         </tr>
//                     </thead>
//                     <tbody>
                        
//                         {trainer.map((trainer, index) => (
                            
//                             <tr key={trainer.id || index}>
//                                 <td>
//                                     <p className="mb-0 mt-4">{index + 1}</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{trainer.name}</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{trainer.specialization }</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{trainer.experience }</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{trainer.phoneno}</p>
//                                 </td>
//                                  <td>
//                                     <p className="mb-0 mt-4">{trainer.email }</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{trainer.address}</p>
//                                 </td>
//                                 <td>
//                         <div className="d-flex align-items-center">
//                           <img
//                             src={trainer.image}
//                             className="img-fluid me-5 rounded-circle"
//                             style={{ width: 80, height: 80 }}
//                             alt=""
//                           />
//                         </div>
//                       </td>
                               
//                                 <td>
//                                     <p className="mb-0 mt-4">{trainer.status ? "Active" : "Inactive"}</p>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 mt-4">{new Date(trainer.createdAt).toLocaleDateString()}</p>
//                                 </td>
//                                 <td>
//                                     <div className="mt-4">
//                                         {/* Uncomment the Link wrapper once your imports are ready */}
//                                     {/* <Link to={`/admin/trainers/edit/${trainer.id}`}> */}
//                                     <Link to="{`/admin/trainers/edit/${trainer.id}`}">
//                                         <button className="btn btn-sm btn-outline-primary me-2" title="Edit">
//                                             <i className="bi bi-pencil-square"></i>
//                                         </button>
//                                          </Link> 
//                                           &nbsp;

//                                         <button onClick={() => { deleteTrainer(trainer.id) }} className="btn btn-sm btn-outline-danger" title="Delete">
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


import { Link } from "react-router-dom";
import TrainerService from "../../../services/TrainerService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ManageTrainers() {

    const [trainer, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchTrainer() {
        try {
            setLoading(true);
            let res = await TrainerService.all();
            console.log(res);
            setTrainers(res);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrainer();
    }, [])

    async function deleteTrainer(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await TrainerService.deletetrainer(id);
                fetchTrainer();

                Swal.fire({
                    title: "Deleted!",
                    text: "Trainer deleted successfully.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <>
            <div className="container">

                <div className="d-flex justify-content-between my-4">
                    <div>
                        <h2>Manage Trainers</h2>
                    </div>

                    <div>
                        <Link to="/admin/trainers/add">
                            <button className="btn btn-primary">
                                Add Trainer
                            </button>
                        </Link>
                    </div>
                </div>

                <table className="table table-bordered">

                    <thead className="table-danger text-black">
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Experience</th>
                            <th>Phone No</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {trainer.map((trainer, index) => (

                            <tr key={trainer.id || trainer._id || index}>

                                <td>{index + 1}</td>

                                <td>{trainer.name}</td>

                                <td>{trainer.specialization}</td>

                                <td>{trainer.experience}</td>

                                <td>{trainer.phoneno}</td>

                                <td>{trainer.email}</td>

                                <td>{trainer.address}</td>

                                <td>
                                    <img
                                        src={trainer.image}
                                        alt="trainer"
                                        className="img-fluid rounded-circle"
                                        style={{ width: "80px", height: "80px" }}
                                    />
                                </td>

                                <td>
                                    {trainer.status ? "Active" : "Inactive"}
                                </td>

                                <td>
                                    {new Date(trainer.createdAt).toLocaleDateString()}
                                </td>

                                <td>

                                    <Link
                                        to={`/admin/trainers/edit/${trainer.id || trainer._id}`}
                                    >
                                        <button
                                            className="btn btn-outline-primary btn-sm me-2"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </Link>

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteTrainer(trainer.id || trainer._id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}