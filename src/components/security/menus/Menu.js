import React from "react";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Loading from '../../loading/Loading';
import './Menu.css';

const Menu = props => {
	return (
		<>
			<Loading
				executeLoading={props.executeLoading}
			/>
			<div className="custom-container">
				<div className="custom-form-block" style={{ marginTop: 10 }}>
					<div className="panel panel-info">
						<div className="panel-heading">
							<div className="panel-title">{props.title}</div>
						</div>
						<div style={{ paddingTop: 5 }} className="panel-body" >
							<div style={{ display: "none" }} id="login-alert" className="alert alert-danger col-sm-12"></div>
							<form>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="name"
										autoComplete="off"
										type="text"
										maxLength={64}
										className="form-control"
										name="name"
										pattern="[A-Za-z\s]+"
										value={props.name}
										onChange={props.handleChangeName}
										label="Nombre" />
								</div>
								<label style={{marginTop:10}} className="messageError">{props.errorMessageName}</label>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="description"
										autoComplete="off"
										type="text"
										maxLength={256}
										multiline={true}
										style={{ height: 'auto' }}
										className="form-control"
										name="description"
										value={props.description}
										onChange={props.handleChangeDescription}
										label="Descripción" />
								</div>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="menuIcon"
										autoComplete="off"
										type="text"
										maxLength={64}
										multiline={true}
										style={{ height: 'auto' }}
										className="form-control"
										name="menuIcon"
										value={props.menuIcon}
										onChange={props.handleChangeMenuIcon}
										label="Icono menu" />
								</div>
								<div style={{ marginTop: 20 }} className="input-group">
									<div>
										<TextField
											id="order"
											autoComplete="off"
											type="number"
											className="form-control"
											name="order"
											pattern="\d*"
											value={props.order}
											onChange={props.handleChangeOrder}
											label="Orden" 
											InputProps={{
												inputProps: { 
													min: 0 
												}
											}}/>
									</div>
									<div className="checkbox mleft-20" style={{marginTop: 20}}>
										<label>
											<input
												className="custom-checkbox"
												id="state"
												type="checkbox"
												name="state"
												checked={props.isActive}
												onChange={props.handleChangeIsActive}
											/> Activar menu
                                        </label>
									</div>
								</div>
								<div className="row" style={{ marginTop: 15 }}>
									<Link className="custom-btn-register-back c-border-radius" to="/seguridad/menu">
										<button type="button" className="btn btn-default custom-btn-register-back">Regresar</button>
									</Link>
									<button type="button" className="btn btn-default custom-btn-register" onClick={props.saveData} disabled={props.disableBtnSave}>Guardar</button>
									<button type="button" className="btn btn-default custom-btn-register-clear" onClick={props.clearData}>Limpiar</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Menu;