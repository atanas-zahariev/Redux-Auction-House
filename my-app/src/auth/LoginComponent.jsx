// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch } from 'react-redux';
import { formHandller} from '../services/utility';
import { loginUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

    const userLogin = async (data) => {
        try {
            await dispatch(loginUser(data));
            setUser();
            navigate('/');
        } catch (error) {
            console.log(error);
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