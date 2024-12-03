
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import webSocket from 'socket.io-client'
import "bootstrap/dist/css/bootstrap.css";


const Socket = ({ msg, setMsg }) => {
    const [ws, setWs] = useState(null)
    const [listValue, setListValue] = useState('');
    const [serverState, setServerState] = useState('disconnect server');


    const [IP, setIP] = useState('http://huang.us-east-1.elasticbeanstalk.com:8080');


    let target_value = 0;


    const connectWebSocket = () => {
        //開啟
        setWs(webSocket(IP))
    }


    useEffect(() => {
        if (ws) {
            //連線成功在 console 中打印訊息
            console.log('success connect!')
            //設定監聽
            ws.on('getMessage', message => {
                setMsg(message);
                console.log(message);

            })

            ws.on('start', (msg) => {
                setServerState('connect server');
            })
        }
    }, [ws])



    const sendMessage = () => {
        //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
        const timestamp = (new Date).getTime();

        target_value = Math.floor(Math.random() * 100);
        ws.emit('chat', target_value);
        let display = document.querySelector(".socketValue");

        display.innerHTML = target_value;
    }


    return (
        <div className='text-center ' >
            <input className='mt-5 btn btn-outline-light' type='button' value='connect server' onClick={connectWebSocket} />

            {/* <h3 className="text-light mt-3" >{serverState}</h3> */}

            <div className="row mt-5">
                <div className="socketValue text-center text-light">{target_value}</div>
            </div>

            <input className='mt-2 btn btn-outline-light' type='button' value='send' onClick={sendMessage} />


        </div>
    )
}



export default Socket;
