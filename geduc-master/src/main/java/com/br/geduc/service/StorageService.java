package com.br.geduc.service;

import com.azure.storage.blob.BlobClientBuilder;
import com.br.geduc.document.FileDocument;
import com.br.geduc.document.StorageFileDocument;
import com.br.geduc.dto.response.FileResponseDTO;
import com.br.geduc.dto.response.StorageResponseDTO;
import com.br.geduc.exceptions.BusinessException;
import com.br.geduc.mapper.FileMapper;
import com.br.geduc.repository.EventRepository;
import com.br.geduc.repository.StorageRepository;
import com.br.geduc.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.br.geduc.constants.Errors.*;
import static java.lang.String.format;

@Service
@AllArgsConstructor
@Slf4j
public class StorageService {

    private StorageRepository storageRepository;

    private EventRepository eventRepository;

    private UserRepository userRepository;

    private BlobClientBuilder blobClient;

    public StorageResponseDTO uploadFiles(List<MultipartFile> files) {
        if (files.isEmpty())
            throw new BusinessException(FILE_LIST_IS_EMPTY);

        var document = storageRepository.save(StorageFileDocument.builder().build());
        files.forEach(file -> {
            asyncUploadFiles(file, document);
        });
        return StorageResponseDTO.builder()
                .filesId(document.getId())
                .build();
    }

    public void uploadThumb(String eventNumber, MultipartFile thumbnail) {
        var document = storageRepository.save(StorageFileDocument.builder().build());
        var eventDocument = this.eventRepository.findById(eventNumber);

        eventDocument.ifPresent(value -> {
            if (Objects.nonNull(value.getThumbId())) {
                storageRepository.findById(value.getThumbId()).ifPresent(storage -> {
                    storage.getFiles().forEach(file -> {
                        deleteFileOnAzure(file.getAzureId());
                    });
                    storageRepository.delete(storage);
                });
            }
        });

        asyncUploadFiles(thumbnail, document);
        eventDocument.ifPresent(value -> value.setThumbId(document.getId()));
        eventDocument.ifPresent(value ->  this.eventRepository.save(value));
    }

    public void uploadAvatar(String registration, MultipartFile avatar) {
        var document = storageRepository.save(StorageFileDocument.builder().build());
        var userDocument = this.userRepository.findByRegistration(registration);

        userDocument.ifPresent(value -> {
            if (Objects.nonNull(value.getAvatarId())) {
                storageRepository.findById(value.getAvatarId()).ifPresent(storage -> {
                    storage.getFiles().forEach(file -> {
                        deleteFileOnAzure(file.getAzureId());
                    });
                    storageRepository.delete(storage);
                });
            }
        });

        asyncUploadFiles(avatar, document);
        userDocument.ifPresent(value -> value.setAvatarId(document.getId()));
        userDocument.ifPresent(value ->  this.userRepository.save(value));
    }

    public StorageResponseDTO updateFiles(String filesId, List<MultipartFile> files) {
        if (files.isEmpty())
            throw new BusinessException(FILE_LIST_IS_EMPTY);

        var document = findEventFiles(filesId);
        files.forEach(file -> {
            asyncUploadFiles(file, document);
        });
        return StorageResponseDTO.builder()
                .filesId(document.getId())
                .build();
    }

    public void deleteFiles(String filesId, String azureId) {
        var document = findEventFiles(filesId);

        if (Objects.isNull(document.getFinalUploadDate()))
            throw new BusinessException(UPLOAD_NOT_FINISHED);

        asyncDeleteFiles(document, azureId);
    }

    @Async
    private void asyncDeleteFiles(StorageFileDocument document, String azureId) {
        if (Objects.isNull(azureId)) {
            document.getFiles().forEach(file -> {
                deleteFileOnAzure(file.getAzureId());
            });

            document.setFiles(List.of());
        } else {
            deleteFileOnAzure(azureId);
            var newList = document.getFiles().stream().filter(item -> !item.getAzureId().equals(azureId))
                            .collect(Collectors.toList());

            document.setFiles(newList);
        }

        storageRepository.save(document);
    }

    @Async
    private void asyncUploadFiles(MultipartFile file, StorageFileDocument document) {
        FileDocument fileDocument = saveFileOnAzure(file);
        document.getFiles().add(fileDocument);

        document.setFinalUploadDate(LocalDateTime.now());
        storageRepository.save(document);
    }

    public StorageResponseDTO getFile(String filesId) {
        var document = findEventFiles(filesId);

        if (Objects.isNull(document.getFinalUploadDate()))
            throw new BusinessException(UPLOAD_NOT_FINISHED);

        return StorageResponseDTO.builder()
                .filesId(document.getId())
                .createdDate(document.getCreatedDate())
                .finalUploadDate(document.getFinalUploadDate())
                .files(getFileResponses(document))
                .build();
    }

    private List<FileResponseDTO> getFileResponses(StorageFileDocument storage) {
        var files = storage.getFiles().stream()
                .map(FileMapper::toResponse)
                .collect(Collectors.toList());

        files.forEach(r -> r.setBytes(getBytes(r.getId())));
        return files;
    }

    private byte[] getBytes(String file) {
        return blobClient.blobName(file).buildClient().downloadContent().toBytes();
    }

    private FileDocument saveFileOnAzure(MultipartFile file) {
        try {
            var fileDocument = FileDocument.builder()
                    .azureId(UUID.randomUUID().toString())
                    .originalName(file.getOriginalFilename())
                    .contentType(file.getContentType())
                    .build();


            blobClient.blobName(fileDocument.getAzureId())
                    .buildClient()
                    .upload(file.getInputStream(), file.getSize());
            return fileDocument;
        } catch (IOException e) {
            log.error(format(AZURE_ERROR, file.getOriginalFilename(), e.getMessage()));
        }
        return null;
    }

    private void deleteFileOnAzure(String azureId) {
        blobClient.blobName(azureId)
                .buildClient()
                .deleteIfExists();
    }

    public StorageFileDocument findEventFiles(String filesId) {
        var document = storageRepository.findById(filesId);

        if (document.isEmpty())
            throw new BusinessException(FILE_ID_NOT_EXISTS);

        return document.get();
    }


}
