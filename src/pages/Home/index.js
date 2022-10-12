import React from 'react';
// layout
import MainLayout from '../../layout/MainLayout';
// components
import {DowJones} from './components/DowJones';
import {HomeBulletinBoard} from './components/HomeBulletinBoard';
import {HomeBulletinBoardMobile} from './components/HomeBulletinBoardMobile';
import {TopGainerStocks} from './components/TopGainerStocks';
import {TopLoserStocks} from './components/TopLoserStocks';
// home styles
import './index.css';
// slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DemoNote from '../../components/DemoNote';
const Home = () =>{
    return (
        <MainLayout>
            <DemoNote></DemoNote>
            <div id="home">
                <div className="row mb-5">
                    <div className="col-xl-6 col-lg-8 col-md-8">
                        <div className= "d-flex justify-content-center">
                            <DowJones></DowJones>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-4 col-md-4">
                        <div className= "d-flex flex-column justify-content-center">
                            <div className="d-md-flex d-none justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <HomeBulletinBoard></HomeBulletinBoard>
                                </div>
                            </div>
                            <div className="d-md-none">
                                <HomeBulletinBoardMobile></HomeBulletinBoardMobile>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-5">
                            <TopGainerStocks></TopGainerStocks>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-5">
                            <TopLoserStocks></TopLoserStocks>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
export default Home;