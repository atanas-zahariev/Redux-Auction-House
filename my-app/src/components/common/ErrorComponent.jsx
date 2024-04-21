// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import { selectAuthError } from '../../slices/authSlice';
import { selectItemsError } from '../../slices/itemsSlice';



export default function Error() {
    const authError = useSelector(selectAuthError);
    const itemsError = useSelector(selectItemsError);
    const error = itemsError || authError;
    // console.log(error);
    if (Array.isArray(error)) {
        return (
            <div className="error-box">
                <p>{error.join('\n')}</p>
            </div>
        );
    } else if (typeof error === 'string' && error !== '') {
        return (
            <div className="error-box">
                <p>{error}</p>
            </div>
        );
    } else if (typeof error === 'object'&& error !== null) {
        return (
            <div className="error-box">
                <p>There seems to be a problem please try again later</p>
            </div>
        );
    }
}