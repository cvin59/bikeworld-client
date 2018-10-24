package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/event")
public class EventController {

    @GetMapping
    public ModelAndView viewEventHome(){
        return new ModelAndView("event");
    }

    @GetMapping("/detail")
    public ModelAndView viewEventDetail(){
        return new ModelAndView("eventdetail");
    }
}
