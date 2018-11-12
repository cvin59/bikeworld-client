package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/component")
public class ComponentController {

    @GetMapping("/detail/{id}")
    public ModelAndView viewProductDetail(@PathVariable Integer id) {
        ModelAndView mav = new ModelAndView("componentdetail");
        mav.addObject("id", id);
        return new ModelAndView("componentdetail");
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
        return new ModelAndView("component");
    }

}
