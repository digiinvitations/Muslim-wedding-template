import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Max request size in Next.js is usually 4MB by default for API routes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'uploaded_images'), {
      data: image,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ url: `/api/image/${docRef.id}` });
  } catch (error: any) {
    console.error('Upload API error:', error);
    // If it's a payload too large error from firestore, return 413
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
