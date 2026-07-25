import { useState } from "react"
import { toast } from "react-toastify"
import MembershipService from "../../../services/MembershipService";
import { useNavigate } from "react-router-dom";
export default function AddMembership(){

  const[planname,setPlanName] = useState('');
  const[duration,setDuration] = useState('');
  const[price,setPrice] = useState('');
  const[description,setDescription] = useState('');
  
  const nav = useNavigate()
  function addMembershipPlan(e){
    e.preventDefault();
     try {
            let payload = {
                planname: planname,
                duration: duration,
                price: price,
                description: description,
              
            }

            MembershipService.add(payload)

            toast.success("Membership added")
            nav(-1);

            
        }catch(e){
            toast.error("Error: ", e)
        }


    




  }


  return(

    <>

            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-danger display-6">Add Memberships</h1>
               
            </div>
            {/* Single Page Header End */}

            <div className="d-flex justify-content-center mt-5">

                <div className="col-lg-7">
                    <form onSubmit={addMembershipPlan}  >


                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Enter Plan name" onChange={(e) => { setPlanName(e.target.value) }}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Enter Duration" onChange={(e) => { setDuration(e.target.value) }}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Enter price" onChange={(e) => { setPrice(e.target.value) }}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Enter description" onChange={(e) => { setDescription(e.target.value) }}
                        />
                  

                        <button
                            className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>

      
    
    
    
    </>
  )
}