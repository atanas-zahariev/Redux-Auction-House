/* eslint-disable @typescript-eslint/no-restricted-imports */
/* eslint-disable no-inner-declarations */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearUser, formHandller } from '../../services/utility';

import { sendUserNotice, setPersistedStateToNull } from '../../slices/authSlice';
import { cleanErrorFromCatalog, deleteItem, getItems, setErrorToCatalog } from '../../slices/itemsSlice';



export default function Error({ error }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // In case someone manipulates localStorage to make a request with a fake token.
        if (error[0] === 'Invalid authorization token') {
            clearUser();
            dispatch(setPersistedStateToNull());
            dispatch(getItems());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function cancelDelete() {
        dispatch(cleanErrorFromCatalog());
    }

    if (Array.isArray(error) && error.includes('Comment')) {
        async function sendMessage(message) {
            const id = error[1].owner;
            const fromUser = error[2].id;
            const aboutProduct = error[1].id;
            const userComment = message.description;
            const data = {
                fromUser,
                aboutProduct
            };
            
            const result = await dispatch(sendUserNotice({ data, id, userComment }));

            if (result.error) {
                return;
            } else {
                navigate('/notice');
            }
        }

        const onSubmit = formHandller(sendMessage);

        return (
            <div className="error-box">
                <form id='delete' className="noticeForm" style={{ padding: '18px' }} onSubmit={onSubmit}>
                    <label>
                        <textarea name="description" placeholder="write your message..." style={{ margin: '0px', width: '350px', height: '64px' }}></textarea>
                    </label>
                    <div className="align-center" >
                        <input type="submit" value="Send Message" />
                    </div>
                </form>
            </div>
        );

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