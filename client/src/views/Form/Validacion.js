const validacion = (form, errors, setErrors) => {
    let newErrors = {};
  
                                ////! Validaciones numéricas\\\\
    if (isNaN(form.hp)) {
      newErrors = {...newErrors, hp: "ingresar datos numericos"};
    } else if (form.hp === "") {
      newErrors = {...newErrors, hp: "*"};
    } else if (form.hp > 1500) {
      newErrors = {...newErrors, hp: "cantidad no permitida"};
    }
  
    if (isNaN(form.attack)) {
      newErrors = {...newErrors, attack: "ingresar datos numericos"};
    } else if (form.attack === "") {
      newErrors = {...newErrors, attack: "*"};
    } else if (form.attack > 100) {
      newErrors = {...newErrors, attack: "cantidad no permitida"};
    }

    if (isNaN(form.defense)) {
        newErrors = {...newErrors, defense: "ingresar datos numericos"};
      } else if (form.defense === "") {
        newErrors = {...newErrors, defense: "*"};
      } else if (form.defense > 100) {
        newErrors = {...newErrors, defense: "cantidad no permitida"};
      }
  
    if (isNaN(form.speed)) {
      newErrors = {...newErrors, speed: "ingresar datos numericos"};
    } else if (form.speed === "") {
      newErrors = {...newErrors, speed: "*"};
    } else if (form.speed > 1500) {
      newErrors = {...newErrors, speed: "cantidad no permitida"};
    }
  
    if (isNaN(form.height)) {
      newErrors = {...newErrors, height: "ingresar datos numericos"};
    } else if (form.height === "") {
      newErrors = {...newErrors, height: "*"};
    } else if (form.height > 100) {
      newErrors = {...newErrors, height: "cantidad no permitida"};
    }
  
    if (isNaN(form.weight)) {
      newErrors = {...newErrors, weight: "ingresar datos numericos"};
    } else if (form.weight === "") {
      newErrors = {...newErrors, weight: "*"};
    } else if (form.weight > 100) {
      newErrors = {...newErrors, weight: "cantidad no permitida"};
    }
  
                                ////!Validaciones de strings\\\\

    const soloLetras = /^[A-Za-z]+$/;
    const soloUrl= /^(ftp|http|https):\/\/[^ "]+$/;
  
    if(form.name === ""){
        setErrors({...errors, name: "*"});
    }else if (!soloLetras.test(form.name)) {
      newErrors = {...newErrors, name: "solo letras"};
    }

    if(form.type === ""){
        setErrors({...errors, type: "*"}); 
    }else if (!soloLetras.test(form.type)) {
      newErrors = {...newErrors, type: "solo letras"};
    }

    if(form.image === ""){
        setErrors({...errors, image: "*"});
    }else if (!soloUrl.test(form.image)) {
        newErrors = {...newErrors, image: "solo url"};
      }
  
    
    setErrors(newErrors);
  }
  
  export default validacion;
