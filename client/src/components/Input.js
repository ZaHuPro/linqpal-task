import React from 'react'

export default function Input({ placeholder, register, errors, message, type }) {
    return (
        <div className="group">
            <input
          type= {type ? type : "text"}
          className="form-control"
          placeholder={placeholder}
          {...register}
        />
        {errors && errors.type === 'required' && <span className="error">This field is required</span>}
        {errors && errors.type === 'pattern' && <span className="error">This is not a valid {message}</span>}
        {errors && errors.type === 'manual' && <span className="error">{errors.message}</span>}
        </div>
    )
}
