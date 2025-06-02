import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';


const Loader = () => {
    const state = useSelector(state => state.loader);
    return (<>
        {state &&
            <div className="loader"></div>
        }
    </>
    )
}

export default Loader;