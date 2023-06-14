import { Files } from "./files.model";

export interface GetFiles {
    filesId: string;
    createdDate: string;
    finalUploadDate: string;
    files: Files[];
}