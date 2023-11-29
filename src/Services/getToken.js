export const token = () =>{
    let token = ""
    if(localStorage.getItem('token')){
        token = JSON.parse(localStorage.getItem('token')).token
    }
    return token
} 