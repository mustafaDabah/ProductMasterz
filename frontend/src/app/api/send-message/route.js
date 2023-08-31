const Airtable = require('airtable');
const nodemailer = require('nodemailer');
import { NextResponse } from 'next/server'

async function getEmails() {
  const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_API_KEY }).base(process.env.NEXT_PUBLIC_BASE_ID)
  const receivers = await base('ContactUsReceivers').select({ fields: ['userEmail'] }).all();
  const emails = receivers.map(receiver => receiver.get('userEmail'));
  
  return emails;

}


export async function POST(req) {
  const { name, email, message, subject } = await req.json();
  const emails = await getEmails()
  console.log(emails)

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user:process.env.MESSAGE_EMAIL ,
        pass: process.env.MESSAGE_PASSWORD
    }
  });
  
  for (const emailReceiver of emails) {
     await transporter.sendMail({
      from: `${name} <${email}>`,
      to: `${emailReceiver}`,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    console.log(`Email sent to ${emailReceiver} from ${email}`)
  }

 return NextResponse.json({ message: "message send successful" });
}
