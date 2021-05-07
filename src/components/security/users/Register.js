import React from "react";
import TextField from '@material-ui/core/TextField';
import Loading from '../../loading/Loading';
import '../users/Register.css';

const user = props => {
	return (
		<>
			<Loading
				executeLoading={props.executeLoading}
			/>
			<div className="custom-container">
				<div className="form-block">
					<div className="panel panel-info">
						<div className="panel-heading">
							<div className="panel-title">{props.title}</div>
						</div>
						<div style={{ paddingTop: 5 }} className="panel-body" >
							<div style={{ display: "none" }} id="login-alert" className="alert alert-danger col-sm-12"></div>
							<form onSubmit={e => { e.preventDefault(); }}>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="name"
										autoComplete="off"
										type="text"
										maxLength={50}
										className="form-control c-height"
										name="name"
										pattern="[A-Za-z\s]+"
										value={props.name}
										onChange={props.handleChangeName}
										label="Nombres" />
								</div>
								<label className="messageError">{props.errorMessageName}</label>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="lastName"
										autoComplete="off"
										type="text"
										maxLength={50}
										className="form-control c-height"
										name="lastName"
										pattern="[A-Za-z\s]+"
										value={props.lastName}
										onChange={props.handleChangeLastName}
										label="Apellidos" />
								</div>
								<label className="messageError">{props.errorMessageLastName}</label>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="userName"
										autoComplete="off"
										type="text"
										maxLength={50}
										className="form-control c-height"
										name="userName"
										value={props.userName}
										onChange={props.handleChangeUserName}
										label="Usuario" />
								</div>
								<label className="messageError">{props.errorMessageUserName}</label>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="email"
										autoComplete="off"
										type="text"
										className="form-control c-height"
										name="email"
										maxLength={50}
										value={props.email}
										onChange={props.handleChangeEmail}
										label="Correo" />
								</div>
								<label className="messageError">{props.errorMessageEmail}</label>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="password"
										autoComplete="off"
										type="password"
										maxLength={50}
										className="form-control c-height"
										name="password"
										value={props.password}
										onChange={props.handleChangePassword}
										disabled={props.disabledPwd}
										label="Contraseña" />
								</div>
								<label className="messageError">{props.errorMessagePassword}</label>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="confirmPwd"
										autoComplete="off"
										type="password"
										maxLength={50}
										className="form-control c-height"
										name="confirmPwd"
										value={props.confirmPwd}
										onChange={props.handleChangeConfirmPwd}
										disabled={props.disabledPwd}
										label="Confirmar contraseña" />
								</div>
								<label className="messageError">{props.errorMessageConfirmPwd}</label>
								<div style={{ marginTop: 5 }} className="input-group">
									<div>
										<TextField
											id="personalCode"
											autoComplete="off"
											type="number"
											className="form-control c-height"
											name="personalCode"
											value={props.personalCode}
											min={0}
											pattern="\d*"
											onChange={props.handleChangePersonalCode}
											label="Código personal" 
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
											/> Activar usuario
                                        </label>
									</div>
								</div>
								<div className="row" style={{ marginTop: 15 }}>
									<button type="button" className="btn btn-default custom-btn-register-back" onClick={() => props.goBack()}>Regresar</button>
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

export default user;