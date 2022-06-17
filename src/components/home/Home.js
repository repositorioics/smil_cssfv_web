import React from 'react';
import '../home/Home.css';
import MainDash from './mainDash/MainDash';
//import RightSide from '../righSide/RightSide.js';

const Home = props => {
    return (
         <div className="home">
             <div className="homeGlass">
                <div></div>
                    <MainDash 
                        data={props.data}
                        cardsData={props.cardsData}
                        categories={props.categories}
                    />
                    {/* <RightSide /> */}
                 <div></div>
             </div>
        </div>
    );
}

export default Home;