import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import './leadListing.scss';
import { getAllLead, addLeadAction, updateLeadAction, deleteLeadAction } from '../../redux/_actions/leadAction';
const LeadDetails = ({ history }) => {

  const dispatch = useDispatch();

  const { lead, auth } = useSelector(state => ({
    lead: state.lead.allLead,
    auth: state.auth
  }), shallowEqual);


  const initialLead = { name: "", email: "", phone: "" };
  //States
  const [allLead, setAllLead] = useState('');
  const [editLead, setEditLead] = useState(initialLead);
  const [editing, setEditing] = useState(false);

  useEffect(() => {

    if (localStorage.token)
      getAllLeadData();
    else
      history.push('/login');
    // eslint-disable-next-line
  }, []);

  //Update Input Changes
  const handleChange = e => {
    const { name, value } = e.target;
    
    setEditLead({ ...editLead, [name]: value });
  }

  //Reseting to initial state in cancel button
  const cancelAddEditingFn = (type) => {
    
    setEditLead(initialLead);
    setEditing(false)
  }

  //Event listner for Edit button 
  const editLeadFn = (lead) => {
    
    setEditLead(lead);
    setEditing(true)
  }

  //Get all Lead Details
  const getAllLeadData = async () => {

    try {
      dispatch(getAllLead({
        "loggedInEmail": (auth && auth.user && auth.user.data && auth.user.data.email) || "anas@test.com",
        "loggedInRole": (auth && auth.user && auth.user.data && auth.user.data.role) 
      }));
    } catch (err) {
      console.log(err);

    }
  }


  //Add Lead Details
  const addLead = async () => {

    try {
      
      let obj = {
        ...editLead,
        "loggedInEmail": (auth && auth.user && auth.user.data && auth.user.data.email) || "anas@test.com",
        "loggedInRole": (auth && auth.user && auth.user.data && auth.user.data.role) 
      }
      
      let status = await dispatch(addLeadAction(obj));
      if (status) setEditLead(initialLead)
      
    } catch (error) {
      console.log(error)
    }

  }

  //Update Lead Details
  const updateLead = async () => {

    try {
      let obj = {
        ...editLead,
        "loggedInEmail": (auth && auth.user && auth.user.data && auth.user.data.email) || "anas@test.com",
        "loggedInRole": (auth && auth.user && auth.user.data && auth.user.data.role) || "superAdmin"
      }
      
      let status = await dispatch(updateLeadAction(obj));
      if (status) setEditLead(initialLead); setEditing(false)

      
    } catch (error) {
      console.log(error)
    }

  }

  //Delete Lead Details
  const deleteLead = async (id) => {
    
    try {
      let obj = {
        'id': id,
        "loggedInEmail": (auth && auth.user && auth.user.data && auth.user.data.email) || "anas@test.com",
        "loggedInRole": (auth && auth.user && auth.user.data && auth.user.data.role) || "superAdmin"
      }
      let temp = await dispatch(deleteLeadAction(obj));
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>

      <div className="row">
        <div className="five columns">

          {editing ? (
            <div>
              <h2>Edit Lead</h2>
              <form>
                <label>Name</label>
                <input className="u-full-width" type="text" value={editLead.name} name="name" onChange={handleChange} />
                <label>Email</label>
                <input className="u-full-width" type="text" value={editLead.email} name="email" onChange={handleChange} />
                <label>Phone</label>
                  <input className="u-full-width" autoComplete="false" type="text" value={editLead.phone} name="phone" onChange={handleChange} />

              <button className="button-primary" type="button" onClick={() => updateLead()} >Edit Lead</button>
                <button type="button" onClick={() => cancelAddEditingFn('edit')}>Cancel</button>
              </form>
            </div>
          ) : (
              <div>
                <h2>Add Lead</h2>
                <form>
                  <label>Name</label>
                  <input className="u-full-width" type="text" value={editLead.name} name="name" onChange={handleChange} />
                  <label>Email</label>
                  <input className="u-full-width" autoComplete="false" type="text" value={editLead.email} name="email" onChange={handleChange} />
                  <label>Phone</label>
                  <input className="u-full-width" autoComplete="false" type="text" value={editLead.phone} name="phone" onChange={handleChange} />

                  <button className="button-primary" type="button" onClick={() => addLead()} >Add Lead</button>
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
                {
                        auth.isAdmin &&  <th>Actions</th>
                }
              </tr>
            </thead>
            <tbody>
              {lead && lead.data && lead.data.length > 0 ? (
                lead.data.map(lead => {
                  const { _id, name, email } = lead;
                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      {
                        auth.isAdmin && 
                      
                      <td>
                        <button onClick={() => deleteLead(_id)}>Delete</button>
                        <button onClick={() => editLeadFn(lead)}>Edit</button>
                      </td>
                }
                    </tr>
                  )
                })
              ) : (
                  <tr>
                    <td colSpan={4}>No leads found</td>
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

export default LeadDetails
