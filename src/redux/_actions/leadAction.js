import { ADD_LEAD, SAVE_LEAD, UPDATE_LEAD, DELETE_LEAD } from "../_types/leadTypes";
import { CLEAR_ERRORS } from './../types';
import { setAlert } from './../_actions/alertAction'
import axios from 'axios';

export const getAllLead = leadData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {

            const res = await await axios.get('http://localhost:5001/api/getLeads', { params: leadData });

            console.log(res.data);
            dispatch({ type: SAVE_LEAD, payload: res.data })
        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}

export const addLeadAction = leadData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {


            const res = await await axios.post('http://localhost:5001/api/createLead', leadData);

            console.log(res.data);
            await dispatch({ type: ADD_LEAD, payload: res.data })

            return true

        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}

export const updateLeadAction = leadData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {


            const res = await await axios.put('http://localhost:5001/api/updateLead', leadData);

            console.log(res.data);
            dispatch({ type: UPDATE_LEAD, payload: res.data })

            return true

        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}


export const deleteLeadAction = leadData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {


            const res = await axios.delete('http://localhost:5001/api/deleteLead', { data: leadData });

            if (Number(res.data.data.deletedCount) > 0) {
                console.log(res.data);
                dispatch({ type: DELETE_LEAD, payload: leadData })

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





