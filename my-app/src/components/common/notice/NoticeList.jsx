/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectNotices } from '../../../slices/notificationsSlice';
import { selectUserFromCatalog } from '../../../slices/itemsSlice';

export default function NoticeList() {
    const notices = useSelector(state => selectNotices(state));
    const currentuser = useSelector(state => selectUserFromCatalog(state));

    const userNotice = notices.filter(notice => notice.product.owner === currentuser.id);
    console.log(userNotice);
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
                    <div>Listed by {currentuser.firstname} </div>
                </footer>

            </div>

        </section>
    );
}