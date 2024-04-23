/* eslint-disable no-inner-declarations */
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthError } from '../../slices/authSlice';
import { cleanErrorFromCatalog, deleteItem, selectItemsError, setErrorToCatalog } from '../../slices/itemsSlice';
import { useNavigate } from 'react-router-dom';



export default function Error() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authError = useSelector(selectAuthError);
    const itemsError = useSelector(selectItemsError);
    const error = itemsError || authError;

    console.log(error);

    function cancelDelete() {
        dispatch(cleanErrorFromCatalog());
    }


    if (Array.isArray(error)) {
        return (
            <div className="error-box">
                <p>{error.join('\n')}</p>
            </div>
        );
    } else if (typeof error === 'string' && error.includes('Delete')) {
        const title = error.split('/');
        const id = title[title.length - 1];

        async function deleteCurrentItem() {
            try {
                await dispatch(deleteItem(id));
                navigate('/catalog');
            } catch (error) {
                dispatch(setErrorToCatalog(error));
            }
        }

        return (
            <div className="error-box">
                <p id='delete'><span style={{ fontSize: 20, fontWeight: 'bold' }}>Are you sure you want to delete {title[1]} </span>
                    <button onClick={deleteCurrentItem} className="error-box" style={{ color: 'white', padding: 5, fontWeight: 'bold', backgroundColor: 'red' }} >Confirm</button>
                    <button onClick={cancelDelete} className="error-box" style={{ color: 'white', padding: 5, fontWeight: 'bold', backgroundColor: 'red' }} >Cancel</button>
                </p>
            </div>
        );

    } else if (typeof error === 'string' && error !== '') {
        return (
            <div className="error-box">
                <p>{error}</p>
            </div>
        );
    } else if (typeof error === 'object' && error !== null) {
        return (
            <div className="error-box">
                <p>There seems to be a problem please try again later</p>
            </div>
        );
    }
}