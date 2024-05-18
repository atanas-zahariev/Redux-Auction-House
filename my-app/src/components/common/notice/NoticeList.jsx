/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cleanErrorFromCatalog, selectItemsError, selectUserFromCatalog } from '../../../slices/itemsSlice';
import { cleanAuthError, selectAuthError } from '../../../slices/authSlice';
import { useEffect } from 'react';

export default function NoticeList() {
    const authError = useSelector(selectAuthError);
    const itemsError = useSelector(selectItemsError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authError) {
            dispatch(cleanAuthError());
        }
        if (itemsError) {
            dispatch(cleanErrorFromCatalog());
        }
        // eslint-disable-next-line
    }, []);

    const userNotice = useSelector(state => selectUserFromCatalog(state));
    // console.log(userNotice);
    return (
        <section id="catalog-section">

            <h1>Yours Notifications</h1>

            <div className="noticeList">
                {userNotice?.length > 0 ?
                    <ul className="list">
                        {userNotice.map(notice =>
                            <li key={notice.id} className="partialNotice">
                                <div className="f-right">
                                    <Link to={`/notice/${notice.id}`} className="action pad-small f-left">See details</Link>
                                </div>
                                <p className="message">From: {notice.user.firstname} {notice.user.lastname}. For - {notice.product.title}</p>
                            </li>)}
                    </ul> :
                    <div className="item pad-large align-center">
                        <p>You have no notifications!</p>
                    </div>
                }
            </div>

            <div className="item padded">
                <footer>
                    {/* <div>Listed by {currentuser.firstname} </div> */}
                </footer>

            </div>

        </section>
    );
}