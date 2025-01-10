import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ManageSubProduct() {
	const [catid, setcatid] = useState("");
	const [pname, setpname] = useState();
	const [rate, setrate] = useState();
	const [dis, setdis] = useState();
	const [stock, setstock] = useState();
	const [descp, setdescp] = useState();
	const [proid, setproid] = useState();
	const [picture, setpicture] = useState(null);
	const [picname, setpicname] = useState();
	const [editmode,seteditmode] = useState(false);
	const [catdata, setcatdata] = useState([]);
	const [prodsdata, setprodsdata] = useState([]);
	const navigate=useNavigate();
	const fileInputRef = useRef(null);

	const modules = {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          ['link', 'image', 'video'],
          ['clean'], // remove formatting button
        ],
      };
	  
    async function getcat() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getsubcat`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        setcatdata(resp.data.catsubdata)
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
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/fetchsubprodsbysubcatid?cid=${catid}`)
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
            const resp = await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/delsubprod/${id}`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        toast.success("Product Deleted Successfully");
                        fetchprodsbycat();
                    }
                    else if(resp.data.statuscode === 0)
                    {
                        toast.warn("Product not Deleted")
                    }
                }
            else {
                alert("some error occured")
            }
        }}

	async function updatedb() {
		try {
			const formdata = new FormData();
			formdata.append("pname", pname)
			if(picture!==null)
			{
				formdata.append("picture", picture)
			}
			formdata.append("catid", catid)
			formdata.append("rate", rate)
			formdata.append("dis", dis)
			formdata.append("stock", stock)
			formdata.append("descp", descp)
			formdata.append("proid", proid)
			const resp = await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/updatesubproduct`, formdata)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					toast.success("Product Updated Successfully")
					cancelcat();
					fetchprodsbycat();
				}
				else if (resp.data.statuscode === 0) {
					toast.warn("Product not Updated")
				}
			}
			else {
				toast.warn("some error occured")
			}
		}
		catch (err) {
			toast.error(err.message);
		}
	}

    async function savesubproduct(e) {
		e.preventDefault();
		try {
			const formdata = new FormData();
			formdata.append("catid", catid)
			formdata.append("pname", pname)
			if(picture!==null)
				{
					formdata.append("picture", picture)
				}
			formdata.append("rate", rate)
			formdata.append("dis", dis)
			formdata.append("stock", stock)
			formdata.append("descp", descp)
			const resp = await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/savesubProduct`, formdata)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					toast.success("Product Added Successfully")
					cancelcat();
					fetchprodsbycat();
				}
				else if (resp.data.statuscode === 0) {
					toast.warn("Product not Added")
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


	function onprodupadate(proditem)
	{
		seteditmode(true)
		setpname(proditem.pname)
		setpicture(proditem.picture)
		setcatid(proditem.catid)
		setrate(proditem.Rate)
		setdis(proditem.Discount)
		setstock(proditem.Stock)
		setdescp(proditem.Description)
		setproid(proditem._id)
	}
	function cancelcat()
	{
		seteditmode(false)
		setpname("")
		setrate("")
		setcatid("")
		setdis("")
		setstock("")
		setdescp("")
		setcatid("")
		setproid("")
		setpicture(null)
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
                    <li className="breadcrumb-item active" aria-current="page">Manage Sub Product</li>
                </ol>
            </nav>
			<div className="register">
				<div className="container">
					<h2>Add Product</h2>

					<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
						<form name="form1" onSubmit={savesubproduct}>
                            <select className="form-control2" value={catid} onChange={(e)=>setcatid(e.target.value)}>
                                <option value="">Choose Product</option>
                                {
									catdata.map((item,index)=>
										<option value={item._id} key={index}>{item.subcatname}
										</option>)
								}

                            </select><br/><br/>
							<input type="text" name="prodname" value={pname} placeholder="Product Name" required=" " onChange={(e) => setpname(e.target.value)} /><br/>
							<input type="text" name="rate" value={rate} placeholder="Rate" required=" " onChange={(e) => setrate(e.target.value)} /><br />
							<input type="text" name="dis" value={dis} placeholder="Discount" required=" " onChange={(e) => setdis(e.target.value)} /><br />
							<input type="text" name="stock" value={stock} placeholder="Stock" required=" " onChange={(e) => setstock(e.target.value)} /><br />
                            <div style={{ height: '250px', width: '100%' }}>
							<ReactQuill
								style={{
								height: '100%',
								width: '100%',
								overflowY: 'auto', // Enables scrollbar when content overflows
								border: '1px solid #ccc', // Optional: to visualize the editor boundaries
								}}
								modules={modules} onChange={setdescp} value={descp}
								/>
							</div><br/>
							{
								editmode?
								<>
									<img src={`uploads/${picture}`} height="100"/><br/>
									choose new image,if required<br/>
								</>:null
							}
							<input type="file" name="catpic" onChange={(e) => setpicture(e.target.files[0])} ref={fileInputRef} />
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
								<h2>Added Sub Products</h2><br />
								<table className="timetable_sub">
									<tbody>
										<tr>
											<th>Picture</th>
											<th>Product Name</th>
											<th>Update</th>
											<th>Delete</th>
										</tr>
									</tbody>
									{
										prodsdata.map((item, index) =>
											<tr key={index}>
												<td><img src={`uploads/${item.picture}`} height="75"/></td>
												<td>{item.pname}</td>
												<td><button className="btn btn-primary" onClick={() => onprodupadate(item)}>Update</button></td>
												<td><button className="btn btn-danger" onClick={() => ondel(item._id)}>Delete</button></td>
											</tr>
										)
									}

								</table><br />
								{prodsdata.length} Products found

							</> :null
					}

				</div>
			</div>
		</>
	)
}
export default ManageSubProduct
