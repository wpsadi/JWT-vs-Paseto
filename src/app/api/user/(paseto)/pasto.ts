import paseto from 'paseto';
import crypto from "crypto"
const { V4 } = paseto 

export const signUser = async(email:string,password:string)=>{
    const token = await V4.sign({
        email,
        password
    },await V4.bytesToKeyObject(Buffer.from('Hello, World!')),{
        expiresIn: "1d",
        issuer: "me",

    })
    return token
}