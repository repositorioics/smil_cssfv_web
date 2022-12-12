import React from 'react';
import TextField from '@material-ui/core/TextField';
import fondoPantalla from '../../images/Laboratorio_analisis_clinicos.jpg';
import Loading from '../loading/Loading';
import '../login/Login.css';

const Login = props => {
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <section className="login-block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 login-sec">
                            <h2 className="text-center">Autenticación</h2>
                            <form className="login-form">
                                <div className="form-group">
                                    <TextField
                                        value={props.userName}
                                        onChange={props.handleChangeName}
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        label="Usuario" />
                                    <label style={{marginTop:10}} className="messageError">{props.errorMessageName}</label>
                                </div>

                                <div className="form-group">
                                    <TextField
                                        value={props.password}
                                        onChange={props.handleChangePassword}
                                        type="password"
                                        className="form-control"
                                        autoComplete="off"
                                        onKeyPress={props.onKeyPressPwd}
                                        label="Contraseña" />
                                    <label style={{marginTop:10}} className="messageError">{props.errorMessagePwd}</label>
                                </div>

                                <div className="form-check">
                                    <button onClick={props.authenticate} type="button" className="btn btn-login float-right">Iniciar sesión</button>
                                </div>
                            </form>
                            <div className="copy-text">Created by Development Team ICS - Nicaragua</div>
                        </div>
                        <div className="col-md-8 banner-sec">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active">
                                        <img className="d-block img-fluid" src={fondoPantalla} alt="First slide" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <div className="banner-text">
                                                <h2>Bienvenido</h2>
                                                <p>Al sistema del laboratorio</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Login;