// pages/api/marketplace/createListing.js
import prisma from '@/app/Lib/prisma';//Asked chatgpt that "I want to make marketplace for my website, Can you help me to do that?"
import fs from 'fs'; //importing fs and path modules//
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') { //Check if the request method is POST"
    const { title, description, price, imageUrl, userId } = req.body; //Extracting the listing details"

    // Define the directory to save the images
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Defining the directory to save uploaded images"//
    //Using Formidable before and my data was not saving tp database so i asked chatgpt"Is there any other way in Next.js to upload files as formidable is not working"//
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.png`;
    const filePath = path.join(uploadDir, fileName);

    try {
      fs.writeFileSync(filePath, base64Data, 'base64');
      const imageFileUrl = `/uploads/${fileName}`; // Public path to the image

      // Save listing in the database
      const listing = await prisma.marketplaceListing.create({
        data: {
          title,
          description,
          price,
          imageUrl: imageFileUrl,
          seller: { connect: { id: userId } },
        },
      });
      res.status(201).json({ success: true, listing });
    } catch (error) {
      console.error('Error creating listing:', error);
      res.status(500).json({ success: false, message: 'Error creating listing' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
