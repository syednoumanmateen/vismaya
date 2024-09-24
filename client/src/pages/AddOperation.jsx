import axios from 'axios'
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

const AddOperation = ({ id, onClose }) => {
    const { register, handleSubmit, control } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const payload = { ...data, apiId: id, template: [] }
        await axios.post("http://localhost:8000/api/operation/create", payload)
        navigate(0)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-1">
                    <div className=" col-6 mb-3">
                        <label className="form-label">End point </label>
                        <input {...register("endpoint", { required: true })} type="text" placeholder="Enter Operation End Point" className="form-control" />
                    </div>
                    <div className=" col-6 mb-3">
                        <label className="form-label">Method </label>
                        <select {...register("method")} className='form-select'>
                            <option value="">Choose an Method</option>
                            <option value="POST">POST</option>
                            <option value="GET">GET</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">Delete</option>
                        </select>
                    </div>
                </div>
                <button className='btn btnmd btn-success'>Submit</button>
            </form>
        </>
    )
}

export default AddOperation
