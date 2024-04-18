import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from '../slices/authSlice';
import { AuthContext } from '../context/AuthContext';


export default function Logout() {
    const user = Object.entries(useSelector(selectUser).entities)[0];
    
    const dispatch = useDispatch();
    const { onLogout } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            dispatch(logoutUser(user[0]));
        }
        fetchData();
        onLogout();
        navigate('/');
        // eslint-disable-next-line
    }, []);
}