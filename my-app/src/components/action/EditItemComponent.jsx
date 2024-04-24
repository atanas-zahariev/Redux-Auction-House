import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



import Spinner from '../common/Spinner';

import { formHandller } from '../../services/utility';

export default function Edit() {
    const { id } = useParams();

    const navigate = useNavigate();



    const [item, setItem] = useState({});

    const getItem = async () => {
      
    };

    const editItem = async (data) => {
       
    };
    const onSubmit = formHandller(editItem);

    useEffect(() => {
        getItem();
        // eslint-disable-next-line
    }, []);

    if (item.item) {

        return (
            <section id="create-section">

                <h1 className="item">Edit Auction</h1>

                <div className="item padded align-center">

                    <form className="layout left large" onSubmit={onSubmit} >

                        <div className="col aligned">
                            <label>
                                <span>Title</span>
                                <input type="text" name="title" defaultValue={item.item.title} />
                            </label>

                            <label>
                                <span>Category</span>
                                <select name="category" defaultValue={item.item.category}  >
                                    <option value="estate">Real Estate</option>
                                    <option value="vehicles">Vehicles</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>

                            <label>
                                <span>Image URL</span>
                                <input type="text" name="imgUrl" defaultValue={item.item.imgUrl} />
                            </label>

                            <label>
                                <span>Starting price</span>
                                <input type="number" name="price"
                                    disabled={(item.item.bider) ? 'disabled' : ''}
                                    defaultValue={item.item.price}
                                     />
                            </label>
                        </div>

                        <div className="content pad-med align-center vertical">
                            <label>
                                <span>Description</span>
                                <textarea name="description" defaultValue={item.item.description} ></textarea>
                            </label>

                            <div className="align-center">
                                <input className="action" type="submit" value="Update Listing" />
                            </div>
                        </div>

                    </form>

                </div>

            </section>
        );
    }

    return (
        <Spinner />
    );
}