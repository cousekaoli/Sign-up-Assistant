package com.hust.wxback.controller.admin.system;

import com.hust.wxback.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/admin/activity")
public class AdminActivityController {

    @RequestMapping(value = { "/", "/index" })
    public String index() {
        return "admin/activity/index";
    }

    @RequestMapping(value = { "/list" })
    @ResponseBody
    public Page<User> list(
            @RequestParam(value="searchText",required=false) String searchText
    ) {
        return null;
    }
}
