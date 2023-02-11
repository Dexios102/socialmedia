import {Outlet} from 'react-router-dom';
import Login from './auth/Login';
import {useContext} from 'react';
import {UserContext} from '../context/UserContext'

const ProtectedRoute = () => {
    let {user} = useContext(UserContext);
    if(user.data!==null) {
        return <Outlet/>
    } else {
        return  <Login/>
    }
}

export default ProtectedRoute;