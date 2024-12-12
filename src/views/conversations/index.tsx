import React, { useEffect, useState } from 'react';

export default function FUCK() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    

        useEffect(() => {
            
        try{
            
            
        }catch(e)
        {
        console.log(e)
        }
    
        
    }, []);

    

    return (
        <div className="App">
           <section id='chat'>

            <form id='form'>
            <input type='text' name='messager' id="input"   placeholder='Escribe un mensaje...' autoComplete='off'></input>
            <button onClick={()=>{  }}>send</button>
            </form>
           </section>
        </div>
    );
}
