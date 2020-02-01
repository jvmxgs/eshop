<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EshopController extends Controller
{
    public function index()
    {
        return view('eshop');
    }
}
