import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// const logoStyle = {
//     fontSize: "24px",
//     height: "50px",
//     width: "50px"
// }
const Navbar = (props) => {
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
    }, [location]);
    let navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div>
            <nav className={`px-2 navbar navbar-expand-lg bg-${props.mode === 'light' ? 'light' : 'dark'} `}>
                <div className={`container-fluid`}>
                    {/* <img className='mr-2' style={logoStyle} src={logo} alt="" /> */}
                    <Link className={`navbar-brand text-${props.mode === 'light' ? 'dark' : 'light'} `} to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link text-${props.mode === 'light' ? 'dark' : 'light'} ${location.pathname}==="/home"?"active:""`} aria-current="page" to="/home">Home</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className={`nav-link text-${props.mode === 'light' ? 'dark' : 'light'} ${location.pathname}==="/about"?"active:""`} to="/about">About</Link>
                            </li> */}
                        </ul>


                        <div className={`form-check form-switch mx-2 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" aria-checked="false" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                        </div>
                        {!localStorage.getItem("token") ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/login" role="button" aria-disabled="true">Login</Link >
                            <Link className="btn btn-primary mx-1" to="/signup" role="button" aria-disabled="true">Signup</Link >
                        </form> : <div><i className="fa-solid fa-user ml-2"></i> <span className={` mr-4 ml-1 text-${props.mode === 'light' ? 'dark' : 'light'}`}>{props.name}</span> <button className='btn btn-primary' onClick={handleLogout}> Logout</button> </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
