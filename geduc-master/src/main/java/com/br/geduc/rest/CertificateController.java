package com.br.geduc.rest;

import com.br.geduc.dto.response.CertificateResponseDTO;
import com.br.geduc.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/certificate")
@Validated
@CrossOrigin(origins = "*")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @PostMapping(value = "/{eventNumber}/{registration}")
    @ResponseStatus(CREATED)
    public void generateCertificate(@PathVariable String eventNumber, @PathVariable String registration) {
        certificateService.generateCertificate(eventNumber, registration);
    }

    @GetMapping(value = "/{registration}")
    @ResponseStatus(OK)
    public List<CertificateResponseDTO> listCertificates(@PathVariable String registration) {
        return certificateService.listCertificates(registration);
    }
}
