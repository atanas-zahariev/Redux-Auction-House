import { useNavigate } from 'react-router-dom';
import { formHandller } from '../services/utility';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { cleanError, registerUser, selectError } from '../slices/authSlice';
import { useEffect } from 'react';

export default function Register() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cleanError());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const onRegister = async (data) => {
    const result = await dispatch(registerUser(data));
    if (result.error) {
      return;
    } else {
      if (error) {
        dispatch(cleanError());
      }
      navigate('/');
    }
  };

  const onSubmit = formHandller(onRegister);

  return (
    <section id="register-section" className="narrow">

      <h1 className="item">Register</h1>

      <div className="item padded align-center">

        <form className="aligned" onSubmit={onSubmit} >

          <label>
            <span>Email</span>
            <input type="text" name="email" />
          </label>
          <label>
            <span>First name</span>
            <input type="text" name="firstname" />
          </label>
          <label>
            <span>Last name</span>
            <input type="text" name="lastname" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" />
          </label>
          <label>
            <span>Repeat Password</span>
            <input type="password" name="repass" />
          </label>

          <div className="align-center">
            <input className="action" type="submit" value="Create Account" />
          </div>

        </form>

      </div>

    </section>
  );
}