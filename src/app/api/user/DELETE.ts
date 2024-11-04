import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
export const DELETE = async (req:NextRequest)=>{

    try{
        

      

        return NextResponse.json({
            success:true,
            msg: "User Deleted In"
        })
    }catch{
        return NextResponse.json({
            success:false,
            msg: "Unable to DELETE User"
        },{
            status:500
        })
    }

}