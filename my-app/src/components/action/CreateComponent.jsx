import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formHandller } from '../../services/utility';



export default function CreateItem() {
    const navigate = useNavigate();



    useEffect(() => {
        // eslint-disable-next-line
    }, []);

    const createItem = async (data) => {
        
    };

    const onSubmit = formHandller(createItem);

    return (
        <section id="create-section" className="">

            <h1 className="item">New Auction</h1>

            <div className="item padded align-center">

                <form className="layout left large" onSubmit={onSubmit}>

                    <div className="col aligned">
                        <label>
                            <span>Title</span>
                            <input type="text" name="title" /></label>
                        <label>
                            <span>Category</span>
                            <select name="category" defaultValue={'estate'} >
                                <option value="estate">Real Estate</option>
                                <option value="vehicles">Vehicles</option>
                                <option value="furniture">Furniture</option>
                                <option value="electronics">Electronics</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label>
                            <span>Image URL</span>
                            <input type="text" name="imgUrl" /></label>
                        <label>
                            <span>Starting price</span>
                            <input type="number" name="price" /></label>
                    </div>

                    <div className="content pad-med align-center vertical">
                        <label>
                            <span>Description</span>
                            <textarea name="description" ></textarea>
                        </label>

                        <div className="align-center">
                            <input className="action" type="submit" value="Publish Item" />
                        </div>
                    </div>

                </form>

            </div>

        </section>
    );
}