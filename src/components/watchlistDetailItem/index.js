import React, { useState, useRef } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillFolderSymlinkFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router";
import "./index.css";




const WatchlistDetailItem = ({
    stock,
    isLike,
    isSelf,
    watchlistsOption,
    handleUnLikeClick,
    handleAddToWatchlist,
    handleMoveWatchlist,
}) => {
    const [like, setLike] = useState(isLike);
    const iconSize = 25;
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const currentDate = stock.date ? stock.date.split('T')[0] : new Date().toISOString().split('T')[0];
    console.log(like, stock, stock.ticker, "debug watchlist detail item")
    return (
        <div className={`mt-3`}>
            <div className={`row w-100 p-0 m-0`}>
                <div
                    className={`p-0 d-flex align-items-center col-2`}
                >
                    <h5
                        className={`ms-1  fw-fold d-inline mb-0 watchlist-detail-stockname text-nowrap`}
                    >
                        {stock.ticker ? stock.ticker : "Unknown"}
                    </h5>
                </div>
                <div className={`col-2 text-muted d-flex align-items-center p-0`}>
                    <h5
                        className={` fw-fold d-inline overflow-hidden-format watchlist-detail-artist text-nowrap mb-0`}
                    >
                        {stock.stockName ? stock.stockName : stock.ticker}
                    </h5>
                </div>

                <div
                    className={`text-muted p-0 d-none d-xl-flex col-2 d-flex align-items-center`}
                >
                    <h5 className={`text-muted fw-fold m-0`}>
                        {stock.closePrice ? stock.closePrice : "unknown"}
                    </h5>
                </div>
                <div
                    className={`text-muted p-0 d-none d-xl-flex col-2 d-flex align-items-center`}
                >
                    <h5 className={`text-muted fw-fold m-0`}>
                        {currentDate}
                    </h5>
                </div>
                <div
                    className={`${isSelf ? `col-1` : `col-2`
                        } d-flex align-items-center justify-content-start p-0`}
                >
                    {like && (
                        <AiFillHeart
                            size={iconSize}
                            className={`text-danger`}
                            onClick={() => {
                                setLike(false);
                                handleUnLikeClick(stock);
                            }}
                        />
                    )}
                    {!like && (
                        <>
                            {!watchlistsOption && (
                                <>
                                    <div className={`position-relative`}>
                                        <div onClick={() => setShow(!show)}>
                                            <AiOutlineHeart
                                                size={iconSize}
                                                className={`text-muted`}
                                            />
                                        </div>
                                        {show && (
                                            <div className={`like-toolkit-div position-absolute rounded-3`}>
                                                <h5 className={` fw-bold m-2`}>
                                                    Enjoy your Investment!
                                                </h5>
                                                <div
                                                    className={`mt-3 mb-1 d-flex justify-content-center align-items-center`}
                                                >
                                                    <button
                                                        className={`btn btn-light p-1`}
                                                        onClick={() => navigate("/login")}
                                                    >
                                                        Log in
                                                    </button>
                                                    <p
                                                        className={`text-muted mb-0 ms-3 not-now`}
                                                        onClick={() => setShow(false)}
                                                    >
                                                        Not Now
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {watchlistsOption && (
                                <div className={`d-flex align-items-center`}>
                                    <Dropdown id="watchlists">
                                        <Dropdown.Toggle
                                            variant="secondary"
                                            id="dropdown-basic"
                                            className={`bg-muted`}
                                        >
                                            <AiFillHeart size={iconSize} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {watchlistsOption.map((p) => (
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        // setLike(true);
                                                        handleAddToWatchlist(p._id, stock, setLike);
                                                    }}
                                                >
                                                    Add to {p.watchListName}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {isSelf && watchlistsOption && like && (
                    <div className={`col-2 d-flex align-items-center p-0`}>
                        <Dropdown id="watchlists">
                            <Dropdown.Toggle
                                variant="warning"
                                id="dropdown-basic"
                                className={`bg-muted`}
                            >
                                <BsFillFolderSymlinkFill
                                    size={iconSize}
                                    className={`show-more-watchlist-option`}
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {watchlistsOption.map((p) => (
                                    <Dropdown.Item
                                        onClick={() => {
                                            handleMoveWatchlist(p._id, stock._id);
                                        }}
                                    >
                                        Move to {p.watchListName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchlistDetailItem;