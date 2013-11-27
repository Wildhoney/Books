<?php

class UsersController extends BaseController {

	public function addUser()
	{
        $firstName  = Input::get('firstName');
        $lastName   = Input::get('surname');
        $avatar     = Input::get('avatar');
        $token      = Input::get('token');

        $result = DB::insert('INSERT INTO users (first_name, last_name, avatar, token) values (?, ?, ?, ?)',
                  array($firstName, $lastName, $avatar, $token));
	}

}