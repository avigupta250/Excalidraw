import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

const wss =new WebSocketServer({port:8000})

wss.on("connection",function connection(ws,request){
    const url=request.url; //ws://localhost:3000?token=123
    if(!url){
        return ;
    }

    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token =queryParams.get("token")|| "";
    const decode =jwt.verify(token,JWT_SECRET);
   if(!decode || !(decode as JwtPayload).userId){
    ws.close();
    return 
   }

    ws.on('message',function message(data){
        ws.send('pong')
    })
})