import { isString } from "class-validator"


export class SummarizerDTO {
    @isString()
    text: string;
}