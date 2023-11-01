import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Form from './Form';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default function FetchApi() {
    const[data,setData]=useState([])
    const [indx,setIndx]=useState()
    const [wait,setWait] =useState(false)
    const [deletedData,setdeletedData]=useState([])
    const [form,setForm] = useState(false)
    const[tog,setTog] =useState(false)
    console.log(data)
    function Api(){
        fetch("https://jsonplaceholder.typicode.com/posts").then((item)=>item.json()).then((item)=>setData(item))
    }
    useEffect(()=>{
        setTimeout(()=>{
            setWait(true)
        },5000)
           Api()
    },[])

    function deleteButton(id){
        const deletedData =  data.filter((e)=>e.id==indx)
        setdeletedData((preData)=>[...preData,...deletedData])
        setIndx(id)
        setData(data.filter((item,ind)=>item.id !==indx)) 
 }

 const [currentPage,setCurrentPage] = useState(1)
 const recordPerPage =6;
 const lastIndex = currentPage * recordPerPage;
 const firstIndex = lastIndex-recordPerPage;
 const record = data.slice(firstIndex,lastIndex)
 const npage= Math.ceil(data.length/recordPerPage)
 const numbers =[...Array(npage+1).keys()].slice(1)
 function perPage (e){
   e.preventDefault()
   if (currentPage!==1){
     setCurrentPage(currentPage-1)
   }
 }
 function nextPage(e){
   e.preventDefault() 
 if (currentPage!==npage){
   setCurrentPage(currentPage+1)
 }
 }
 function  changeCurrentP(id,e){
     setWait(false)
   e.preventDefault()
   setCurrentPage(id)

   setTimeout(()=>{
     setWait(true)
   },5000)
 }



const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
   
     
      {wait ? 
        <div style={{display:"flex", width:"100%"}}>
        <div style={{display:"flex", flexWrap:"wrap",justifyContent:"space-around",width:"20%"}}> 
         <div style={{display:"flex", width:"100%",border:"2px solid black" ,height:"100px"}}> 
         <div style={{width:"30%"}}> 
         <img src='https://en.pimg.jp/057/691/915/1/57691915.jpg' alt='' style={{width:'100px', height:"100px",  borderRadius:"50%"}} />
          </div>
          <div style={{width:"70%"}}> 
        <h3>Hi Shishu</h3>
        <p>Here's Your News</p>
          </div>
          </div>

          <div style={{display:"flex", flexWrap:"wrap",width:"100%",border:"2px solid black" ,height:"150px"}}> 
          <div style={{display:"flex", width:"100%",justifyContent:"center"}}> 
          <h2>View Toggle</h2> </div>

         <div style={{width:"50%"}}> 
         <button style={{width:"100%" ,height:"50px"}} onClick={()=>setTog(true)}>Button1</button>
          </div>
          <div style={{width:"50%"}}> 
         <button style={{width:"100%" ,height:"50px"}} onClick={()=>setTog(false)}>Button2</button>
          </div>
          </div>



          <div style={{display:"flex", flexWrap:"wrap",width:"100%",border:"2px solid black" ,height:"150px"}}> 
          <div style={{display:"flex", width:"100%",justifyContent:"center"}}> 
          <h2>Have a Feedback?</h2> </div>

         <div style={{width:"100%"}}> 
         <button style={{width:"100%" ,height:"50px"}} onClick={openModal}> We're Listening</button>
          </div>
          </div>

        </div>




{tog?  <div style={{display:"flex", flexWrap:"wrap",justifyContent:"space-around",width:"80%"}}> 
            {
                record.map((item,i)=>{
                    return(
                        <div key={i} style={{height:'160px',width:"100%",border:"1px solid black",margin:"5px",position:"relative"}}>

<div style={{display:"flex", justifyContent:"space-around",alignItems:"center",width:"100%"}}> 

 <div style={{ width:"20%"}}> 
 <img src='https://en.pimg.jp/057/691/915/1/57691915.jpg' alt='' style={{width:'100px', height:"100px"}}/>
 </div>


 <div style={{width:"80%"}}> 
 <p style={{textAlign:"center",fontWeight:"bold"}}> Card Id: {item.id} </p>
                 <p style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}>{item.title.charAt(0).toUpperCase()+ item.title.slice(1).toLowerCase() } </p>
                 <p style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}> {item.body.slice(0,50)+ "..."} </p>
 </div>
 
</div>
                 <button style={{position:"absolute", right:"5px", top:"5px",padding:"5px"}} onClick={()=>deleteButton(item.id)}>X</button>
                        </div>
                    )
                })
            }
        </div>:


        
        
        <div style={{display:"flex", flexWrap:"wrap",justifyContent:"space-around",alignItems:"center",width:"80%"}}>
            {
                record.map((item,i)=>{
                    return(
                        <div key={i} style={{height:'500px',width:"28%",border:"1px solid black",margin:"5px",position:"relative"}}>
                 <img src='https://en.pimg.jp/057/691/915/1/57691915.jpg' alt='' style={{width:'100%', height:"300px"}}/>
                 <p style={{textAlign:"center",fontWeight:"bold"}}> Card Id: {item.id} </p>
                 <p style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}>{item.title.charAt(0).toUpperCase()+ item.title.slice(1).toLowerCase() } </p>
                 <p style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}> {item.body.slice(0,50)+ "..."} </p>
                 <button style={{position:"absolute", right:"5px", top:"5px",padding:"5px"}} onClick={()=>deleteButton(item.id)}>X</button>
                        </div>
                    )
                })
            }
        </div> }
        </div>
        : <h2>PLEASE WAIT DATA LOADING..... </h2>}
        <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        
      >
       <Form/>
      </Modal>
    </div>
         <hr/>

        <div style={{display:"flex", flexWrap:"wrap",justifyContent:"space-around",alignItems:"center"}}>
            <h2>Delete Data Store Here</h2>
       
            {
                deletedData.map((item,i)=>{
                    return(
                        <div key={i} style={{height:'500px',width:"28%",border:"1px solid black",margin:"5px",position:"relative"}}>
                 <img src='https://en.pimg.jp/057/691/915/1/57691915.jpg' alt='' style={{width:'100%', height:"300px"}}/>
                 <p style={{textAlign:"center",fontWeight:"bold"}}> Card Id: {item.id} </p>
                 <p style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}>{item.title.charAt(0).toUpperCase()+ item.title.slice(1).toLowerCase() } </p>
                 <p style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}> {item.body.slice(0,50)+ "..."} </p>
                 <button style={{position:"absolute", right:"5px", top:"5px",padding:"5px"}} onClick={()=>deleteButton(item.id)}>X</button>
                        </div>
                    )
                })
            }
        </div> 




        <nav>
  <ul style={{display:"flex",listStyle:"none",justifyContent:"space-around", height:'30px',backgroundColor:"black", color:'white',textDecoration:"none",alignItems:"center",position:"fixed",bottom:"0",width:"98%", padding:"5px"}}>
    <li className='page-item' >
      <a href="" onClick={(e)=>perPage(e)} className='link' style={{ color: 'whitesmoke',textDecoration:"none", cursor:"grab"}}>Prev</a>
    </li>
    {
      numbers.map((n,i)=>(
          <>
            <li className={`page-item ${currentPage == n ? "active" : " "}`} key={i}>
              <a href=" " onClick={(e)=>changeCurrentP(n,e)} style={{ color: 'whitesmoke',textDecoration:"none", cursor:"grab"}} className='link'>{n}</a>
            </li>
          </>
        )
      )
    }
    <li className='page-item'>
      <a href="" onClick={(e)=>nextPage(e)} style={{ color: 'whitesmoke',textDecoration:"none", cursor:"grab"}}className='link'>Next</a>
    </li>
  </ul>
</nav>
      </div>
  );
}
