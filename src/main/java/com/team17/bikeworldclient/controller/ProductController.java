package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/product")
public class ProductController {

    @GetMapping
    public ModelAndView trading() {
        return new ModelAndView("trading");
    }

    @GetMapping("/detail/{id}")
    public ModelAndView viewProductDetail(@PathVariable Integer id) {
        ModelAndView mav = new ModelAndView("tradepostdetail");
        mav.addObject("id", id);
        return new ModelAndView("tradepostdetail");
    }


    @GetMapping("/category/{id}")
    public ModelAndView viewProductCategory(@PathVariable Integer id) {
        ModelAndView mav = new ModelAndView("");
        mav.addObject("id", id);
        return new ModelAndView("");
    }

    @GetMapping("/search")
    public ModelAndView searchEvent(@RequestParam("searchValue") String searchValue){
        ModelAndView mav = new ModelAndView("trading-search");
        mav.addObject("searchValue", searchValue);
        return mav;
    }

    @GetMapping("/list")
    public ModelAndView viewProductList() {
        return new ModelAndView("product-home");
    }

}
