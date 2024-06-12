import { connectMongoDb } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextResponse,NextRequest } from "next/server";

export async function POST(request:NextRequest){
    try{
        const body = await request.json();
        const {imgSrc,fileKey,name,category,price} = body;
        await connectMongoDb()
        const data = await Product.create({
            imgSrc,fileKey,name,category,price

        })

        return NextResponse.json({msg:"Product added successfully",data})
    } catch (error){
        return NextResponse.json({
            error,
            msg:"Something went wrong"
        },{status:400})
    }
}