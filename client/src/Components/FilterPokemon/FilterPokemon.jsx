import { useDispatch, useSelector} from "react-redux";
import React, { useState } from "react";
import {filterByType, filterByDB, filterByName} from "../Redux/actions"
import { useEffect } from "react";
import style from './filter.module.css'
const Filter = ({paginado}) => {

    const dispatch = useDispatch(); 
    const types = useSelector(state => state.types);
    const [type, setType] = useState("")
    const [id, setId] = useState("")
    const [orden, setorden]= useState("")
    const [orderName, setorderName]= useState("")

      const handleTypes = (event) => {
        const selectedType = event.target.value;
        setType(selectedType)
        paginado(1)
        dispatch(filterByType(selectedType))
      }

      const handleSortOrder = (event) => {
        const selectedOrder = event.target.value;
        setorden(selectedOrder);
        dispatch(filterByDB(selectedOrder));
         paginado(1)
      }
      const handleSort=(event)=>{
        const selectsort = event.target.value;
        setorderName(selectsort)
        dispatch(filterByName(selectsort))
        paginado(1)
      }
      useEffect(()=>{
        setorderName()
    },[setorderName])
    
    return (

    <div className={style.all_filtros}>
      <div className="filterElement">
          <select name="Orden" value={orden} onChange={handleSortOrder}>
            <option value="all">All</option>
            <option value="Created">Created</option>
          </select>
      </div>

      <div className={style.filtro_name}>
          <select name="orderName" value={orderName} onChange={handleSort} >
            <option value="A-Z">A to Z</option>
            <option value="Z-A">Z to A</option>
          </select>
      </div>

      <div className={style.filtro_id}>
          <select>
            <option value="Minor">Pokedex Orden</option>
            <option value="Mayor">Pokrdex Reverse</option>
          </select> 
      </div>
      
      <div className={style.filtro_tipos}>
        <select onChange={handleTypes} value={type}>

              <option value="all">All Types</option>
              {
               types && types.map((types, i) => {
                  return(<>
                   <option key={i} value={types.name}>{types.name}</option>
                  </>)
                })
              }
              </select>
      </div>
      </div>
    );
  }

export default Filter ;

