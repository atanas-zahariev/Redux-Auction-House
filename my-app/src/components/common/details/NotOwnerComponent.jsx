/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { formHandller } from '../../../services/utility';

import { makeOffer, selectItemsError, cleanErrorFromCatalog} from '../../../slices/itemsSlice';
import { cleanAuthError, selectAuthError } from '../../../slices/authSlice';
import { Link } from 'react-router-dom';

export default function NotOwner({ item, user }) {
    const dispatch = useDispatch();

    const itemsError = useSelector(selectItemsError);
    const authError = useSelector(selectAuthError);


    useEffect(() => {
        if (authError) {
            dispatch(cleanAuthError());
        }
        if (itemsError) {
            dispatch(cleanErrorFromCatalog());
        }
        // eslint-disable-next-line
    }, []);



    const { title, imgUrl, category, description, price, bider, id } = item;

    const currentUser = user?.id;

    const isBider = bider?._id === currentUser;


    const setBider = async (data) => {
        data.oldPrice = price;
        data.price = Number(data.price);

        const result = await dispatch(makeOffer({ data, id }));

        if (result.error) {
            return;
        }else{
            if(itemsError){
             dispatch(cleanErrorFromCatalog());
            }
        }
    };

    const onSubmit = formHandller(setBider);

    return (
        <section id="catalog-section">

            <h1 className="item">
                {title}
                <div className="f-right">
                    <Link  className="action pad-small f-left" >Comment</Link>
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

                            {currentUser ?
                                <div>
                                    {isBider ?
                                        <div>
                                            You are currently the <strong>highest bidder</strong> for this auction
                                        </div> :
                                        <form className="vertical" onSubmit={onSubmit}>
                                            <label><span>Bid amount</span><input type="number" name="price" /></label>
                                            <input className="action" type="submit" value="Place bid" />
                                        </form>
                                    }
                                </div> :
                                null
                            }

                        </div>

                    </div>
                </div>

                <footer>
                    {user ?
                        <div>Listed by {user.username ? user.username : user.firstname} </div>
                        : null
                    }
                </footer>
            </div>

        </section>
    );
}