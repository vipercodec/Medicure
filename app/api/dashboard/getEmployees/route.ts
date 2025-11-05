import { NextResponse, NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  console.log("in dest!");

  const sql = neon(process.env.POSTGRES_URL!);
  const { searchParams } = new URL(req.url);
  const current = searchParams.get("currentPage");
  const table = current?.toLocaleLowerCase()

  if(table == 'doctors'){
  const employeeLists = await sql `SELECT * FROM doctors`;
  return NextResponse.json(
    {
      message: `List of doctors from server.`,
      success: true,
      data: employeeLists,
    },
    { status: 200 }
  );
  }
  else if(table == 'nurses'){
  const employeeLists = await sql `SELECT * FROM nurses`;
  return NextResponse.json(
    {
      message: `List of nurses from server.`,
      success: true,
      data: employeeLists,
    },
    { status: 200 }
  );
  }
  else if(table == 'pharmacists'){
  const employeeLists = await sql `SELECT * FROM pharmacists`;
  return NextResponse.json(
    {
      message: `List of pharmacists from server.`,
      success: true,
      data: employeeLists,
    },
    { status: 200 }
  );
  }
  else{
  const employeeLists = await sql `SELECT * FROM others`;
  return NextResponse.json(
    {
      message: `List of others from server.`,
      success: true,
      data: employeeLists,
    },
    { status: 200 }
  );
  }
}
