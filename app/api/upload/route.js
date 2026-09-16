import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, error: 'No image file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert file to Base64 Data URL for serverless compatibility (Netlify/Vercel)
    const mimeType = file.type || 'image/jpeg';
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    // Optionally try saving to public/uploads on writable local dev environments
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const ext = path.extname(file.name) || '.jpg';
      const filename = `profile-${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);
    } catch (diskErr) {
      // Ignore read-only file system errors on Netlify/Vercel
      console.log('Serverless environment: Using Base64 Data URL for image upload.');
    }

    return NextResponse.json({
      success: true,
      url: dataUrl,
      message: 'Image uploaded successfully!',
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
