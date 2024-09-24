import axios from 'axios'
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEdit } from "react-icons/fi";
import Card from './Card'

const PlanHandle = ({ data }) => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (input) => {
        const payload = { ...input, apiId: data._id }
        await axios.post("http://localhost:8000/api/plan/create", payload)
        navigate(0)
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/plan/delete/${id}`)
        navigate(0)
    }

    const handleEdit = async (id) => {
        await axios.put(`http://localhost:8000/api/plan/update/${id}`, {})
        navigate(0)
    }

    return (
        <>
            <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-1">
                    <div className=" col-6 mb-3">
                        <label className="form-label">Name </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Enter Api Name" className="form-control" />
                    </div>
                    <div className=" col-6 mb-3">
                        <label className="form-label">Amount </label>
                        <input {...register("amount", { required: true })} type="number" placeholder="Enter Api Name" className="form-control" />
                    </div>
                </div>
                <button className='btn btnmd btn-success'>Submit</button>
            </form>


            <div className="row g-0">
                {data.plan.map((p, ind) => (
                    <div key={ind} className="col-2 me-2">
                        <Card>
                            <div className="row g-0">
                                <div className="col-10">
                                    <div className="fs-3 fw-bold">
                                        {p.name}
                                    </div>
                                    <div className="fs-6 text-secondary">
                                        {p.name}: {p.amount}/hour
                                    </div>
                                </div>
                                <div className="col-1" onClick={() => handleEdit(p._id)}>
                                    <FiEdit />
                                </div>
                                <div className="col-1 text-danger" onClick={() => handleDelete(p._id)}>
                                    <MdDeleteOutline />
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    )
}


export default memo(PlanHandle)
