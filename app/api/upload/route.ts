import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // A Firestore document is limited to 1MB. We'll chunk the string to 800KB pieces.
    const chunkSize = 800 * 1024;
    const numChunks = Math.ceil(image.length / chunkSize);

    // Create the main document
    const docRef = await addDoc(collection(db, 'uploaded_images'), {
      chunks: numChunks,
      timestamp: new Date().toISOString()
    });

    // Upload chunks
    for (let i = 0; i < numChunks; i++) {
      const chunkData = image.substring(i * chunkSize, (i + 1) * chunkSize);
      await setDoc(doc(db, `uploaded_images/${docRef.id}/chunks`, `chunk_${i}`), {
        data: chunkData,
        index: i
      });
    }

    return NextResponse.json({ url: `/api/image/${docRef.id}` });
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
