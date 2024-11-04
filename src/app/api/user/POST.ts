import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { signUser } from "./(paseto)/pasto";
export const POST = async (req:NextRequest)=>{

    try{
        const {email,password} = await req.json();
        if(!email || !password){
            return NextResponse.json({
                success:false,
                msg: "Please Provide Email and Password"
            },{
                status:400
            })
        }

        // create a token

        // const cookieStore = await cookies();
        // const token = await signUser(email,password);
        // console.log(token)
        // cookieStore.set("auth",token,{
        //     maxAge: 60*60*24*7 // 1 week
        // })


        return NextResponse.json({
            success:true,
            msg: "User Created/Logged In"
        })
    }catch(e){
        if (e instanceof Error) {
            console.log(e.message);
          
        }
        return NextResponse.json({
            success:false,
            msg: "Unable to Create/Login User"
        },{
            status:500
        })
    }

}