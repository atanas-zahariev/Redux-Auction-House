
import { useEffect } from 'react';
import FinishedOffers from './FinishedOffersComponent';

const offers = [];

export default function UserClosedOffers() {
   
   
    const getUserClosedOffers = async () => {
       
    };
     
    useEffect(() => {
        getUserClosedOffers();
        // eslint-disable-next-line
    }, []);

    return (
        <section id="catalog-section" className="spaced">

            <h1 className="item">Closed Auctions</h1>

            {offers?.length > 0 ?
                <ul className="catalog cards">
                    {offers.map(x => <FinishedOffers key={x._id} {...x} />)}
                </ul>
                :
                <div className="item pad-large align-center">
                    <p>You haven't closed any auctions yet.</p>
                </div>
            }
        </section>
    );
}