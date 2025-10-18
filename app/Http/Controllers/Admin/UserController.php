<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {

        return inertia('Admin/Users/Index');
    }

    public function store(Request $request) {}

    public function update(Request $request, User $user) {}

    public function destroy(User $user) {}
}
