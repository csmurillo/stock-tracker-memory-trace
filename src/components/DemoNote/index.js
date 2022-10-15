import React, { useRef } from 'react';
import './index.css';
import { GrFormClose } from "react-icons/gr";

const DemoNote = () =>{
    const modalRef=useRef();
    const removeDemoNoteModal = ()=>{
        modalRef.current.remove();
    };
    return (
        <div id="demo-note-container" ref={modalRef} className='d-flex justify-content-center align-items-center'>
            <div id="demo-note-modal">
                <div id="demo-note-header">
                    <GrFormClose id="close-icon" style={{fontSize:30}} onClick={removeDemoNoteModal}/>
                </div>
                <div id="demo-note-body">
                    <p>Note:</p>
                    <ol className='overload'>
                        <li>
                            <p className='lg-text'>This is a <span className='underline'>DEMO SITE</span> please feel free to use dummy data when creating a profile. Or login with: <span className="bold underline">demouser@example.com</span> password:<span className="bold underline">!@PU9Zr22</span></p>
                        </li>
                        <li>
                            <p className='lg-text'>All data shown is predefined because the online stock APi's available prohibits sharing live data from their API to third
                            party without a license. Since this is a demo site I created an <a href='https://github.com/csmurillo/MockStockAPI'>API</a> that mimics the live data, but if i were to pay for the license 
                            this website would work with the stock API's live stock data.</p>
                        </li>
                        <li>
                            <p className='lg-text'>Also for privacy concerns sending price alert text messages to user phone is not implemented on the demo site.</p>
                        </li>
                        <li>
                            <p className='lg-text'>Any questions contact me at: csmurillo00@gmail.com</p>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default DemoNote;