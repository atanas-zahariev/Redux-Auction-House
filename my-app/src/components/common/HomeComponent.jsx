import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
       
    return (
        <section id="catalog-section">

            <h1 className="item">Home</h1>

            <div className="item">

                <div className="layout left med">
                    <div className="col">
                        <img src="/static/assets/splash.jpg" className="img-med" alt="static" />
                    </div>

                    <div className="content pad-med">
                        <p>Welcome to the online Auction House.</p>
                        <p>Buy and sell items in categories Real Estate, Vehicles, Furniture, Electronics and
                            Others. Browse available items and place your bid. Create a new listing and collect the
                            highest offer.
                        </p>

                        <div className="align-center">
                            <Link className="action" to="/catalog">Browse Listings</Link>
                            <Link className="action" to="/create">Publish Auction</Link>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}