import React from 'react';
import fondoPantalla from '../../images/Laboratorio_analisis_clinicos.jpg';
import '../login/Login.css';
const Login = props => {
    return (
        <section className="login-block">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 login-sec">
                        <h2 className="text-center">Autenticación</h2>
                        <form className="login-form">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="text-uppercase">Usuario</label>
                                <input
                                    value={props.userName}
                                    onChange={props.handleChangeName}
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Ingrese su usuario" />
                                <label className="messageError">{props.errorMessageName}</label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="text-uppercase">Contraseña</label>
                                <input
                                    value={props.password}
                                    onChange={props.handleChangePassword}
                                    type="password"
                                    className="form-control"
                                    autoComplete="off"
                                    onKeyPress={props.onKeyPressPwd}
                                    placeholder="Ingrese su contraseña" />
                                <label className="messageError">{props.errorMessagePwd}</label>
                            </div>

                            <div className="form-check">
                                {/*  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" />
                                    <small>Remember Me</small>
                                </label> */}
                                <button onClick={props.authenticate} type="button" className="btn btn-login float-right">Iniciar sesión</button>
                            </div>
                        </form>
                        <div className="copy-text">Created by ICS - Nicaragua</div>
                    </div>
                    <div className="col-md-8 banner-sec">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            {/* <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol> */}
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active">
                                    {/* <img className="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide" /> */}
                                    <img className="d-block img-fluid" src={fondoPantalla} alt="First slide" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <div className="banner-text">
                                            <h2>Bienvenido</h2>
                                            <p>Al sistema del laboratorio</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="carousel-item">
                                    <img className="d-block img-fluid" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg" alt="First slide" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <div className="banner-text">
                                            <h2>This is Heaven</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg" alt="First slide" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <div className="banner-text">
                                            <h2>This is Heaven</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Login;