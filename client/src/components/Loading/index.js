import React from 'react'

const Loading = ({content}) => {
    return (
        <div className="loading">
            {content ? content : 'Loading...'}
        </div>
    )
}

export default Loading
