import { useState } from "react";
import validacion from  "./Validacion"
import axios from "axios";
import NavBar from "../../Components/NavBar/NavBar";

const Form = ()=>{

    const [form, setForm] = useState({
        name: "",
        type: "",
        hp: false,
        attack: false,
        defense: false,
        speed: false,
        height: false,
        weight: false,
        image: "",

    })

    
    const [errors, setErrors] = useState({
        name: "",
        type: "",
        hp: false,
        attack: false,
        defense: false,
        speed: false,
        height: false,
        weight: false,
        image: "",

    })

    const pokeChangehandler = (event)=>{
        const property = event.target.name;
        const value= event.target.value;

        validacion({...form, [property]:value}, errors, setErrors)
        setForm({...form, [property]:value})
    }

    const submitHadler=(event)=>{
        event.preventDefault()
        axios.post("http://localhost:3001/pokemon", form)
        .then(res=> alert(res))
        .catch(err => alert(err))
    }

    return( 
        <>
            <NavBar/>

       <form onSubmit={submitHadler}>
        <div>
            <label>NAME</label>
            <input type="text" value={form.name} onChange={pokeChangehandler} name="name"></input>
            {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
            <label>TYPE</label>
            <input type="text" value={form.type} onChange={pokeChangehandler} name="type"></input>
            {errors.type && <span>{errors.type}</span>}
        </div>

        <div>
            <label>HP</label>
            <input type="number" value={form.hp} onChange={pokeChangehandler} name="hp"
            min={0} max={1500}></input>
            {errors.hp && <span>{errors.hp}</span>}
        </div>

        <div>
            <label>ATTACK</label>
            <input type="number" value={form.attack} onChange={pokeChangehandler} name="attack"
            min={0} max={100}></input>
            {errors.attack && <span>{errors.attack}</span>}
        </div>
        
        <div>
            <label>DEFENSE</label>
            <input type="number" value={form.defense} onChange={pokeChangehandler} name="defense"
            min={0} max={100}></input>
            {errors.defense && <span>{errors.defense}</span>}
        </div>

        <div>
            <label>SPEED</label>
            <input type="number" value={form.speed} onChange={pokeChangehandler} name="speed"
            min={0} max={100}></input>
            {errors.speed && <span>{errors.speed}</span>}
        </div>

        <div>
            <label>HEIGHT</label>
            <input type="number" value={form.height} onChange={pokeChangehandler} name="height"
            min={0} max={100}></input>
            {errors.height && <span>{errors.height}</span>}
        </div>

        <div>
            <label>WEIGHT</label>
            <input type="number" value={form.weight} onChange={pokeChangehandler} name="weight"
            min={0} max={100}></input>
            {errors.weight && <span>{errors.weight}</span>}
        </div>

        <div>
            <label>IMAGE</label>
            <input type="url" value={form.image} onChange={pokeChangehandler} name="image"></input>
            {errors.image && <span>{errors.image}</span>}
        </div>
            <button type="submit">CREATE</button>
       </form>
       </>
    )
}
export default Form;