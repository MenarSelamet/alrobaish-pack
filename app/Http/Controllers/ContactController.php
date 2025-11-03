<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {

        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'max:255',
            'email' => 'max:255',
            'subject' => 'max:255',
            'message' => 'string',
        ]);

        Contact::create($data);

        Mail::send('emails.contact', [
            'name' => $data['name'],
            'email' => $data['email'],
            'body' => $data['message'], // 👈 renamed
        ], function ($message) use ($data) {
            $message->to('admin@alrobaish-pack.com')
                ->subject('New Contact Message from ' . $data['name']);
        });

        return redirect()->back()->with('success', 'Your message has been sent successfully!');
    }

}