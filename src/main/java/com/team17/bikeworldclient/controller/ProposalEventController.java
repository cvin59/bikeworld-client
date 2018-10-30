package com.team17.bikeworldclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ProposalEventController {

    @GetMapping("/proposal-event/propose")
    public ModelAndView viewProposeEvent() {
        return new ModelAndView("propose-event");
    }

}
