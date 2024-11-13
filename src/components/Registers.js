import { useState } from 'react';
function Registers() {

    const[modalstatus,setmodalstatus]=useState(false);
     return ( 
    <>
        <button className='en' onClick={()=>setmodalstatus(true)}>Register</button>
       <div  className={`modalOverLay ${modalstatus?'modalShow':''}`}>
        <div className={`modalDiv ${modalstatus?'showModalDiv':''}`}>
            <h3>Register Now <span className='cross' onClick={()=>setmodalstatus(false)}>&times;</span></h3>
            <img src='images/images.jpeg'alt=''width="280"/><span className='span'>Fashion Hub</span>
            <form className='form1'>
                <input type='text' name='name' placeholder='Name' required=''  /><br/><br/>
                <input type='tel' name='phone' placeholder='Phone' required=''  /><br/><br/>
                <input type='email' name='email' placeholder='Email' required=''  /><br/><br/>
                <input type='password' name='password' placeholder='Password' required=''  /><br/><br/>
                <input type='password' name='cpassword' placeholder='Confirm Password' required=''  /><br/><br/>
                <input type='button' name='btn' value="Register" required=''  /><br/><br/>

            </form>
        </div>

       </div>
        
       </>
    );
}
export default Registers
