// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import { selectError } from '../../slices/authSlice';



export default function Error() {
    const error = useSelector(selectError);
    console.log(error);
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