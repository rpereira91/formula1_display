import React from 'react'
import "./styles.css"
const BoldDisplay = ({upper, bolded}) => {
    return (
        <div className="dataContainer">
            <span className="upper">{upper}</span>
            <span className="bolded">{bolded}</span>
        </div>
    )
}

export default BoldDisplay
