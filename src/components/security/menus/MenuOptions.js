import React from "react";
import { Link } from "react-router-dom";
//import { Multiselect } from 'multiselect-react-dropdown';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Loading from '../../loading/Loading';
import './Menu.css';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 440,
		marginTop: 15
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
	},
}));

const MenuOptions = props => {
	const classes = useStyles();
	/* const selectMenuData = [];
	if (props.menuList.length > 0) {
		for (let i = 0; i < props.menuList.length; i++) {
			const newObject = {}
			newObject.id = props.menuList[i].id;
			newObject.name = props.menuList[i].nombre

			selectMenuData.push(newObject);
		}
	} */
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
								<div className="c-multiselect">
									<FormControl className={classes.formControl}>
										<InputLabel id="menu-input-label">Seleccione el menú</InputLabel>
										<Select
											labelId="menu-label"
											id="menu-select"
											value={props.menuSelected}
											onChange={props.onSelectMenu}
										>
											<MenuItem value="0">
												<em>None</em>
											</MenuItem>
											{props.menuList.map((e, keyIndex) => {
												return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
											})
											}
										</Select>
										<label style={{ marginTop: 3 }} className="messageError">{props.errorMessageMenu}</label>
									</FormControl>
									{/* <Multiselect
										showArrow={true}
										singleSelect={true}
										placeholder="Seleccione el menú..."
										options={selectMenuData} // Options to display in the dropdown
										selectedValues={props.menuSelected} // Preselected value to persist in dropdown
										onSelect={props.onSelectMenu} // Function will trigger on select event
										onRemove={props.onRemoveMenu} // Function will trigger on remove event
										displayValue="name" // Property name to display in the dropdown options
									/> */}
								</div>
								<div className="input-group">
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
								<label style={{ marginTop: 10 }} className="messageError">{props.errorMessageName}</label>

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
								<div style={{ marginTop: 15 }} className="input-group">
									<TextField
										id="url"
										autoComplete="off"
										type="text"
										maxLength={100}
										className="form-control"
										name="url"
										value={props.url}
										onChange={props.handleChangeUrl}
										label="Url" />
								</div>
								<label style={{ marginTop: 10 }} className="messageError">{props.errorMessageUrl}</label>
								<div style={{ marginTop: 0 }} className="input-group">
									<div>
										<TextField
											id="order"
											autoComplete="off"
											type="number"
											className="form-control"
											name="order"
											min={0}
											value={props.order}
											onChange={props.handleChangeOrder}
											label="Orden"
											InputProps={{
												inputProps: {
													min: 0
												}
											}} />
									</div>
									<div className="checkbox mleft-20" style={{ marginTop: 20 }}>
										<label>
											<input
												className="custom-checkbox"
												id="state"
												type="checkbox"
												name="state"
												checked={props.isActive}
												onChange={props.handleChangeIsActive}
											/> Activar
                                        </label>
									</div>
									<div className="checkbox mleft-20" style={{ marginTop: 20 }}>
										<label>
											<input
												className="custom-checkbox"
												id="visible"
												type="checkbox"
												name="visible"
												checked={props.visible}
												onChange={props.handleChangeVisible}
											/> Es Visible?
                                        </label>
									</div>
								</div>
								<div className="row" style={{ marginTop: 15 }}>
									<Link className="custom-btn-register-back c-border-radius" to="/seguridad/opciones-menu">
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

export default MenuOptions;