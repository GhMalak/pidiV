import { GetFiles } from "./getFiles.model";
import { Tech } from "./tech.model";

export interface User {
    registration: string;
    name?: string;
    email?: string;
    password?: string;
    techs?: Array<Tech[]>
    avatar?: GetFiles;
}