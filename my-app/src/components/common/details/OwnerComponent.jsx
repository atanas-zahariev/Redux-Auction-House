import { Link, useNavigate } from 'react-router-dom';





export default function Owner({ item }) {
    const navigate = useNavigate();



    const { title, imgUrl, category, description, price, bider, _id } = item.item;

    const { user } = item;


    const onSubmit = async () => {
       
    };


   


    function deleteItem() {
        // const hasUser = getUser();

        // if (!hasUser) {
        //     setCheck(true);
        //     return;
        // }

        // getError(`Delete/${title}/${_id}`);

    }



    return (
        <section id="catalog-section">

            <h1 className="item">
                {title}
                <div className="f-right">
                    <Link to={`/edit/${_id}`} className="action pad-small f-left" >Edit</Link>
                    <Link onClick={deleteItem} className="action pad-small f-left" >Delete</Link>
                </div>
            </h1>

            <div className="item padded">

                <div className="layout right large">

                    <div className="col">
                        <img src={imgUrl} className="img-large" alt="" />
                    </div>

                    <div className="content pad-med">

                        <p>In category: <strong>{category}</strong></p>
                        <p>{description}</p>

                        <div className="align-center">
                            <div>
                                Current price: $<strong>{price}</strong>
                            </div>

                            <div>
                                {bider ?
                                    <div>
                                        Bid by <strong>{bider.firstname} {bider.lastname}</strong>
                                        <Link onClick={onSubmit} className="action pad-med cta">Close Auction</Link>
                                    </div> :
                                    <div>
                                        No bids
                                    </div>}
                            </div>
                        </div>

                    </div>
                </div>

                <footer>
                    <div>Listed by {user.username ? user.username : user.firstname} </div>
                </footer>
            </div>

        </section>
    );
}