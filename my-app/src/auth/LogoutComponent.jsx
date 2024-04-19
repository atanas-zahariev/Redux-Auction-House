import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser, selectUser } from '../slices/authSlice';


export default function Logout() {
    const user = Object.entries(useSelector(selectUser).entities);
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if(user[0]){
                dispatch(logoutUser(user[0][0]));
            }else{
                dispatch(logoutUser());
            }
        }
        
        fetchData();
        navigate('/');
    }, []);
}