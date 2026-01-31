import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Asrnova Website <info@asrnova.com>',
            to: 'info@asrnova.com',
            subject: `New Lead ${name}`,
            replyTo: email,
            text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
        });

        if (error) {
            return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Email sent successfully', data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
