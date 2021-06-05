import React from 'react'

export default function Textarea({ placeholder, register, errors, message }) {
    return (
        <div className="group">
            <textarea
            className="form-control"
            rows="3"
            placeholder={placeholder}
            {...register}
            ></textarea>
        {errors && errors.type === 'required' && <span className="error">This field is required</span>}
        {errors && (errors.type === 'minLength' || errors.type === 'maxLength') && <span className="error">This field must be between {message} character</span>}
        </div>
    )
}
