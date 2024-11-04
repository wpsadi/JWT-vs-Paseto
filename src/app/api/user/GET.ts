import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
export const GET = async (req:NextRequest)=>{

    try{

        

      

        return NextResponse.json({
            success:true,
            data:{
                email:"user",
                password:"*".repeat(6)
            },
            msg: "User Found"
        })
    }catch{
        return NextResponse.json({
            success:false,
            msg: "User Not Found"
        },{
            status:500
        })
    }

}