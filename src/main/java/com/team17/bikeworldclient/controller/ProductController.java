package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/product")
public class ProductController {

    @GetMapping("/detail")
    public ModelAndView viewEventDetail(){
        return new ModelAndView("tradepostdetail");
    }


>>>>>>> master
}
