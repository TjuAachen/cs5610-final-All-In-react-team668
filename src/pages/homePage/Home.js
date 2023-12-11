import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import IndexDashboard from "../../components/IndexDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import RecommendUsers from "./ReommendedUsers";
import RecoomendWatchlists from "./ReommendedWatchlists";
import { findCurrentUserThunk } from "../../services/users/users-thunks";
import Title from "../../components/Title";
import { findCurrentUserStocksThunk } from '../../services/thunks/add-stock-thunk';

function Home() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(findCurrentUserThunk());
        dispatch(findCurrentUserStocksThunk());
    }, [currentUser._id]);


    return (
        <>
            <Title />
            <IndexDashboard />
            <RecoomendWatchlists />
            {/* {currentUser && (currentUser.isVip) && (<RecommendUsers />)} */}
        </>
    )
}

export default Home;