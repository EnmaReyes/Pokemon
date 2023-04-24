import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import style from "./Landing.module.css"
import pokemontext from './img/pokemontext.png';

const Landing = ()=>{
    const navigate = useNavigate();
    const [access, setAccess] = useState(false)

    useEffect(()=>{
        !access && navigate("/");
    },[access])

    const getInHandler=(event)=>{
        event.preventDefault();
        setAccess(true);
        navigate("/home")
    }
    return( 
        <div className={style.landing}>
            <div>
            <img className={style.titulo} src={pokemontext}/>
            <br/>
            <button className={style.btn} type="submit" onClick={getInHandler}> Start </button>
            </div>
        </div>
    )
}
export default Landing;