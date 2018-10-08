package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/event")
public class EventController {

    @GetMapping("/propose-event")
    public ModelAndView viewProposeEvent(){
        return new ModelAndView("propose-event");
    }

    @GetMapping("/{id}")
    public ModelAndView viewEventDetail(@PathVariable("id") Integer id){
        ModelAndView modelAndView = new ModelAndView("event-detail");
        modelAndView.addObject("eventId", id);
        return modelAndView;
    }
}
