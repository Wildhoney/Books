<?php

class IndexController extends BaseController {

	public function home()
	{
		return View::make('index');
	}

}