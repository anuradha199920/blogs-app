import { NextRequest, NextResponse } from "next/server";
import {refershDatabase} from "@/utils";

export async function GET(request: NextRequest) {
    try{
        console.log("Refreshing data.");
        const response = await refershDatabase();
        return NextResponse.json(
            {
              message: "successfully saved nft data in database." ,
              response: response
            },
            {
              status: 200,
            },
          );
    }catch(error){
        console.error("error occurred while trying to save nft data in database",error)
        return NextResponse.json(
            {
              message: "error occurred while trying to save nft data in database." ,
              error: error
            },
            {
              status: 500,
            },
          );
    }
  }