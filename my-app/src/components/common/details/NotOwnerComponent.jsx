/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch, useSelector } from 'react-redux';
import { formHandller } from '../../../services/utility';
import { makeOffer, selectItemsError, cleanErrorFromCatalog} from '../../../slices/itemsSlice';

export default function NotOwner({ item, user }) {
    const dispatch = useDispatch();

    const error = useSelector(selectItemsError);


    const { title, imgUrl, category, description, price, bider, id } = item;

    const currentUser = user?.id;

    const isBider = bider?._id === currentUser;


    const setBider = async (data) => {
        const result = await dispatch(makeOffer({ data, id }));
        if (result.error) {
            return;
        }else{
            if(error){
             dispatch(cleanErrorFromCatalog());
            }
        }
    };

    const onSubmit = formHandller(setBider);

    return (
        <section id="catalog-section">

            <h1 className="item">
                {title}
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