import React from 'react';
import Card from '../../components/card/Card'
import '../cards/Cards.css';

/*const cardsData = [
    {
        title: "Muestras por estudios",
        color: {
            backGround: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(159,159,44,0.8802871490393032) 0%, rgba(202,224,157,0.9923319669664741) 60%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5"
        },
        barValue: 100,
        value: 6,
        png: "",
        series: [
            {
                name: "Muestras por estudios",
                data: [5, 1]
            },
        ],
    },
    {
        title: "Revenue",
        color: {
            backGround: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(44,120,159,0.8802871490393032) 0%, rgba(157,221,224,0.9923319669664741) 60%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7"
        },
        barValue: 80,
        value: "14.270",
        png: "",
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40]
            },
        ],
    },
    {
        title: "Expenses",
        color: {
            backGround: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(189,78,45,0.8774860285911239) 0%, rgba(224,174,157,0.981127485173757) 60%)",
            boxShadow: "0px 10px 20px 0px #F9D59B"
        },
        barValue: 60,
        value: "4.270",
        png: "",
        series: [
            {
                name: "Expenses",
                data: [10, 20, 15, 30, 12, 15, 20]
            },
        ],
    },
];*/

const Cards = props => {
    return (
        <div>
            <div className='Cards'>
                {props.cardsData.map((card, id) => {
                    return (
                        <div key={card.title} className='parentContainer'>
                            <Card
                                title={card.title}
                                color={card.color}
                                barValue={card.barValue}
                                value={card.value}
                                png={card.png}
                                series={card.series}
                                categories={props.categories}
                            />
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default Cards;