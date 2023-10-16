export const formValidate = () => {
    return {
          required: {
              value: true,
              message: "campo obligatorio"
          },
          patternEmail:{
              value:/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
              message: "Formato de e-mail no valido"
          },
          patternUrl:{
              value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
              message: "Fomato Url no válido"
          },
          minLength:{ 
              value:6, 
              message: "minimo 6 caracteres"},
          validateTrim: {trim: v => v.trim() !== "" || "no ingrese espacios"},
          validateEqualsPassword(getValues){
              return v => v === getValues("password") || "no coincide la password"
          },
      }
  }