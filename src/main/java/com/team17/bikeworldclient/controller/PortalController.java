package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/portal")
public class PortalController extends AbstractController{
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

    @GetMapping("/event/{id}")
    public ModelAndView viewCreateEventById(@PathVariable("id") Integer id){
        ModelAndView mav = new ModelAndView("portal-create-event");
        mav.addObject("id", id);
        return mav;
    }

    @GetMapping
    public ModelAndView openProposal(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("portal-index");
        return modelAndView;
    }

    @GetMapping("/login")
    public ModelAndView openLogin(){
        return new ModelAndView("login");
    }

    @GetMapping("/crawl")
    public ModelAndView openCrawl(){
        return new ModelAndView("portal-crawl");
    }

}
