import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/socket.io.hook.ts';

export default function FUCK() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const socketService = useSocket()
    
    const joinRoom = (requestId) => {
        if (requestId) {
            
            try{
                socketService.socket?.emit("requestId", requestId);
            }catch(e)
            {
            console.log(e)
            }
        }
    };

    useEffect(() => {
        socketService.socket?.on('connect', () => {
            console.log('Conectado al servidor');
        });

        return () => {
            socketService.socket?.off('connect');
        };
    }, []);

    return (
        <div className="App">
            <input 
                type="text" 
                placeholder="Nombre de usuario" 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Sala" 
                onChange={(e) => setRoom(e.target.value)} 
            />
            <button onClick={()=>{joinRoom(1)}}>Unirse a la sala</button>
        </div>
    );
}
