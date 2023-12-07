import { useDispatch, useSelector } from "react-redux";
import ResultCard from "../../components/ResultCard";
import React, { useEffect, useState } from "react";
import { recommendUsersThunk } from "../../services/thunks/recommend-thunk";


const RecommendUsers = () => {
    const { users } = useSelector((state) => state.recommend);
    const dispatch = useDispatch();

    useEffect(() => {
        if (users.length === 0) {
            dispatch(recommendUsersThunk());
        }
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    let itemsCount = Math.floor(windowWidth / 250);
   /* useEffect(() => {
        dispatch(findCurrentUserThunk());
        dispatch(findCurrentUserSongsThunk());
    }, []);*/
    return (
        <div className={"m-2"}>
            <div
                style={{ display: "flex", alignItems: "center" }}>
                <h2 className={"ms-2"}>Recommend Watchlists</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {users.map((user) => (
                    <div
                        key={user._id}
                        style={{ flex: `1 0 ${100 / itemsCount}%`, maxWidth: `${100 / itemsCount}%` }}
                    >
                        <ResultCard item={user} type={"user"} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default RecommendUsers;