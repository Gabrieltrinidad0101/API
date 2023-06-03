import { TypeInstanceValidation } from "../../share/domain/Validator";
import { ISendMessage } from "../domian/messages";
import IWhatsAppController from "../../whatsAppControl/domian/whatsAppController"
export class MessagesApp {
    constructor(
        private readonly instanceValidation: TypeInstanceValidation,
        private readonly whatsAppController: IWhatsAppController
    ) { }
    sendMessage(sendMessage: ISendMessage) {
        const error = this.instanceValidation(sendMessage);
        if (error !== undefined) {
            return {
                statusCode: 422,
                error,
                message: 'Internal Error try later'
            }
        }
        this.whatsAppController.sendMessage(sendMessage);
    }
}