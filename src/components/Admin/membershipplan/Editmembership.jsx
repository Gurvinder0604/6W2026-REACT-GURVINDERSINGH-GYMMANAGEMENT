// import { useEffect, useState } from "react"
// import MembershipService from "../../../services/MembershipService"
// import { toast } from "react-toastify"
// import { Navigate, useNavigate, useParams } from "react-router-dom"

// export default function Editmembership(){

//     const[planName, setPlanName]=useState('')
//     const nav=useNavigate()

//     // const [PlanName, setPlanName] = useState('')
//     const [Duration, setDuration] = useState('')
//     const [Price, setPrice] = useState('')
//     const [Description, setDescription] = useState('')

//     const useParams= useParams()


//     function Editmembership(e) {
//             e.preventDefault()
//             try {
//                 let payload = {
//                     name: planName,
//                     duration:Duration,
//                     price:Price,
//                     description: Description,
                   
    
//                 }
    
//                 MembershipService.update(payload,params.id)
                
    
//                 toast.success("Trainers Added")
//                 nav('/admin/membershipplan')
//             }catch(err){
//                 console.log("Error: ", err)
//                 toast.error("Error adding trainers")
//             }
    
//         }
//          async function getMembershipplanDetails(){
//             let res = await MembershipService.single(params.id)
//             if(res){
//                 console.log("Res: ", res);
                
//                 setPlanName(res.name)
//                 setDuration(res.Duration)
//                 setPrice(res.Price)
//                 setPhoneNo(res.phoneno)
//                 setDescription(res.description)
                
    
//             }else{
//                 toast.error("No such Document")
//             }
//         }
    
//         useEffect(()=>{
//             getMembershipplanDetails()
//         }, [])
    

//     return(
//         <>
        
//         <div className="container">

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

//              <div className="d-flex justify-content-center mt-5">

//                 <div className="col-lg-7">
//                     <form action="" onSubmit={Editmembership} className="" >


//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4" 
//                             value={planName}
//                             placeholder="Enter Trainer Name" onChange={(e) => { setPlanName(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Duration}
//                             placeholder="Enter Specialsation" onChange={(e) => { setDuration(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Price}
//                             placeholder="Enter Experience" onChange={(e) => { setPrice(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Description}
//                             placeholder="Enter Phoneno" onChange={(e) => { setDescription(e.target.value) }}
//                         />
                        
                        
                       
                        
//                         {/* <input
//                             type="file"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             placeholder="Enter Image" onChange={(e) => { setImage(e.target.files[0]) }}
//                         /> */}
                        





//                         <button
//                             className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
//                             type="submit"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>

//             </div>
        
        
//         </>
//     )
// }



import { useEffect, useState } from "react"
import MembershipService from "../../../services/MembershipService"
import { toast } from "react-toastify"
import { useNavigate, useParams, Link } from "react-router-dom"

export default function Editmembership() {
    const [planName, setPlanName] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false);

    const nav = useNavigate()
    const params = useParams()

    async function handleEditMembership(e) {
        e.preventDefault()
        setLoading(true);
        try {
            let payload = {
                planname: planName,
                duration: duration,
                price: price,
                description: description,
            }

            await MembershipService.update(payload, params.id)
            toast.success("Membership plan updated successfully")
            nav('/admin/membershipplan')
        } catch (err) {
            console.log("Error: ", err)
            toast.error("Error updating membership plan")
        }
        setLoading(false);
    }

    async function getMembershipplanDetails() {
        try {
            let res = await MembershipService.single(params.id)
            if (res) {
                setPlanName(res.planname || res.name || '')
                setDuration(res.duration || res.Duration || '')
                setPrice(res.price || res.Price || '')
                setDescription(res.description || '')
            } else {
                toast.error("No such Document")
            }
        } catch (err) {
            console.log("Error: ", err)
            toast.error("Error fetching plan details")
        }
    }

    useEffect(() => {
        if (params.id) {
            getMembershipplanDetails()
        }
    }, [params.id])

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4 text-primary">Edit Membership Plan</h3>
                            <form onSubmit={handleEditMembership}>
                                <div className="mb-3">
                                    <label>Plan Name</label>
                                    <input type="text" className="form-control" value={planName} onChange={(e) => setPlanName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label>Duration</label>
                                    <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label>Price</label>
                                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </div>
                                <div className="mb-4">
                                    <label>Description</label>
                                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Updating..." : "Update Plan"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}