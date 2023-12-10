import Card from "react-bootstrap/Card";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import "./index.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { createImageFromInitials as LetterPicture, getRandomColor } from "../LetterPicture/index";

const ResultCard = ({ item, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split('T')[0];
  let name = "";
  let cardSize = 250;
  let showFullName = true;
  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // change to read currentUser from redux since the info of currentUser may be updated
  const { currentUser } = useSelector((state) => state.user);
  const handleClick = (e) => {
    if (type === "watchlist") {
      name = item.watchlistName;
      navigate("/details/watchlist/" + item._id);
    } else if (type === "user") {
      navigate("/profile/" + item._id);
      name = item.userName
      showFullName = false;
    } else if (type === "cloud-stock") {
      navigate("/details/" + item.ticker);
      name = item.ticker;
    }
  };

  return (
    <div className={"m-2"}>
      <Card
        className="wd-card-container wd-card-content"
        style={{
          width: "10rem",
        }}
        onClick={handleClick}
      >
        <Card.Img
          variant="top"
          className={"wd-card-img-custom "}
          src={LetterPicture(cardSize, item.ticker, getRandomColor(), showFullName)}
        />
        <Card.Body>
          {type === "watchlist" && (<>
            <Card.Title className={"wd-card"}>{item.watchListName}</Card.Title>
            <Card.Text className={"wd-card"}>
              <Link
                className={"wd-link"}
                to={
                  currentUser !== null && item.user._id === currentUser._id
                    ? `/profile`
                    : `/profile/${item.user._id}`
                }
              >
                {item.user.userName}
              </Link>
            </Card.Text>
            <Card.Text className={"wd-card"}>
              {item.description ? item.description : "None"}
            </Card.Text>
            <Card.Title className={"wd-card"}>
              Rating: {item.rating.toFixed(2)}
            </Card.Title>
          </>
          )}
          {type === "user" && (
            <>
              <Card.Title className={"wd-card"}>
                <Link
                  className={"wd-link"}
                  to={
                    currentUser !== null && item._id === currentUser._id
                      ? `/profile`
                      : `/profile/${item._id}`
                  }
                >
                  {item.userName}
                </Link>
              </Card.Title>
              <Card.Text className={"wd-card"}>
                {item.typeOfInvestor + ' Investor'}
              </Card.Text>
              <Card.Text className={"wd-card"}>
                Watchlists: {item.watchListCount}
              </Card.Text>
              <Card.Title className={"wd-card"}>
                Since: {item.createTime}
              </Card.Title>
            </>

          )}

          {type === "cloud-stock" && (
            <>
              <Card.Title className={"wd-card"}>
                {item.ticker ? item.ticker : "Unknown"}
              </Card.Title>
              <Card.Text className={"wd-card"}>
                {item.stockName || item.name}
              </Card.Text>
              <Card.Text className={"wd-card"}>
                {'$' + (item.last ? item.last : "Unknown") + ' (' + (item.changePercent).toFixed(2) + '%)'}
              </Card.Text>
              <Card.Title className={"wd-card"}>
                {item.exchangeCode}
              </Card.Title>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default ResultCard;