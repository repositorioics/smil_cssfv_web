import React from "react";
import { Link } from "react-router-dom";
import '../users/Register.css';

const ChangePassword = props => {
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
							<div className="row" style={{ marginTop: 15 }}>
								<Link className="custom-btn-register-back c-border-radius" to="/seguridad/usuarios">
									<button type="button" className="btn btn-default custom-btn-register-back">Regresar</button>
								</Link>
								<button type="button" className="btn btn-default custom-btn-register" onClick={props.saveData} disabled={props.disableBtnSave}>Guardar</button>
								{/* <button type="button" className="btn btn-default custom-btn-register-clear" onClick={props.clearData}>Limpiar</button> */}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChangePassword;