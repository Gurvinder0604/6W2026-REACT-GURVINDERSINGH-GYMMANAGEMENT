import { useState } from "react"
import { toast } from "react-toastify"
export default function Addmembership(){

  const[planname,setPlanName] = useState('');
  const[price,setPrice] = useState('');
  const[description,setDescription] = useState('');
  
  function addMembershipPlan(e){
    e.preventDefault();
     try {
            let payload = {
                planname: planname,
                price: price,
                description: description,
              
            }

            MembershipService.add(payload)

            toast.success("PA")

            
        }catch(e){
            toast.error("Error: ", e)
        }


    




  }


  return(

    <>

            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Add Product</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#">Pages</a>
                    </li>
                    <li className="breadcrumb-item active text-white">Add Product</li>
                </ol>
            </div>
            {/* Single Page Header End */}

            <div className="d-flex justify-content-center mt-5">

                <div className="col-lg-7">
                    <form action="" onSubmit={Addmembership} className=""  >


                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Enter Plan name" onChange={(e) => { setPlanName(e.target.value) }}
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