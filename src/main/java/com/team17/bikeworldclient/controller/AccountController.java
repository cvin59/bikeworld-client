package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/user")
public class AccountController {

    @GetMapping("/profile")
    public ModelAndView viewUser() {
        return new ModelAndView("user");
    }

    @GetMapping("/account")
    public ModelAndView viewProfile() {
        return new ModelAndView("account");
    }

    @GetMapping("/product")
    public ModelAndView viewTradepost() {
        return new ModelAndView("user-tradepost");
    }

    @GetMapping("/product/new")
    public ModelAndView viewTradepostCreate() {
        return new ModelAndView("user-tradepost-create");
    }

    @GetMapping("/product/edit/{id}")
    public ModelAndView viewTradepostEdit(@PathVariable Integer id) {
        ModelAndView mav = new ModelAndView("user-tradepost-edit");
        mav.addObject("id", id);
        return mav;
    }

    @GetMapping("/product/detail/{id}")
    public ModelAndView viewTradepostDetail(@PathVariable Integer id) {
        ModelAndView mav = new ModelAndView("user-tradepost-detail");
        mav.addObject("id", id);
        return mav;
    }


    @GetMapping("/joined-events")
    public ModelAndView viewJoinedEvents() {
        return new ModelAndView("user-joinedevents");
    }

    @GetMapping("/proposed-events")
    public ModelAndView viewProposedEvents() {
        return new ModelAndView("user-proposedevents");
    }

    @GetMapping("/buy-list")
    public ModelAndView viewBuyList() {
        return new ModelAndView("user-buylist");
    }

    @GetMapping("/order-list")
    public ModelAndView viewOrderList() {
        return new ModelAndView("user-orderlist");
    }
}
