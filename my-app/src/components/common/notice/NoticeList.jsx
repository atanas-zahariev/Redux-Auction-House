// eslint-disable-next-line quotes
import { Link } from "react-router-dom";

export default function NoticeList() {
    const user = 'Gosho';
    const title = 'Horse';
    return (
        <section id="catalog-section">

            <h1>Yours Notifications</h1>

            <div className="noticeList">
                <ul className="list">
                    <li className="partialNotice">
                        <div className="f-right">
                            <Link to={`/notice/123`} className="action pad-small f-left">See details</Link>
                        </div>
                        <p className="message"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ab quibusdam animi nemo, et incidunt
                            molestiae unde modi laboriosam velit dignissimos dolorum blanditiis laborum quasi veritatis corporis
                            nesciunt voluptas eos?</p>
                    </li>
                    <li className="partialNotice">
                        <div className="f-right">
                            <Link className="action pad-small f-left">See details</Link>
                        </div>
                        <p className="message">Lorem ipsum dolor sit amet.</p>
                    </li>
                    <li className="partialNotice">
                        <div className="f-right">
                            <Link className="action pad-small f-left">See details</Link>
                        </div>
                        <p className="message">{user} comment {title}: Lorem ipsum dolor sit amet consectetur.</p>
                    </li>
                    <li className="partialNotice">
                        <div className="f-right">
                            <Link className="action pad-small f-left">See details</Link>
                        </div>
                        <p className="message">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    </li>
                    <li className="partialNotice">
                        <div className="f-right">
                            <Link className="action pad-small f-left">See details</Link>
                        </div>
                        <p className="message">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </li>
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