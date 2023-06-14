package com.br.geduc.configuration;

import com.azure.storage.blob.BlobClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureBlobConfiguration {

    @Value("${spring.data.azure.connection-string}")
    private String connectionString;

    @Value("${spring.data.azure.container}")
    private String container;

    @Value("${spring.data.azure.token}")
    private String token;

    @Bean
    public BlobClientBuilder getClient() {
        var client = new BlobClientBuilder();
        client.endpoint(connectionString);
        client.containerName(container);
        client.sasToken(token);
        return client;
    }

}
