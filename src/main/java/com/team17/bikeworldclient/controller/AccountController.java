package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/user")
public class AccountController {

    @GetMapping("/account")
    public ModelAndView viewProfile() {
        return new ModelAndView("account");
    }
}