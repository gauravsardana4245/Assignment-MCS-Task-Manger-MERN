import React from 'react'
import Tasks from './Tasks'

const Home = (props) => {

    return (
        <div>
            <Tasks showAlert={props.showAlert} mode={props.mode} setName={props.setName} />
        </div>
    )
}

export default Home
