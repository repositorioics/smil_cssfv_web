import React from "react";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Loading from '../../loading/Loading';
import '../roles/Profile.css';

const Profile = props => {
	return (
		<>
			<Loading
				executeLoading={props.executeLoading}
			/>
			<div className="custom-container">
				<div className="custom-form-block">
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
										className="form-control"
										name="description"
										value={props.description}
										onChange={props.handleChangeDescription}
										label="Descripción" />
								</div>
								<div className="row" style={{ marginTop: 15 }}>
									<Link className="custom-btn-register-back c-border-radius" to="/seguridad/perfiles">
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

export default Profile;