import React from 'react'
import loading from "../img/loading_copy.gif"

const Spinner = () => {

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <img style={{ textAlign: "center", margin: "3px 0" }} src={loading} alt="loading" />
    </div>
  )

}

export default Spinner
