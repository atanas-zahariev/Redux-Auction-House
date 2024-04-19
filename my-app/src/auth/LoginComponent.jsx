// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { formHandller } from '../services/utility';
import { cleanError, loginUser, selectError, selectUser } from '../slices/authSlice';

export default function Login() {
    const state = useSelector(selectUser);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = async (data) => {
        const result = await dispatch(loginUser(data));
        if (result.error) {
            return;
        } else {
            if(error){
                dispatch(cleanError(state));
            }
            navigate('/');
        }
    };

    const onSubmut = formHandller(userLogin);

    return (
        <section id="login-section" className="narrow">

            <h1 className="item">Login</h1>

            <div className="item padded align-center">

                <form className="aligned" onSubmit={onSubmut} >

                    <label>
                        <span>Email</span>
                        <input type="text" name="email" />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" name="password" />
                    </label>

                    <div className="align-center">
                        <input className="action" type="submit" value="Sign In" />
                    </div>

                </form>

            </div>

        </section>


    );
}