import React, { memo, useCallback, useEffect, useState } from 'react'
import Modal from '../components/model/Modal'
import ApiDetails from './ApiDetails'
import Card from '../components/Card'
import axios from "axios"
import { MdDeleteOutline } from 'react-icons/md'
import { FiEdit } from "react-icons/fi";
import AddApi from './AddApi'
import PlanHandle from '../components/PlanHandle'
import VersionHandle from '../components/VersionHandle'
import { useNavigate } from 'react-router-dom'

const Api = () => {
    const [showApiDetails, setShowApiDetails] = useState(false)
    const [showPlan, setShowPlan] = useState(false)
    const [showVersion, setShowVersion] = useState(false)
    const [addApi, setAddApi] = useState(false)
    const [selectedApi, setSelectedApi] = useState({})
    const [apiData, setApiData] = useState([])
    const navigate = useNavigate()

    const apiCall = useCallback(async () => {
        const result = await axios.get("http://localhost:8000/api/getall")
        setApiData(result.data.result.data)
    }, [])

    useEffect(() => {
        apiCall()
    }, [apiCall, addApi])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/delete/${id}`)
        navigate(0)
    }

    return (
        <>
            <div className="row m-0 p-0">
                <div className="col-12 text-end mb-3">
                    <button className='btn btn-md btn-success' onClick={(e) => setAddApi(!addApi)}>Add Api</button>
                </div>
                {apiData.length && apiData.map(aprd => (
                    <div key={aprd.name} className="col-4 mb-3">
                        <Card>
                            <div className='text-end'>
                                <div className='text-danger' onClick={() => handleDelete(aprd._id)}>  <MdDeleteOutline /> </div>
                            </div>
                            <div className="fw-normal fs-4 mb-4">{aprd.name}</div>
                            <div className="text-secondary mb-4" style={{ fontSize: "14px" }}>{aprd.name}-{aprd?.version[0]?.version}</div>
                            <div className="mb-3">{aprd.description}</div>
                            <div className="row g-0 border-bottom p-1 align-items-center">
                                <div className="col-7">  <span className={`online-dot me-2 ${aprd.status === 'online' ? 'online' : 'offline'}`}></span>Published-{aprd.status}</div>
                                <div className="col-5 text-end">
                                    <button className='btn btn-xs btn-primary' style={{ fontSize: "12px" }} onClick={() => { setShowApiDetails(true); setSelectedApi(aprd); }}>Edit Template </button>
                                </div>
                            </div>
                            <div className="row g-0 border-bottom p-1 align-items-center">
                                <div className="col-11">Version</div>
                                <div className="col-1 text-end">
                                    <div onClick={() => { setShowVersion(true); setSelectedApi(aprd); }}><FiEdit /></div>
                                </div>
                            </div>
                            <div className="row g-0 border-bottom p-1 align-items-center">
                                <div className="col-11">Plan</div>
                                <div className="col-1 text-end">
                                    <div onClick={() => { setShowPlan(true); setSelectedApi(aprd); }}><FiEdit /></div>
                                </div>
                            </div>
                            <div className="row g-0 p-1">
                                <div className="col-11">Client Id</div>
                                <div className="col-1 text-end"><FiEdit /></div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            {showApiDetails && <Modal title={`${selectedApi.name} Details`} show={showApiDetails} onClose={() => setShowApiDetails(!showApiDetails)}>
                <div style={{ height: "80vh", overflow: "scroll" }}>  <ApiDetails id={selectedApi._id} data={selectedApi.operation} /></div>
            </Modal>}


            {showPlan && <Modal title={`change Plan for ${selectedApi.name}`} show={showPlan} onClose={() => setShowPlan(!showPlan)}>
                <PlanHandle data={selectedApi} />
            </Modal>}

            {showVersion && <Modal title={`Change Version for  ${selectedApi.name}`} show={showVersion} onClose={() => setShowVersion(!showVersion)}>
                <VersionHandle data={selectedApi} />
            </Modal>}

            {addApi && <Modal title={`Add Api`} show={addApi} onClose={() => setAddApi(false)}>
                <AddApi onClose={() => setAddApi(false)} />
            </Modal>}
        </>
    )
}

export default memo(Api)
