import { IsString, isString } from "class-validator"


export class SummarizerDTO {
    @IsString()
    text: string;
}