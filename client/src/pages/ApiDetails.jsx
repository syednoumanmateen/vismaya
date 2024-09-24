import React, { memo, useCallback, useEffect, useState } from 'react'
import Card from '../components/Card';
import { IoText, IoMailOutline } from "react-icons/io5";
import { PiTextTBold } from "react-icons/pi";
import { BiParagraph } from "react-icons/bi";
import { IoIosList } from "react-icons/io";
import { MdOutlineChecklist } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { TbCalendarTime } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { GoNumber } from "react-icons/go";
import { MdOutlinePhone } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Modal from '../components/model/Modal';
import AddOperation from './AddOperation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApiDetails = ({ id }) => {
    const [draggedItem, setDraggedItem] = useState(null);
    const [items, setItems] = useState([]);
    const [temp, setTemp] = useState([]);
    const [addOperation, setAddOperation] = useState(false);
    const navigate = useNavigate()

    const apiCall = useCallback(async () => {
        const result = await axios.get(`http://localhost:8000/api/get/${id}`);
        setItems(result?.data?.result?.data?.operation)
    }, [id])

    useEffect(() => {
        apiCall()
    }, [apiCall, id])

    const elements = [
        {
            name: "Text",
            icon: <IoText />,
            data: { label: "Text", type: "text", placeholder: "Enter Your Name" }
        },
        {
            name: "ArrayText",
            icon: <IoText />,
            data: { label: "Array Text", type: "text", placeholder: "Enter Array Elements with comma supperated" }
        },
        {
            name: "Email",
            icon: <IoMailOutline />,
            data: { label: "Email", type: "email", placeholder: "Enter Email" }
        },
        {
            name: "Phone",
            icon: <MdOutlinePhone />,
            data: { label: "Phone Number", type: "tel", placeholder: "Enter Mobile Number" }
        },
        {
            name: "Number",
            icon: <GoNumber />,
            data: { label: "Number", type: "number", placeholder: "Enter Number" }
        },
        {
            name: "Date",
            icon: <CiCalendarDate />,
            data: { label: "Date", type: "date", placeholder: "Choose Date" }
        },
        {
            name: "Date Time",
            icon: <TbCalendarTime />,
            data: { label: "Date Time", type: "datetime-local", placeholder: "Choose Date with Time" }
        },
        {
            name: "TextArea",
            icon: <PiTextTBold />,
            data: { label: "Text Area", placeholder: "Enter Description" }
        },
        {
            name: "Paragraph",
            icon: <BiParagraph />,
            data: { label: "Paragraph", placeholder: "Enter Message" }
        },
        {
            name: "Checkbox",
            icon: <MdOutlineChecklist />,
            data: { label: "Checkbox", type: "checkbox", checked: false, placeholder: "Select Option" }
        },
        {
            name: "Radio",
            icon: <IoIosList />,
            data: { label: "Radio", type: "radio", placeholder: "Choose a Option", "options": ["Option 1", "Option 2"] }
        },
        {
            name: "Select",
            icon: <BsList />,
            data: { label: "Select", type: "select", placeholder: "Choose a Option", "options": ["Option 1", "Option 2"] }
        },
        {
            name: "Upload SSL File",
            icon: <FaFile />,
            data: { label: "SSL File", type: "file", placeholder: "Upload File" }
        },
    ]

    const onDrop = (id) => {
        setTemp([...temp, draggedItem])
    };

    const saveData = async () => {
        try {
            const merged = {};

            temp.forEach(item => {
                if (merged[item._id]) {
                    merged[item._id].template.push({
                        _id: item._id,
                        label: item.label,
                        type: item.type,
                        placeholder: item.placeholder
                    });
                } else {
                    merged[item._id] = {
                        _id: item._id,
                        template: [{
                            _id: item._id,
                            label: item.label,
                            type: item.type,
                            placeholder: item.placeholder
                        }]
                    };
                }
            });

            const output = Object.values(merged);

            const payload = output.map((op, ind) => {
                return {
                    ...op,
                    apiId: id
                }
            })

            await axios.put('http://localhost:8000/api/operation/update', payload);
            navigate(0)
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const removeElement = (index) => {

    }

    const renderView = (view) => {
        switch (view.label) {
            case 'Text':
                return <input type="text" placeholder={view.placeholder} className="form-control" />;
            case 'Array Text':
                return <input type="text" className="form-control" />;
            case 'Email':
                return <input type="email" className="form-control" />;
            case 'Phone Number':
                return <input type="tel" className="form-control" />;
            case 'Number':
                return <input type="number" className="form-control" />;
            case 'Date':
                return <input type="date" className="form-control" />;
            case 'Date Time':
                return <input type="datetime-local" className="form-control" />;
            case 'Text Area':
                return <textarea className="form-control" />;
            case 'Paragraph':
                return <textarea className="form-control" />;
            case 'Checkbox':
                return <input type="checkbox" className='ms-2' checked={view.checked} />;
            case 'Radio':
                return <div>
                    <span className='me-2'><input type="radio" name="radio" value="option1" /> Option 1</span>
                    <input type="radio" name="radio" value="option2" /> Option 2
                </div >
            case 'Select':
                return <div>
                    <select className='form-select' name="select">
                        <option value="">Choose an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </div>
            case 'SSL File':
                return <div>
                    <input type="file" name="file" />
                </div>
        }
    };

    return (
        <>
            <div className="row g-0 p-3 bg-secondary">
                <div className="col-12 text-end my-2">
                    <Card>
                        <button className='btn btn-md btn-success me-3' onClick={() => setAddOperation(true)}>Add Operation</button>
                        <button className='btn btn-md btn-success' onClick={() => saveData()}>Save</button>
                    </Card>
                </div>
                {items.map((itm, itmInd) => (
                    <div className="mb-3">
                        <Card>
                            <div key={itmInd} className="mb-3 row g-3">
                                <div className="col-12 mb-3">
                                    <Card>
                                        <button type="button" className="btn btn-sm btn-primary me-2">
                                            {itm.method}
                                        </button> {itm.endpoint}
                                    </Card>
                                </div>
                                <div className="col-4 items">
                                    <div className="row">
                                        {elements.map((ele, ind) => (
                                            <div className='col-5 me-2 mb-3 align-items-center' key={ind} draggable onDragStart={() => setDraggedItem({ ...ele.data, _id: itm._id })}>
                                                <Card><span className='me-3'>{ele.icon}</span>{ele.name}</Card>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="drop-box col-4 p-0" onDrop={() => onDrop()} onDragOver={(event) => event.preventDefault()}>
                                    <Card>
                                        Drop Here
                                        <div className="p-2 align items-center" style={{ border: "1px dashed lightgrey" }}>
                                            {[...itm.template, ...temp].map((item, index) => {
                                                return <>
                                                    {itm._id === item._id && <div key={index} >
                                                        <div className='row g-0 pb-3 mb-3' style={{ borderBottom: "1px dashed lightgrey" }}>
                                                            <div className="col-11">
                                                                <label className="form-label">{item.label} </label>
                                                                {renderView(item)}
                                                            </div>
                                                            <div className="col-1 text-danger fs-5" >
                                                                <MdDeleteOutline onClick={() => removeElement(item)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }</>
                                            })}
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn btn-sm btn-success mb-2">
                                        Preview
                                    </button>
                                    <Card>
                                        {[...itm.template, ...temp].map((item, index) => {
                                            return <>
                                                {itm._id === item._id && < div key={index} >
                                                    <div className="mb-3">
                                                        <label className="form-label">{item.label} </label>
                                                        {renderView(item)}
                                                    </div>
                                                </div>}
                                            </>
                                        })}
                                    </Card>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            {addOperation && <Modal title={`Add Operation`} show={addOperation} onClose={() => setAddOperation(false)}>
                <AddOperation id={id} onClose={() => setAddOperation(false)} />
            </Modal>}
        </>
    )
}

export default memo(ApiDetails)
