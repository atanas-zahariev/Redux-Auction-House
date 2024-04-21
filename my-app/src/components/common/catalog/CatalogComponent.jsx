import { useEffect } from 'react';
import { Link } from 'react-router-dom';


import { Item } from './ItemComponent';
import { selectItems } from '../../../slices/itemsSlice';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { cleanAuthError, selectAuthError } from '../../../slices/authSlice';

export default function Catalog() {
    const authError = useSelector(selectAuthError);
    const dispatch = useDispatch();
    const items = useSelector(state => selectItems(state));

    useEffect(() => {
        if (authError) {
            dispatch(cleanAuthError());
        }
        // eslint-disable-next-line
    }, []);

    return (
        <section id="catalog-section" className="spaced">

            {items?.length > 0 ?
                <ul className="catalog cards">
                    {items.map(x => <Item key={x.id} {...x} />)}
                </ul> :
                <div className="item pad-large align-center">
                    <p>Nothing has been listed yet. Be the first!</p>
                    <div>
                        <Link className="action" to="/create">Publish Auction</Link>
                    </div>
                </div>
            }

        </section>
    );
}