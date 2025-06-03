import { useSelector } from 'react-redux';
import '../App.css'


const Loader = () => {
    const state = useSelector(state => state.loader);
    return (<>
        {state && <>
            <div className="loader-overlay">
                <div className="loader"></div>
            </div>
        </>
        }
    </>
    )
}

export default Loader;