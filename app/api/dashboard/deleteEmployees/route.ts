import { NextResponse, NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function DELETE(req: NextRequest) {
    const sql = neon(process.env.POSTGRES_URL!);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const currentPage = searchParams.get("currentPage"); // optional
    const table  = currentPage?.toLocaleLowerCase()
    console.log("table is",table,"id is",id)
    if(table == 'doctors'){
    const employeeLists = await sql `DELETE FROM doctors WHERE id = ${id}`;
    console.log(employeeLists)
    return NextResponse.json(
        {
        message: `Deleted doctor successfully.`,
        success: true,
        data: employeeLists,
        },
        { status: 200 }
    );
    }
    else if(table == 'nurses'){
    const employeeLists = await sql `DELETE FROM nurses WHERE id = ${id}`;
    console.log(employeeLists)
    return NextResponse.json(
        {
        message: `Deleted Nurses successfully.`,
        success: true,
        data: employeeLists,
        },
        { status: 200 }
    );
    }
    else if(table == 'pharmacists'){
    const employeeLists = await sql `DELETE FROM pharmacists WHERE id = ${id}`;
    console.log(employeeLists)
    return NextResponse.json(
        {
        message: `Deleted pharmacists successfully.`,
        success: true,
        data: employeeLists,
        },
        { status: 200 }
    );
    }
    else{
    const employeeLists = await sql `DELETE FROM others WHERE id = ${id}`;
    console.log(employeeLists)
    return NextResponse.json(
        {
        message: `Deleted others successfully.`,
        success: true,
        data: employeeLists,
        },
        { status: 200 }
    );
    }

return NextResponse.json(
        {
        message: `failed in deleting.`,
        success: false,
        },
        { status: 400 }
    );
}
