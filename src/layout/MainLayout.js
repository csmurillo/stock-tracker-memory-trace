import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import './styles.css';
const MainLayout = ({children}) =>{
    return (
        <div id="main-layout">
            <Header></Header>
            <main id="main-content" className="container pt-5 h-100">
                {children}
            </main>
            <Footer></Footer>
        </div>
    );
};
export default MainLayout;