import React, { useState } from 'react';
//import { AnimateSharedLayout } from 'framer-motion'
import {AnimateSharedLayout, motion} from 'framer-motion/dist/framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar';
import Chart from "react-apexcharts";
import 'react-circular-progressbar/dist/styles.css';
import CloseIcon from '@mui/icons-material/Close';
import '../card/Card.css';

const Card = props => {

    const [expanded, setExpanded] = useState(false);

    return (
         <AnimateSharedLayout>
             {
                 expanded ? 
                    <ExpandedCard param={props} setExpanded={() => setExpanded(false)}/>
                  : <CompactCard param={props} setExpanded={() => setExpanded(true)}/>
             }
         </AnimateSharedLayout>
    );
}

//CompactCard
function CompactCard({param, setExpanded}) {
    return (
        <motion.div className='compactCard'
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow
            }}
            onClick={setExpanded}
            layoutId='expandableCard'
        > 
            <div className='radialBar'>
                <CircularProgressbar 
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
                <span>{param.title}</span>
            </div>
            <div className='detail'>
                <span>Total: {param.value}</span>
                <span>Muestras</span>
            </div >
        </motion.div>
    )
}

//ExpandedCard
function ExpandedCard({param, setExpanded}) {
    const data = {
        options: {
            chart: {
                type: "area",
                height: "auto"
            },
            dropShadow: {
                enabled: false,
                enabledOnSeries: undefined,
                top: 0,
                left: 0,
                blur: 3,
                color: "#000",
                opacity: 0.35
            },
            fill: {
                colors: ["#fff"],
                type: "gradient"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                colors: ["white"]
            },
            tooltip: {
                x: {
                    format: "dd/MM/yyyy"
                },
            },
            grid: {
                show: true
            },
            xaxis: {
                tye: "dateTime",
                categories: param.categories,
            },
        }
    }
    return (
        <motion.div className='expandedCard'
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow
            }}
            layoutId='expandableCard'
        >
            <div style={{alignSelf: 'flex-end', cursor: 'pointer', color: 'white'}}>
                <CloseIcon onClick={setExpanded} />
            </div>
            <span>
                {param.title}
            </span>
            <div className='chartContainer'>
                <Chart series={param.series} type='area' options={data.options}/>
            </div>
            <span></span>

        </motion.div>
    )
}

export default Card;