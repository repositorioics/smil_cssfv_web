import React from "react";
import '../users/Register.css';

const user = props => {
	return (
		<div className="custom-container" style={{marginTop:"5%"}}>
			<div className="form-block" style={{ marginTop: 10 }}>
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="panel-title">{props.title}</div>
					</div>
					<div style={{ paddingTop: 5 }} className="panel-body" >
						<div style={{ display: "none" }} id="login-alert" className="alert alert-danger col-sm-12"></div>
						<form onSubmit={e => { e.preventDefault(); }}>
							<div style={{ marginTop: 5 }} className="input-group">
								<input
									id="name"
									autoComplete="off"
									type="text"
									maxLength={50}
									className="form-control"
									name="name"
									pattern="[A-Za-z\s]+"
									value={props.name}
									onChange={props.handleChangeName}
									placeholder="Nombres" />
							</div>
							<label className="messageError">{props.errorMessageName}</label>
							<div style={{ marginTop: 5 }} className="input-group">
								<input
									id="lastName"
									autoComplete="off"
									type="text"
									maxLength={50}
									className="form-control"
									name="lastName"
									pattern="[A-Za-z\s]+"
									value={props.lastName}
									onChange={props.handleChangeLastName}
									placeholder="Apellidos" />
							</div>
							<label className="messageError">{props.errorMessageLastName}</label>
							<div style={{ marginTop: 5 }} className="input-group">
								<input
									id="userName"
									autoComplete="off"
									type="text"
									maxLength={50}
									className="form-control"
									name="userName"
									value={props.userName}
									onChange={props.handleChangeUserName}
									placeholder="Usuario" />
							</div>
							<label className="messageError">{props.errorMessageUserName}</label>
							<div style={{ marginTop: 5 }} className="input-group">
								<input
									id="email"
									autoComplete="off"
									type="text"
									className="form-control"
									name="email"
									maxLength={50}
									value={props.email}
									onChange={props.handleChangeEmail}
									placeholder="Correo" />
							</div>
							<label className="messageError">{props.errorMessageEmail}</label>
							<div style={{ marginTop: 5 }} className="input-group">
								<input
									id="password"
									autoComplete="off"
									type="password"
									maxLength={50}
									className="form-control"
									name="password"
									value={props.password}
									onChange={props.handleChangePassword}
									disabled={props.disabledPwd}
									placeholder="Contraseña" />
							</div>
							<label className="messageError">{props.errorMessagePassword}</label>
							<div style={{ marginTop: 5 }} className="input-group">
								<input
									id="confirmPwd"
									autoComplete="off"
									type="password"
									maxLength={50}
									className="form-control"
									name="confirmPwd"
									value={props.confirmPwd}
									onChange={props.handleChangeConfirmPwd}
									disabled={props.disabledPwd}
									placeholder="Confirmar contraseña" />
							</div>
							<label className="messageError">{props.errorMessageConfirmPwd}</label>
							<div style={{ marginTop: 5 }} className="input-group">
								<div>
									<input
										id="personalCode"
										autoComplete="off"
										type="number"
										className="form-control"
										name="personalCode"
										value={props.personalCode}
										min={0}
										pattern="\d*"
										onChange={props.handleChangePersonalCode}
										placeholder="Código personal" />
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
	);
}

export default user;