package com.hust.wxback.controller.admin;

import com.hust.wxback.controller.BaseController;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController extends BaseController {



	@RequestMapping(value = { "/admin/login" }, method = RequestMethod.GET)
	public String login() {
		return "admin/login";
	}


	@RequestMapping(value = { "/admin/login" }, method = RequestMethod.POST)
	public String login(@RequestParam("username") String username,
			@RequestParam("password") String password,ModelMap model
			) {
			return redirect("/admin/index");
	}
	
	@RequestMapping(value = { "/admin/logout" }, method = RequestMethod.GET)
	public String logout() {

		return redirect("admin/login");
	}
	
}
