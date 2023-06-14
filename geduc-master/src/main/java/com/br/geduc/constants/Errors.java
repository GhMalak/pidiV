package com.br.geduc.constants;

import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@NoArgsConstructor(access = PRIVATE)
public class Errors {

    public static final String USER_ALREADY_EXIST = "Usuário já existe.";
    public static final String USER_NOT_EXIST = "Usuário não existe.";
    public static final String EVENT_CANCELLED = "Não é possível se inscrever neste evento, pois ele está cancelado.";
    public static final String EVENT_OWNER_CANT_GENERATE_CERTIFICATE = "Você não pode ter um certificado do seu próprio evento.";
    public static final String INVALID_PASSWORD = "Senha incorreta.";
    public static final String EMAIL_ALREADY_USE = "Email já em uso.";
    public static final String REGISTRATION_IS_REQUIRED = "Matrícula é obrigatório.";
    public static final String NAME_IS_REQUIRED = "Nome é obrigatório.";
    public static final String EMAIL_IS_REQUIRED = "Email é obrigatório.";
    public static final String PASSWORD_IS_REQUIRED = "Senha é obrigatório.";
    public static final String TITLE_IS_REQUIRED = "Título é obrigatório.";
    public static final String DESCRIPTION_IS_REQUIRED = "Descrição é obrigatório.";
    public static final String DURATION_IS_REQUIRED = "Duração do evento é obrigatório.";
    public static final String EVENT_NUMER_IS_NON_REQUIRED = "Número de evento deve ser null.";
    public static final String EVENT_NUMER_IS_REQUIRED = "Número do evento é obrigatório.";
    public static final String EVENT_STATUS_IS_NON_REQUIRED = "Status do evento deve ser null.";
    public static final String FILE_LIST_IS_EMPTY = "Lista de arquivos vazia.";
    public static final String FILE_ID_IS_REQUIRED = "Id de arquivos é obrigatório.";
    public static final String FILE_ID_NOT_EXISTS = "Id de arquivos não encontrado.";
    public static final String UPLOAD_NOT_FINISHED = "Upload de arquivos não finalizado.";
    public static final String TAGS_IS_REQUIRED = "Lista de habilidades é obrigatória.";
    public static final String EVENT_NOT_EXISTS = "Evento não encontrado.";
    public static final String AZURE_ERROR = "Quando tentava salvar o arquivo %s obtive o seguinte erro: %s";
    public static final String USER_ALREADY_SUBSCRIBE = "Usuário já inscrito neste evento.";
    public static final String CERTIFICATE_ALREADY_DONE = "Usuário já possui o certificado deste evento.";
}
