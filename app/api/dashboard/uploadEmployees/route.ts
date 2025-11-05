import { NextResponse,NextRequest } from "next/server";
import { neon } from '@neondatabase/serverless';

export async function POST(req:NextRequest) {
    const body = await req.json()
    const experience: string = body?.formData?.experience
    const parsedExperience: number = Number(experience) 
    const sql = neon(process.env.POSTGRES_URL!);

    if(body?.currentPage == "Doctors")
    {
    console.log("i am in doctor post section...")    
    const isUserExists = await sql`SELECT * FROM doctors WHERE email =${body?.formData?.email}`;
    if(isUserExists.length>0){
     return NextResponse.json({message:"Doctor already exists or the email/phone is already taken",success:false},{status:409})
    }
    const response = await sql`
      INSERT INTO doctors (name, email, phone,department,image,experience)
      VALUES (${body?.formData.name}, ${body?.formData.email}, ${body?.formData?.ph_no},${body?.formData?.department},${body?.formData?.file},${parsedExperience})
      RETURNING *;`;
    return NextResponse.json({ success: true, message: "Doctor registered successfully",data:response[0]},{status:201});
    }

    else if(body?.currentPage == "Others")
    {
    console.log("i am in other post section...")    
    const isUserExists = await sql`SELECT * FROM others WHERE email =${body?.formData?.email}`;
    if(isUserExists.length>0){
     return NextResponse.json({message:"Other is already exists or the email/phone is already taken",success:false},{status:409})
    }
    const response = await sql`
      INSERT INTO others (name, email, phone,department,image,experience)
      VALUES (${body?.formData.name}, ${body?.formData.email}, ${body?.formData?.ph_no},${body?.formData?.department},${body?.formData?.file},${parsedExperience})
      RETURNING *;`;
    return NextResponse.json({ success: true, message: `${body?.formData?.department} registered successfully`,data:response[0]},{status:201});
    }

    else if(body?.currentPage == "Pharmacists")
    {
    console.log("i am in pharma post section...")    
    const isUserExists = await sql`SELECT * FROM pharmacists WHERE email =${body?.formData?.email}`;
    if(isUserExists.length>0){
     return NextResponse.json({message:"pharmacist is already exists or the email/phone is already taken",success:false},{status:409})
    }
    const response = await sql`
      INSERT INTO pharmacists (name, email, phone,image,experience)
      VALUES (${body?.formData.name}, ${body?.formData.email}, ${body?.formData?.ph_no},${body?.formData?.file},${parsedExperience})
      RETURNING *;`;
    return NextResponse.json({ success: true, message: `pharmacists registered successfully`,data:response[0]},{status:201});
    }


    else if(body?.currentPage == "Nurses")
    {
    console.log("i am in nurse post section...")    
    const isUserExists = await sql`SELECT * FROM nurses WHERE email =${body?.formData?.email}`;
    if(isUserExists.length>0){
     return NextResponse.json({message:"Nurse is already exists or the email/phone is already taken",success:false},{status:409})
    }
    const response = await sql`
      INSERT INTO nurses (name, email, phone,image,experience)
      VALUES (${body?.formData.name}, ${body?.formData.email}, ${body?.formData?.ph_no},${body?.formData?.file},${parsedExperience})
      RETURNING *;`;
    return NextResponse.json({ success: true, message: `Nurse registered successfully`,data:response[0]},{status:201});
    }

} 