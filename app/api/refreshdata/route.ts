import { NextRequest, NextResponse } from "next/server";
import {refershDatabase} from "@/utils";

export async function POST(request: NextRequest) {
    try{
        await refershDatabase();
        return NextResponse.json(
            {
              response: "successfully saved"
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

