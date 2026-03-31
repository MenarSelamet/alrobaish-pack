<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {

        return inertia('Admin/Users/Index', [
            'users' => User::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => 'required|string|min:8',
        ]);

        User::create($validated);

        return redirect(route('users.index'));
    }

    public function update(): void {}

    public function destroy(User $user)
    {

        $user->delete();

        return redirect(route('users.index'));
    }
}
