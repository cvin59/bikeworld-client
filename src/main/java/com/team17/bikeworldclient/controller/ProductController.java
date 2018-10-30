package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/product")
public class ProductController {

    @GetMapping("/detail/{id}")
    public ModelAndView viewProductDetail(@PathVariable Integer id) {
        ModelAndView mav = new ModelAndView("tradepostdetail");
        mav.addObject("id", id);
        return new ModelAndView("tradepostdetail");
    }

    @GetMapping("/list")
    public ModelAndView viewProductList() {
        return new ModelAndView("productlist");
    }

}
