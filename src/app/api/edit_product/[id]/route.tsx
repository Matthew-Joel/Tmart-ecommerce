import { connectMongoDb } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, URLParams: any) {
  try {
    const body = await request.json();
    const { name, category, price } = body;
    const id = URLParams.params.id
    await connectMongoDb();
    console.log(id,name,category,price)

    const data = await Product.findByIdAndUpdate( {
      name, category, price
    });

    return NextResponse.json({msg: "Product Updated Successfully",data});
  } catch (error) {
    return NextResponse.json(
      {
        error,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
