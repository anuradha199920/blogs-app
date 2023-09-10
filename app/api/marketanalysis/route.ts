import { NextRequest, NextResponse } from "next/server";
import {getMarketAnalysis} from "@/utils";

export async function GET(request: NextRequest) {
    try{
        const response = await getMarketAnalysis();
        return NextResponse.json(
          {
            response: response
          },
          {
            status: 200,
          },
        );
  }catch(error){
      console.error("error occurred while trying to fetch market analysis",error);
      return NextResponse.json(
          {
            message: "error occurred while trying to fetch market analysis" ,
            error: error
          },
          {
            status: 500,
          },
        );
    }
  }

