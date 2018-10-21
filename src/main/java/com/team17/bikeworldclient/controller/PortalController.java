package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Controller
@RequestMapping("/portal")
public class PortalController {

    @GetMapping("/event")
    public ModelAndView openEvent(){
        return new ModelAndView("portal-event");
    }

    @GetMapping("/proposal-event")
    public ModelAndView openProposalEvent(){
        return new ModelAndView("portal-proposal-event");
    }

    @GetMapping(value = {"/event/create-event"})
    public ModelAndView viewCreateEvent(){
        return new ModelAndView("portal-create-event");
    }

    @GetMapping
    public ModelAndView openProposal(){
        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.addObject("userName", "Welcome " + user.getUsername());
        modelAndView.setViewName("portal-index");
        return modelAndView;
    }

    @GetMapping("/login")
    public ModelAndView openLogin(){
        return new ModelAndView("login");
    }
}
