import React from 'react';
import TableContent from '../../table/TableContent.js';
import Cards from '../../cards/Cards.js';

const MainDash = props => {
    return (
         <div>
             <div className='MainDash'>
                 <Cards 
                    cardsData={props.cardsData}
                    categories={props.categories}
                />
                 <TableContent data={props.data}/>
             </div>
        </div>
    );
}

export default MainDash;