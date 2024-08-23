// import {Form} from "react-router-dom"

const TicketForm = () => {
  return<>

  <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <form method= "POST" className="post m-5"style={{width: "75%"}}>
       <div className="mb-3">
    <label htmlFor="id" 
    className="form-label">Name</label>
    <input type="text" 
    name = "name"
    placeholder="Enter Your Name"
    className="form-control" id="name"/>

     </div>
  <div className="mb-2">
    <label htmlFor="title" className="form-label" >Email Id </label>
    <input type="text" 
    name = "email"
    className="form-control" id="email" 
    placeholder="Enter Your Email id"/>

  
  <div className="mb-3">
    <label htmlFor="Content" className="form-label">Priority Of Question...</label>
    <input type="text" 
    name = "body"
    placeholder="Enter Priority"
    className="form-control content" id="Content"/>

  </div>
    
  </div>
  </form>
  </div>
</div>
 
  </> 
}

export default TicketForm