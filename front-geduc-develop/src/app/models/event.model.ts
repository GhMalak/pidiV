import { GetFiles } from "./getFiles.model";

export interface EventModel {
    eventNumber?: string;
    title: string;
    description: string;
    creatorRegistration: string;
    duration: string;
    techs: Array<string>;
    filesId: string;
    thumbnail?: GetFiles;
    status?: string;
}