/**
 * Textarea component
 * @label - pass string value to add label for text area,
 * @information - pass string to display the additional information below textarea
 * @placeholder - pass string value to add placeholder
 * @disabled- pass true to make text area disable
 * @appearance - default value is primary to change the appearance type add new textarea_appearances property
 *  
 */
import React, { useState } from "react";
import { string, oneOf, bool } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    textareaForm: props => props.appearance.textareaForm,
    textarea: props => props.appearance.textarea,
    labelFormat: props => props.appearance.labelFormat,
    textareaFocus: props => props.appearance.textareaFocus,
    textareaField: props => props.appearance.textareaField,
    informationFormat: props => props.appearance.informationFormat,
    textareaFieldError: props => props.appearance.textareaFieldError
});

export default function Textarea(props) {
    const error = "";
    const {
        textareaForm,
        textarea,
        labelFormat,
        textareaFocus,
        textareaField,
        textareaFieldError
    } = useStyles(props);

    const { label, disabled } = props;

    const [focus, setFocus] = useState(false);

    const handelFocus = () => setFocus(true);

    const handelOnBlur = () => setFocus(false);

    return (
        <div className={textareaForm}>
            <label className={labelFormat}>{label}</label>
            <div className={focus ? textareaFocus : textarea}>
                <textarea
                    id={props.id}
                    onFocus={handelFocus}
                    onBlur={handelOnBlur}
                    value={props.value}
                    className={error ? textareaFieldError : textareaField}
                    placeholder={props.placeholder}
                    onChange={props.handleChange}
                    disabled={disabled}
                    rows="8"
                />
            </div>
        </div>
    );
}

export const textarea_appearances = {
    primary: {
        textareaForm: {
            display: "flex",
            flexDirection: "column"
        },
        textareaField: {
            borderRadius: 4,
            margin: 2,
            width: "100%",
            /* "&:focus": {
                border: "1px solid rgb(169, 169, 169)",
                borderRadius: 4,
                outline: "none"
            } */
        },
        textareaFieldError: {
            borderRadius: 4,
            margin: 2,
            width: "100%",
            /* border: "1px solid #db0020",
            "&:focus": {
                border: "1px solid #db0020",
                borderRadius: 4,
                outline: "none"
            } */
        },
        /*textareaFocus: {
            border: "2px solid #46a9cb",
            borderRadius: 7,
            display: "inline-flex"
        },*/
        textarea: {
            display: "inline-flex"
        },
        labelFormat: {
            margin: 2,
            color: "#1e0a07", //#6a7070
            "&:first-letter": {
                textTransform: "capitalize"
            }
        },
        informationFormat: {
            margin: 2,
            color: "#1e0a07", //#6a7070
            "&:first-letter": {
                textTransform: "capitalize"
            }
        }
    }
};

Textarea.propTypes = {
    label: string,
    information: string,
    placeholder: string,
    disabled: bool,
    appearance: oneOf(Object.values(textarea_appearances))
};

Textarea.defaultProps = {
    label: "",
    information: "",
    placeholder: "",
    disabled: false,
    appearance: textarea_appearances.primary
};