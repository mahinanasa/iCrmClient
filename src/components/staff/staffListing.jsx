import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import './staffListing.scss';
import { getAllStaff, addStaffAction, updateStaffAction, deleteStaffAction } from '../../redux/_actions/staffAction';
const StaffDetails = ({ history }) => {

  const dispatch = useDispatch();

  const { staff, auth } = useSelector(state => ({
    staff: state.staff.allStaff,
    auth: state.auth
  }), shallowEqual);

  

  const initialStaff = { name: "", email: "", password: "" };
  //States
  const [editStaff, setEditStaff] = useState(initialStaff);
  const [editing, setEditing] = useState(false);

  useEffect(() => {

    if (localStorage.token)
      getAllStaffData();
    else
      history.push('/login');
    // eslint-disable-next-line
  }, []);

  //Update Input Changes
  const handleChange = e => {
    const { name, value } = e.target;
    
    setEditStaff({ ...editStaff, [name]: value });
  }

  //Reseting to initial state in cancel button
  const cancelAddEditingFn = (type) => {
    
    setEditStaff(initialStaff);
    setEditing(false)
  }

  //Event listner for Edit button 
  const editStaffFn = (staff) => {
    
    setEditStaff(staff);
    setEditing(true)
  }

  //Get all staff Details
  const getAllStaffData = async () => {

    try {
      
      dispatch(getAllStaff({
        "loggedInEmail": (auth && auth.user && auth.user.data && auth.user.data.email) || "anas@test.com",
        "loggedInRole": (auth && auth.user && auth.user.data && auth.user.data.role) || "superAdmin"
      }));
    } catch (err) {
      console.log(err);

    }
  }


  //Add Staff Details
  const addStaff = async () => {

    try {
      
      let obj = {
        ...editStaff,
        
          "loggedInEmail": (auth && auth.user && auth.user.data && auth.user.data.email) || "anas@test.com",
          "loggedInRole": (auth && auth.user && auth.user.data && auth.user.data.role) || "superAdmin"
        
      }
      let status = await dispatch(addStaffAction(obj));
      if (status) setEditStaff(initialStaff)
    } catch (error) {
      
    }

  }

  //Update Staff Details
  const updateStaff = async () => {

    try {
      let obj = {
        ...editStaff,
        
          "loggedInEmail": (auth && auth.user && auth.user.data && auth.user.data.email) || "anas@test.com",
          "loggedInRole": (auth && auth.user && auth.user.data && auth.user.data.role) || "superAdmin"
        
      }
      
      let status = await dispatch(updateStaffAction(obj));
      if (status) setEditStaff(initialStaff); setEditing(false)
    } catch (error) {

    }

  }

  //Delete Staff Details
  const deleteStaff = async (id) => {
    
    try {
      let obj = {
        'id': id,
        
          "loggedInEmail": (auth && auth.user && auth.user.data && auth.user.data.email) || "anas@test.com",
          "loggedInRole": (auth && auth.user && auth.user.data && auth.user.data.role) || "superAdmin"
 
      }
      let temp = await dispatch(deleteStaffAction(obj));
   
    } catch (error) {

    }

  }

  return (
    <>

      <div className="row">
        <div className="five columns">

          {editing ? (
            <div>
              <h2>Edit Staff</h2>
              <form>
                <label>Name</label>
                <input className="u-full-width" type="text" value={editStaff.name} name="name" onChange={handleChange} />
                <label>Email</label>
                <input className="u-full-width" type="text" value={editStaff.email} name="email" onChange={handleChange} />
                <button className="button-primary" type="button" onClick={() => updateStaff()} >Edit Staff</button>
                <button type="button" onClick={() => cancelAddEditingFn('edit')}>Cancel</button>
              </form>
            </div>
          ) : (
              <div>
                <h2>Add Staff</h2>
                <form>
                  <label>Name</label>
                  <input className="u-full-width" type="text" value={editStaff.name} name="name" onChange={handleChange} />
                  <label>Email</label>
                  <input className="u-full-width" autoComplete="false" type="text" value={editStaff.email} name="email" onChange={handleChange} />
                  <label>Password</label>
                  <input className="u-full-width" autoComplete="false" type="text" value={editStaff.password} name="password" onChange={handleChange} />

                  <button className="button-primary" type="button" onClick={() => addStaff()} >Add Staff</button>
                  <button type="button" onClick={() => cancelAddEditingFn('add')} >Cancel</button>
                </form>
              </div>
            )}



        </div>
        <div className="seven columns">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff && staff.data && staff.data.length > 0 ? (
                staff.data.map(staff => {
                  const { _id, name, email } = staff;
                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>
                        <button onClick={() => deleteStaff(_id)}>Delete</button>
                        <button onClick={() => editStaffFn(staff)}>Edit</button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                  <tr>
                    <td colSpan={4}>No staff found</td>
                  </tr>
                )
              }
            </tbody>
          </table>

        </div>
      </div>

    </>
  )
}

export default StaffDetails
