<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Role;
use Illuminate\Support\Facades\Auth;
use Validator;

use App\Http\Requests\UserStoreRequest;

class UserController extends Controller
{
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $username = $request->username; //the input field has name='username' in form

        if(filter_var($username, FILTER_VALIDATE_EMAIL)) {
            //user sent their email
            Auth::attempt(['email' => $username, 'password' => $request->password]);
        } else {
            //they sent their username instead
            Auth::attempt(['username' => $username, 'password' => $request->password]);
        }

        //was any of those correct ?
        if (Auth::check()) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyEshop')-> accessToken;
            $success['user'] = Auth::user();
            return response()->json(['success' => $success], 200);
        } else {
            return response()->json(['error'=>'Wrong username/password combination.'], 401);
        }
    }
/**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(UserStoreRequest $request)
    {

        $validated = $request->validated();

        $role_id = Role::where('name', 'user')->first()->id;

        $user = new User;
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->role_id = $role_id;
        $user->save();


        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['name'] =  $user->name;
        return response()->json(['success'=>$success], 200);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        $role = User::find(Auth::user()->id);
        $user['role'] = Role::find($role->role_id)->name;
        return response()->json(['success' => $user], 200);
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json('Logged out successfully', 200);
    }

}
