import React, { useEffect, useState } from 'react';
import useSocket from '../../hooks/socket.io.hook.ts';

export default function FUCK() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const socketService = useSocket()

        useEffect(() => {
        socketService.socket?.on('connect', () => {
            console.log('Conectado al servidor');
        });
        
        try{
            socketService.socket!.emit("joinRoom", {requestId:"67576f90e368ffb23838e057"});
            
            console.log(socketService.messages)
        }catch(e)
        {
        console.log(e)
        }
    
        
        return () => {
            socketService.socket?.off('connect');
        };
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
