import React from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap'
import '../usersRoles/UserProfile.css';

const UserProfile = props => {
    const multiSelectData = [];
    const selectUserData = [];
    if (props.profileData.length > 0) {
        for (let i = 0; i < props.profileData.length; i++) {
            const newObject = {}
            newObject.id = props.profileData[i].id;
            newObject.name = props.profileData[i].nombre

            multiSelectData.push(newObject);
        }
    }
    if (props.userData.length > 0) {
        for (let i = 0; i < props.userData.length; i++) {
            const newObject = {}
            newObject.id = props.userData[i].id;
            newObject.name = props.userData[i].usuario

            selectUserData.push(newObject);
        }
    }
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
                            <div>
                                <Col xs="auto" className="my-1">
                                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                        Usuario
                                    </Form.Label>
                                    {/* <Form.Control
                                        as="select"
                                        className="form-control"
                                        id="inlineFormCustomSelectPref"
                                        value={props.valueUser}
                                        onChange={(e) => props.selectedItemUser(e)}
                                        disabled={props.disabledUser}
                                        custom>
                                        {props.userData.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.usuario}</option>;
                                        })}
                                    </Form.Control> */}
                                    <div className="c-multiselect">
                                        <Multiselect
                                            className="c-multiselect"
                                            showArrow={true}
                                            singleSelect={true}
                                            placeholder="Seleccione..."
                                            options={selectUserData} // Options to display in the dropdown
                                            selectedValues={props.userSelected} // Preselected value to persist in dropdown
                                            onSelect={props.onSelectUser} // Function will trigger on select event
                                            onRemove={props.onRemoveUser} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                        />
                                    </div>
                                    <label className="messageError">{props.errorMessageUser}</label>
                                </Col>
                            </div>
                            <div>
                                <Col xs="auto" className="my-1">
                                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                        Perfil
                                    </Form.Label>
                                    <div className="c-multiselect">
                                        <Multiselect
                                            className="c-multiselect"
                                            showArrow={true}
                                            placeholder="Seleccione..."
                                            options={multiSelectData} // Options to display in the dropdown
                                            selectedValues={props.profileSelected} // Preselected value to persist in dropdown
                                            onSelect={props.onSelect} // Function will trigger on select event
                                            onRemove={props.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                        />
                                    </div>
                                        
                                    {/* <Form.Control
                                        as="select"
                                        className="form-control"
                                        id="inlineFormCustomSelectPref"
                                        value={props.valueProfile}
                                        onChange={(e) => props.selectedItemProfile(e)}
                                        custom>
                                        {props.profileData.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.nombre}</option>;
                                        })}
                                    </Form.Control> */}
                                    <label className="messageError">{props.errorMessageProfile}</label>
                                </Col>
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
                                    /> Activar perfil usuario
                                </label>
                            </div>
                            <div className="row" style={{ marginTop: 15 }}>
                                <Link className="custom-btn-register-back c-border-radius" to="/seguridad/perfil-usuario">
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
export default UserProfile;