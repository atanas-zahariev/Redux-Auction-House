/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectNoticeById } from '../../../slices/notificationsSlice';

export default function RecivedNotices() {
    const {id} = useParams();

    const notice = useSelector(state => selectNoticeById(state,id));

    console.log(notice);

    return (
        <section id="catalog-section">

            <h1 className="item noticeHeader">
                <div className="f-right">
                    <Link className="action pad-small f-left" >Delete message</Link>
                </div>
            </h1>

            <div className="noticeContainer">
                <div className="notice">
                    <p className="userName">Message from: <span>Gosho</span></p>
                    <p className="userMassege">
                        <span><i className="fa-regular fa-message"></i></span>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita fugiat
                        deleniti ut nesciunt.</p>
                    <form className="noticeForm">
                        <label>
                            <textarea name="description" placeholder="write your answer here..."></textarea>
                        </label>
                        <div className="align-center">
                            <input type="submit" value="Response" />
                        </div>
                    </form>
                </div>
                <div className="noticeImg">
                    <img src="https://thumbs.dreamstime.com/b/brown-horse-isolated-white-7730188.jpg" alt="horse" />
                </div>

            </div>

            <div className="item padded">
                <footer>
                    <div>Listed by Gosho </div>
                </footer>

            </div>

        </section>
    );
};