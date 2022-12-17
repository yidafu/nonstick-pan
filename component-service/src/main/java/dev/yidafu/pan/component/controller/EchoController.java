package dev.yidafu.pan.component.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EchoController {
    @GetMapping(value = "/echo")
    public String echo () {
        return "Hello, Pan";
    }
}
