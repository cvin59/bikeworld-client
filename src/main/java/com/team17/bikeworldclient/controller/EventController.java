package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/event")
public class EventController {

    @GetMapping
    public ModelAndView viewEventHome(){
        return new ModelAndView("event");
    }

    @GetMapping("/detail/{title}/{id}")
    public ModelAndView viewEventDetail(@PathVariable String title,
                                        @PathVariable Integer id){
        ModelAndView mav = new ModelAndView("eventdetail");
        mav.addObject("title", title);
        mav.addObject("id", id);
        return mav;
    }

    @GetMapping("/{id}/register-event")
    public ModelAndView viewRegisterEvent(@PathVariable Integer id){
        ModelAndView mav = new ModelAndView("register-event");
        mav.addObject("id", id);
        return mav;
    }

    @GetMapping("/all")
    public ModelAndView viewAllEvent(){
        ModelAndView mav = new ModelAndView("event-show");
        return mav;
    }


    @GetMapping("/search")
    public ModelAndView searchEvent(@RequestParam("q") String q){
        ModelAndView mav = new ModelAndView("event-search");
        mav.addObject("keyword", q);
        return mav;
    }
}
