import React, { useState, useEffect } from 'react';
import Home from '../../components/home/Home';
import DataServices from '../../service/Api';


const HomeContainer = props => {
    const [data, setData] = useState([]);
    let [cardsData, setCardsData] = useState([]);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getAllMuestras();
            const getMuestrasEstudios = async () => {
                setExecuteLoading(true);
                try {
                    const response = await DataServices.getMuestrasPorEstudios();
                    if (response.status === 200) {
                        //console.log('Data', response.data);
                        if (response.data.length > 0) {
                            const arrg = [];
                            let nombreEstudio = [];
                            let cantidadMx = 0;
                            for (let i = 0; i < response.data.length; i++) {
                                arrg.push(response.data[i].cantidad);
                                nombreEstudio.push(response.data[i].nombreestudio);
                                cantidadMx = cantidadMx + response.data[i].cantidad;
                                /*if (response.data[i].nombreestudio === "Cohorte Pediátrica Dengue") {
                                    nombreEstudio.push("Dengue");
                                }
                                if (response.data[i].nombreestudio === "Cohorte Pediátrica Influenza") {
                                    nombreEstudio.push("Influenza");
                                }*/
                            }
                            let newArray = [
                                {
                                    name: "Muestras",
                                    data: arrg
                                },
                            ];
                            setCardsData([
                                {
                                    title: "Muestras por estudios",
                                    color: {
                                        backGround: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(44,120,159,0.8802871490393032) 0%, rgba(157,221,224,0.9923319669664741) 60%)",
                                        boxShadow: "0px 10px 20px 0px #e0c6f5"
                                    },
                                    barValue: 100,
                                    value: cantidadMx,
                                    png: "",
                                    series: newArray,
                                },
                                /* {
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
                                },*/
                            ]);
                            //cardsData = cardsData;
                            setCategories(nombreEstudio);
                        }
                        //console.log('cardsData', cardsData);
                        setExecuteLoading(false);
                    }
                } catch (error) {
                    setExecuteLoading(false);
                    console.log('error', error)
                }
            }
            if (cardsData.length <= 0) {
                getMuestrasEstudios();
            }
        } else {
            props.history.push('/');
        }
    }, [cardsData, props]);

    const getAllMuestras = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getLastMuestrasTomadas();
            if (response.status === 200) {
                //console.log(response.data);
                const newArray = [];
                if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        const newObject = {};
                        newObject.id = response.data[i].id;
                        newObject.codigoParticipante = response.data[i].codigoParticipante;
                        newObject.nombre = response.data[i].mxId.nombre;
                        newObject.tipo = response.data[i].catRecepcionId.tipo;
                        //newObject.muestra = response.data[i].mxId.nombre;
                        newObject.fechaRegistro = response.data[i].fechaRegistro;
                        newObject.horaToma = response.data[i].horaToma;
                        newObject.usuario = response.data[i].bioanalistaId !== null ? response.data[i].bioanalistaId.usuario : '';
                        newObject.volumen = response.data[i].volumen;
                        newObject.estado = response.data[i].anulada === true ? 'Anulada' : response.data[i].mxTomada === true ? 'Tomada' : 'Pendiente';
                        newArray.push(newObject);
                    }
                    setData(newArray);
                }
                setExecuteLoading(false);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }
    return (
        <>
            <Home
                data={data}
                cardsData={cardsData}
                categories={categories}
                executeLoading={executeLoading}
            />
        </>
    );
}

export default HomeContainer;