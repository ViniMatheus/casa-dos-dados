import {NextRequest, NextResponse} from "next/server";
export async function GET (request: NextRequest, { params }: { params: { slug: string } }){
    const res = await fetch(`https://minhareceita.org/${params.slug}`, {
        next: { revalidate: 60 },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      return NextResponse.json(data)
    }
    
