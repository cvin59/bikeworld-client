package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ProposalEventController {

    @GetMapping("/event/propose-event")
    public ModelAndView viewProposeEvent() {
        return new ModelAndView("propose-event");
    }

}
