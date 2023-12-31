import React, { useEffect, useState } from 'react';
import { getStockNews } from '../../../../services/remoteAPI-service';
import "./index.css";

const News = ({ ticker }) => {
    const [showModal, setShowModal] = useState(false);
    const [news, setNews] = useState([]);

    const fetchNews = async (ticker) => {
        await getStockNews(ticker).then((response) => setNews(response));
      //  console.log(ticker, news, "debugNews")
       // console.log(response, "debugNewsResponse")
    }

    useEffect(() => {
        fetchNews(ticker);
    }, [ticker]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container">
            <div className="row news-articles">
                {news.map((newsItem, index) => (
                    <div key={index} className="news-cols col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="card card-news container" onClick={() => openModal()}>
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <img className='news-image img-fluid' src={newsItem.urlToImage} alt="" />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                    {newsItem.title}
                                </div>
                            </div>
                        </div>
                        {showModal && <div className="modal" id="content" tabIndex="-1" role="dialog">
                            {/* Modal content */}
                            <div className="modal-header">
                                <p className="modal-title" id="modal-basic-title">
                                    {newsItem.source.name} <br />
                                    <span className='date'>{newsItem.publishedAt}</span>
                                </p>
                                <button type="button" className="close" aria-label="Close" onClick={() => closeModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className='modal-newsTitle'>{newsItem.title}</p>
                                <p>{newsItem.description}</p>
                                <p className='text-muted'>For more details click <a href={newsItem.url} target="_blank">here</a></p>
                            </div>
                            <div className="modal-footer">
                                <div className='row'>Share</div>
                                <div className="row">
                                    <a class="twitter-share-button" target="_blank"
                                        href="https://twitter.com/intent/tweet?text={{encode(newsItem.description)}}+%20+{{encode(newsItem.url)}}">
                                        <svg aria-hidden="true" width="2.5em" height="2.5em" focusable="false" data-prefix="fab"
                                            data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16" role="img"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor"
                                                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                                            </path>
                                        </svg>
                                    </a>
                                    <a class="fb-share-button" target="_blank"
                                        href="https://www.facebook.com/sharer/sharer.php?u={{encode(newsItem.url)}}">
                                        <svg aria-hidden="true" width="2.5em" height="2.5em" focusable="false" data-prefix="fab"
                                            data-icon="facebook-square" class="svg-inline--fa fa-facebook-square fa-w-14" role="img"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z">
                                            </path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
