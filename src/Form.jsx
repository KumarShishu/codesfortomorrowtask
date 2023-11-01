import React,{useState} from 'react'

export default function Form() {

    const [data,setData]= useState({
        name :"",
        pname:"",
        pno:"",
        usercontact:"",
        useremail:"",
        message:"",
        password:"",
        cpassword:""
       }
       )
       const [foc,setFoc] =useState("white")
    const [error,setError] = useState({})
    function getData(e){
          setData({...data, [e.target.name]:e.target.value})
        }
       
        function focus (){
          foc ==="white" ?setFoc("yellow") : setFoc("white")
        }

    function postData(e){
        e.preventDefault()
        
        const validationErrors ={}
        if (!data.name.trim()){
          validationErrors.name = "User Name Is Required"
        } else if (!data.name.match(/^[a-zA-Z ]*$/)){
          validationErrors.name= "User Name Is Not Valid"
          }
         else if (data.name.length < 4){
           validationErrors.name = "User Name atleast minimum 5 character"
        }
        if (data.usercontact.length < 10 || data.usercontact.length > 10){
          validationErrors.usercontact = "Please Enter Valid Number"
        }
        
        if (data.useremail=== ""){
           validationErrors.useremail = "User Email Is Required"
        } else if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(data.useremail)){
        validationErrors.useremail= "User Email Is Not Valid"
        } 
        
        if(data.password === ""){
          validationErrors.password = "Please Enter Password"
        }
        else if (data.password.length < 10){
        validationErrors.password = "Please enter Minimum 10 Character"
        }
        if (data.cpassword!==data.password){
          validationErrors.cpassword="Password is not Match"
        }
        
        setError(validationErrors)
        
        if (Object.keys(validationErrors).length===0){
          alert ("Form Succesfully Submitted")
        }
            }

  return (
    <div>
         <form onSubmit={(e)=>postData(e)} >
        <label htmlFor="name">User Name: 
        <input type="text" style={{background:foc}}  id='name' onChange={getData} onFocus={focus} onBlur={()=>setFoc("white")} value={data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()} name='name'placeholder='Enter Name Here' /> 
        <span style={{color:"red"}}> {error.name}</span> 
        </label> 
         <br />

          <label htmlFor="name">User Contact No: 
        <input type="number" onChange={getData} onFocus={focus} onBlur={()=>setFoc("white")} name='usercontact' placeholder='Enter Name Here' />
        <span style={{color:"red"}}> {error.usercontact}</span>
         </label> <br />

      <label htmlFor="name">User Email: 
        <input type="email" onChange={getData}  name='useremail' value={data.useremail} placeholder='Enter Name Here' /> 
         <span style={{color:"red"}}>{error.useremail}</span>
        </label> <br />
      
        <label htmlFor="Password">User Password: 
        <input type="password" onChange={getData}  name='password' value={data.password} placeholder='******' /> 
        <span style={{color:"red"}}>{error.password}</span>
        </label> <br />

        <label htmlFor="Password">Confirm Password: 
        <input type="password" onChange={getData}  name='cpassword' value={data.cpassword} placeholder='******' /> 
        <span style={{color:"red"}}>{error.cpassword}</span>
        </label> <br />

      <label htmlFor="name">Product Name: 
        <input type="text" onChange={getData} value={data.pname.charAt(0).toUpperCase() + data.pname.slice(1).toLowerCase()} name='pname' placeholder='Product Name Here' />
         </label> <br />
       
       <label htmlFor="name">Product No. : 
        <input type="text" onChange={getData} value={data.pno.toUpperCase()} name='pno' placeholder='Enter Product No Here' />
         </label> <br />
      
      <label htmlFor="message">  Any Query Message:  </label>
      <textarea style={{resize:"none"}} rows="10" cols="30" name='message' onChange={getData}>
 Write Here....
</textarea>  <br />
 <br /> <button type='submit' className='btn'>Submit</button>
    </form>
    </div>
  )
}