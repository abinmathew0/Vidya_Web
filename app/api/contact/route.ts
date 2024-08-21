import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/dbConnect';
import Contact from '../../../models/Contact';

// Handle GET requests - Fetch all contact messages
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const messages = await Contact.find().sort({ createdAt: -1 }); // Fetch messages sorted by most recent
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle POST requests - Save a new contact message
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, message } = await req.json();

    // Validate the received data
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Save the contact message
    const contact = new Contact({ name, email, message });
    await contact.save();

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
