import { useDispatch, useSelector } from "react-redux";
import ResultCard from "../../components/ResultCard";
import React, { useEffect, useState } from "react";
import { recommendWatchlistsThunk } from "../../services/thunks/recommend-thunk";


const RecommendWatchlists = () => {
    const { watchlists } = useSelector((state) => state.recommend);
    const dispatch = useDispatch();

    useEffect(() => {
        if (watchlists.length === 0) {
            dispatch(recommendWatchlistsThunk());
        }
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const cardSize = 320;

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    let itemsCount = Math.floor(windowWidth / cardSize);
    console.log(watchlists, "debug recommend watchlists")
    return (
        <div className={"m-2"}>
            <div
                style={{ display: "flex", alignItems: "center" }}>
                <h2 className={"ms-2"}>Recommend Watchlists</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {watchlists.map((watchlist) => (
                    <div
                        key={watchlist._id}
                        style={{ flex: `1 0 ${100 / itemsCount}%`, maxWidth: `${100 / itemsCount}%` }}
                    >
                        <ResultCard item={watchlist} type={"watchlist"} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default RecommendWatchlists;