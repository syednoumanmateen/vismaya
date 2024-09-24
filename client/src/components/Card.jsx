import React, { memo } from 'react'

const Card = ({ children }) => {
    return (
        <>
            <div className="card shadow-sm " style={{ maxWidth: "100%" }}>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </>
    )
}

export default memo(Card)
