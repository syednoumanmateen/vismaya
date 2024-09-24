import axios from 'axios'
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const VersionHandle = ({ data }) => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (input) => {
        const payload = { ...input, apiId: data._id }
        await axios.post("http://localhost:8000/api/version/create", payload)
        navigate(0)
    }

    return (
        <>
            <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-1">
                    <div className=" col-6 mb-3">
                        <label className="form-label">Version </label>
                        <input {...register("version", { required: true })} type="text" placeholder="Enter Api Name" className="form-control" />
                    </div>
                </div>
                <button className='btn btnmd btn-success'>Submit</button>
            </form>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Api Name</th>
                        <th scope="col">Version</th>
                        <th scope="col">Api Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.version.map((v, ind) => (
                        <tr>
                            <th scope="row">{ind + 1}</th>
                            <td>{data.name}</td>
                            <td>{v.version}</td>
                            <td>{data.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default memo(VersionHandle)
