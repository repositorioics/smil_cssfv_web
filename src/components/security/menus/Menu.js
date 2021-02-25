import React from "react";
import { Link } from "react-router-dom";
import './Menu.css';

const Menu = props => {
	return (
		<div className="custom-container" style={{marginTop:"5%"}}>
			<div className="custom-form-block" style={{ marginTop: 10 }}>
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="panel-title">{props.title}</div>
					</div>
					<div style={{ paddingTop: 5 }} className="panel-body" >
						<div style={{ display: "none" }} id="login-alert" className="alert alert-danger col-sm-12"></div>
						<form>
							<div style={{ marginTop: 5 }} className="input-group">
								<input
									id="name"
									autoComplete="off"
									type="text"
									maxLength={64}
									className="form-control"
									name="name"
									pattern="[A-Za-z\s]+"
									value={props.name}
									onChange={props.handleChangeName}
									placeholder="Nombre" />
							</div>
							<label className="messageError">{props.errorMessageName}</label>
							<div style={{ marginTop: 5 }} className="input-group">
								<input
									id="description"
									autoComplete="off"
									type="text"
									maxLength={256}
									className="form-control"
									name="description"
									value={props.description}
									onChange={props.handleChangeDescription}
									placeholder="Descripción" />
							</div>
                            <div style={{ marginTop: 20 }} className="input-group">
								<div>
									<input
										id="order"
										autoComplete="off"
										type="number"
										className="form-control"
										name="order"
										min={0}
										pattern="\d*"
										value={props.order}
										onChange={props.handleChangeOrder}
										placeholder="Orden" />
								</div>
								<div className="checkbox mleft-20">
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
	);
}

export default Menu;