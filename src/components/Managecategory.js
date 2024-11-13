import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify";

function Managecategory() {
	const [catid, setcatid] = useState();
	const [cname, setcname] = useState();
	const [cpic, setcpic] = useState(null);
	const [picname, setpicname] = useState();
	const [editmode,seteditmode] = useState(false);
	const [catdata, setcatdata] = useState([]);
	const fileInputRef = useRef(null);
	const navigate=useNavigate();

	async function savecategory(e) {
		e.preventDefault();
		try {
			const formdata = new FormData();
			formdata.append("catname", cname)
			if(cpic!==null)
				{
					formdata.append("catpic", cpic)
				}
			const resp = await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/savecategory`, formdata)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					toast.success("Category Added Successfully")
					cancelcat();
					getcat();
				}
				else if (resp.data.statuscode === 0) {
					toast.warn("Category not Added")
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

	

    async function getcat() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getcat`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        setcatdata(resp.data.catdata)
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

    async function ondel(id) {
            var userresp=window.confirm("Ae you sure to delete");
            if(userresp===true)
            {
            const resp = await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/delcat/${id}`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        toast.success("Category Deleted Successfully");
                        getcat();
                    }
                    else if(resp.data.statuscode === 0)
                    {
                        toast.warn("Category not Deleted")
                    }
                }
            else {
                alert("some error occured")
            }
        }}

	async function updatedb() {
		try {
			const formdata = new FormData();
			formdata.append("catname", cname)
			if(cpic!==null)
			{
				formdata.append("catpic", cpic)
			}
			formdata.append("oldpicname", picname)
			formdata.append("cid", catid)
			

			const resp = await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/updatecategory`, formdata)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					toast.success("Category Updated Successfully")
					cancelcat();
					getcat();
				}
				else if (resp.data.statuscode === 0) {
					toast.warn("Category not Updated")
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

	function oncatupadate(catitem)
	{
		seteditmode(true)
		setcname(catitem.catname)
		setpicname(catitem.catpic)
		setcatid(catitem._id)
	}
	function cancelcat()
	{
		seteditmode(false)
		setcname("")
		setpicname("")
		setcatid("")
		setcpic(null)
		if(fileInputRef.current)
		{
			fileInputRef.current.value = '';
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
                    <li className="breadcrumb-item active" aria-current="page">Manage Category</li>
                </ol>
            </nav>
			<div className="register">
				<div className="container">
					<h2>Add Category</h2>

					<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
						<form name="form1" onSubmit={savecategory}>
							<input type="text" name="catname" value={cname} placeholder="Category Name" required=" " onChange={(e) => setcname(e.target.value)} /><br />
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
						catdata.length > 0 ?
							<>
								<h2>Added Categories</h2><br />
								<table className="timetable_sub">
									<tbody>
										<tr>
											<th>Picture</th>
											<th>Category Name</th>
											<th>Update</th>
											<th>Delete</th>
										</tr>
									</tbody>
									{
										catdata.map((item, index) =>
											<tr key={index}>
												<td><img src={`uploads/${item.catpic}`} height="75"/></td>
												<td>{item.catname}</td>
												<td><button className="btn btn-primary" onClick={() => oncatupadate(item)}>Update</button></td>
												<td><button className="btn btn-danger" onClick={() => ondel(item._id)}>Delete</button></td>
											</tr>
										)
									}

								</table><br />
								{catdata.length} Categories found

							</> : <h2>No Categories Found</h2>
					}

				</div>
			</div>
		</>
	)
}
export default Managecategory