import { ADD_STAFF, SAVE_STAFF, UPDATE_STAFF, DELETE_STAFF } from "../_types/staffTypes";
import { CLEAR_ERRORS } from './../types';
import { setAlert } from './../_actions/alertAction'
import axios from 'axios';

export const getAllStaff = staffData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {
            console.log(staffData)
            const res = await await axios.get('http://localhost:5001/api/getStaffs', { params: staffData });

            console.log(res.data);
            dispatch({ type: SAVE_STAFF, payload: res.data })
        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}


export const addStaffAction = staffData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {


            const res = await await axios.post('http://localhost:5001/api/createStaff', staffData);

            console.log(res.data);
            dispatch({ type: ADD_STAFF, payload: res.data })

            return true

        } catch (err) {
            console.log(err);
            
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
            
        }
    }
}

export const updateStaffAction = staffData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {
            const res = await await axios.put('http://localhost:5001/api/updateStaff', staffData);
            dispatch({ type: UPDATE_STAFF, payload: res.data })
            return true

        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}


export const deleteStaffAction = staffData => {
    return async (dispatch) => {
        //const config = {header: {'Content-Type': 'application/json'}}  
        try {
            const res = await axios.delete('http://localhost:5001/api/deleteStaff', { data: staffData });
            if (Number(res.data.data.deletedCount) > 0) {
                console.log(res.data);
                dispatch({ type: DELETE_STAFF, payload: staffData })
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}





