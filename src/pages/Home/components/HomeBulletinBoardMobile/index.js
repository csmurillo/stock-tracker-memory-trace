import Slider from "react-slick";
const HomeBulletinBoardMobile = () =>{
    return (
    <div id="home-bulletin-board-mobile">
        <h1 className="custom-font-one">Create a Watchlist</h1>
        <Slider className="f-30" infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={9000}>
            <div className="d-flex justify-content-center">
                <div>Track Stocks</div>
            </div>
            <div className="d-flex justify-content-center">
                <div>Search Stocks</div>
            </div>
            <div className="d-flex justify-content-center">
                <div>Recieve Price Alerts</div>
            </div>
            <div className="d-flex justify-content-center">
                <div>Much More</div>
            </div>
        </Slider>
    </div>
    );
};
export {HomeBulletinBoardMobile};