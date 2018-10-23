package com.team17.bikeworldclient.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AbstractController {

    protected final Gson gson;

    public AbstractController() {
        this.gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    }
}
