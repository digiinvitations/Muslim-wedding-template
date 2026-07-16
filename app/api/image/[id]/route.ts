import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const docRef = doc(db, 'uploaded_images', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const data = docSnap.data();
    let base64Data = data.data;

    if (data.chunks) {
      // Assemble chunks
      let assembledData = "";
      for (let i = 0; i < data.chunks; i++) {
        const chunkSnap = await getDoc(doc(db, `uploaded_images/${id}/chunks`, `chunk_${i}`));
        if (chunkSnap.exists()) {
          assembledData += chunkSnap.data().data;
        }
      }
      base64Data = assembledData;
    }

    if (!base64Data) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Extract mime type and base64 string
    // Format is typically "data:image/webp;base64,UklGR..."
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    
    if (!matches || matches.length !== 3) {
      // If it doesn't match the format, return as is (might be a normal URL)
      return NextResponse.redirect(base64Data);
    }

    const mimeType = matches[1];
    const imageBuffer = Buffer.from(matches[2], 'base64');

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Image Fetch API error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
