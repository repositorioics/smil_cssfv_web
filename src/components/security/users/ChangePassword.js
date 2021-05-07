import React from "react";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Loading from '../../loading/Loading';
import '../users/Register.css';

const ChangePassword = props => {
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
										id="password"
										autoComplete="off"
										type="password"
										maxLength={50}
										className="form-control"
										name="password"
										value={props.password}
										onChange={props.handleChangePassword}
										disabled={props.disabledPwd}
										label="Contraseña" />
								</div>
								<label style={{marginTop:10}} className="messageError">{props.errorMessagePassword}</label>
								<div style={{ marginTop: 5 }} className="input-group">
									<TextField
										id="confirmPwd"
										autoComplete="off"
										type="password"
										maxLength={50}
										className="form-control"
										name="confirmPwd"
										value={props.confirmPwd}
										onChange={props.handleChangeConfirmPwd}
										disabled={props.disabledPwd}
										label="Confirmar contraseña" />
								</div>
								<label style={{marginTop:10}} className="messageError">{props.errorMessageConfirmPwd}</label>
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
		</>
	);
}

export default ChangePassword;