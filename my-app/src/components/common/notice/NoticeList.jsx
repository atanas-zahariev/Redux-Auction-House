/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectNotices } from '../../../slices/notificationsSlice';

export default function NoticeList() {
    const notices = useSelector(state => selectNotices(state));
    
    console.log(notices);


    return (
        <section id="catalog-section">

            <h1>Yours Notifications</h1>

            <div className="noticeList">
                <ul className="list">
                    {notices.map(notice =>
                        <li key={notice.id} className="partialNotice">
                            <div className="f-right">
                                <Link to={`/notice/${notice.id}`} className="action pad-small f-left">See details</Link>
                            </div>
                            <p className="message">From {notice.user.firstname} for {notice.product.title}: {notice.message}</p>
                        </li>)}
                </ul>
            </div>

            <div className="item padded">
                <footer>
                    <div>Listed by Gosho </div>
                </footer>

            </div>

        </section>
    );
}