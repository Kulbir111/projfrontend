import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify";

function Managesubcategory() {
	const [catid, setcatid] = useState("");
	const [cname, setcname] = useState();
	const [proid, setproid] = useState();
	const [cpic, setcpic] = useState(null);
	const [picname, setpicname] = useState();
	const [editmode,seteditmode] = useState(false);
	const [catdata, setcatdata] = useState([]);
	const [prodsdata, setprodsdata] = useState([]);
	const navigate=useNavigate();
	const fileInputRef = useRef(null);

    async function getcat() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getcat`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        setcatdata(resp.data.catdata)
                    }
					else{
						setcatdata([]);
					}
                }
            else {
                toast.warn("some error occured")
            }
        }
        catch (err) {
            toast.warn(err.message);
        }
    }
    useEffect(()=>
    {
        getcat();
    },[]
    )
    useEffect(()=>
    {
		if(catid!=="")
		{
			fetchprodsbycat();
		}
        
    },[catid]
    )

	async function fetchprodsbycat() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/fetchprodsbysubcatid?cid=${catid}`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        setprodsdata(resp.data.prodsubdata)
                    }
					else{
						setprodsdata([]);
						toast.info("No Products Added")
					}
                }
            else {
                toast.warn("some error occured")
            }
        }
        catch (err) {
            toast.warn(err.message);
        }
    }

    async function ondel(id) {
            var userresp=window.confirm("Ae you sure to delete");
            if(userresp===true)
            {
            const resp = await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/delsubcat/${id}`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        toast.success("Sub Category Deleted Successfully");
                        fetchprodsbycat();
                    }
                    else if(resp.data.statuscode === 0)
                    {
                        toast.warn("Sub Category not Deleted")
                    }
                }
            else {
                alert("some error occured")
            }
        }}

		async function updatedb() {
			try {
				console.log("Starting update process..."); // Log before the form data is created
				const formdata = new FormData();
				formdata.append("subcatname", cname);
				formdata.append("catid", catid);
				
				if (cpic !== null) {
					formdata.append("subcatpic", cpic);
				} else {
					formdata.append("oldpicname", picname);
				}
		
				console.log("Form data prepared:", formdata); // Log form data for debugging
				const resp = await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/updatesubcategory`, formdata);
				
				console.log(resp.data); // Log the response data for debugging
				
				if (resp.status === 200 && resp.data.statuscode === 1) {
					toast.success("Subcategory updated successfully");
					cancelcat();
					fetchprodsbycat();
				} else {
					toast.warn("Failed to update subcategory");
				}
			} catch (err) {
				console.error("Update error:", err); // Log the error for more information
				toast.error("Error updating subcategory: " + err.message);
			}
		}
		
	
    async function savesubcategory(e) {
		e.preventDefault();
		try {
			const formdata = new FormData();
			formdata.append("catid", catid)
			formdata.append("subcname", cname)
			if(cpic!==null)
				{
					formdata.append("subcatpic", cpic)
				}
			const resp = await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/savesubcategory`, formdata)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					toast.success("Sub Category Added Successfully")
					cancelcat();
					fetchprodsbycat();
				}
				else if (resp.data.statuscode === 0) {
					toast.warn("Sub Category not Added")
				}
			}
			else {
				toast.warn("some error occured")
			}
		}
		catch (err) {
			toast.warn(err.message);
		}
	}


	function onprodupadate(proditem) {
		seteditmode(true);
		setcname(proditem.subcatname);
		setpicname(proditem.subcatpic); // Set existing image name
		setcatid(proditem.catid);
		setproid(proditem._id);
	}

	// Reset form after cancel
	function cancelcat() {
		seteditmode(false);
		setcname("");
		setcatid("");
		setproid("");
		setcpic(null);
		setpicname("");  // Reset image state
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	}
	useEffect(()=>
		{
			if(sessionStorage.getItem("userdata")===null)
			{
				toast.error("Please login to access the page");
				navigate("/login");
			}
			else
			{   
				var uinfo =JSON.parse(sessionStorage.getItem("userdata"));
				if(uinfo.usertype!=="admin")
				{
					toast.error("Admin login to access the page");
					navigate("/login");
				}
			}
		},[])

	return (
		<>
			 <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
					<Link to="/adminhome">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Manage Sub Category</li>
                </ol>
            </nav>
			<div className="register">
				<div className="container">
					<h2>Add Sub Category</h2>

					<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
						<form name="form1" onSubmit={savesubcategory}>
                            <select className="form-control2" value={catid} onChange={(e)=>setcatid(e.target.value)}>
                                <option value="">Choose Category</option>
                                {
									catdata.map((item,index)=>
										<option value={item._id} key={index}>{item.catname}
										</option>)
								}

                            </select><br/><br/>
                            <input type="text" name="catname" value={cname} placeholder="Sub Category Name" required=" " onChange={(e) => setcname(e.target.value)} /><br />
							{
								editmode?
								<>
									<img src={`uploads/${picname}`} height="100"/><br/>
									choose new image,if required<br/>
								</>:null
							}
							<input type="file" name="catpic" onChange={(e) => setcpic(e.target.files[0])} ref={fileInputRef} />
							{editmode===false?<input type="submit" name="btn1" value="Add" />:null}
							{
								editmode?
								<>
								<input type="button" name="btn2" value="Update" onClick={updatedb} />
								<input type="button" name="btn3" value="Cancel" onClick={cancelcat} />
								</>:null
							}
						</form>

					</div>
				</div>
			</div>
			<div className="login">
				<div className="container">
					{
						prodsdata.length > 0 ?
							<>
								<h2>Added Sub Categories</h2><br />
								<table className="timetable_sub">
									<tbody>
										<tr>
											<th>Picture</th>
											<th>Sub Category Name</th>
											<th>Update</th>
											<th>Delete</th>
										</tr>
									</tbody>
									{
										prodsdata.map((item, index) =>
											<tr key={index}>
												<td><img src={`uploads/${item.subcatpic}`} height="75"/></td>
												<td>{item.subcatname}</td>
												<td><button className="btn btn-primary" onClick={() => onprodupadate(item)}>Update</button></td>
												<td><button className="btn btn-danger" onClick={() => ondel(item._id)}>Delete</button></td>
											</tr>
										)
									}

								</table><br />
								{prodsdata.length} Sub Category found

							</> :null
					}

				</div>
			</div>
		</>
	)
}
export default Managesubcategory