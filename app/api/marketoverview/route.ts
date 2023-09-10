import { NextRequest, NextResponse } from "next/server";
import {getMarketOverview} from "@/utils";

export async function GET(request: NextRequest) {
    try{
        const response = await getMarketOverview();
        return NextResponse.json(
            {
              response: response
            },
            {
              status: 200,
            },
          );
    }catch(error){
        console.error("error occurred while trying to fetch market overview",error)
        return NextResponse.json(
            {
              message: "error occurred while trying to fetch market overview" ,
              error: error
            },
            {
              status: 500,
            },
          );
    }
  }

