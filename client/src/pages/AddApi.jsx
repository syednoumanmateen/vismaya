import axios from 'axios'
import React from 'react'
import { Controller, useForm } from "react-hook-form"

const AddApi = ({ }) => {
    const { register, handleSubmit, control } = useForm()

    const onSubmit = async (data) => {
        const payload = { ...data, status: data.status === true ? "online" : "offline" }
        await axios.post("http://localhost:8000/api/create", payload)
        navigate(0)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-1">
                    <div className=" col-6 mb-3">
                        <label className="form-label">name </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Enter Api Name" className="form-control" />
                    </div>
                    <div className=" col-6 mb-3">
                        <label className="form-label">Version </label>
                        <input {...register("version")} type="text" placeholder="Enter Api Version" className="form-control" />
                    </div>
                    <div className=" col-6 mb-3">
                        <label className="form-label">Status </label>
                        <Controller
                            name="status"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <div
                                    className={`toggle-button ${field.value ? 'on' : ''}`}
                                    onClick={() => field.onChange(!field.value)}
                                >
                                    <div className="toggle-knob" />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <button className='btn btnmd btn-success'>Submit</button>
            </form>
        </>
    )
}

export default AddApi
