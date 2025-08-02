import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/instance';

var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;

@Injectable()
export class RequestService {
    async findUrlFromCode(fileCode: string) {
        const getUrl = await prisma.uRL.findUnique({ where: { generatedToken: fileCode } });

        if (!getUrl) {
            const message: string = 'Unable to find URL.';
            const state: boolean = false;
            return { message, state };
        }

        const message: string = getUrl.forwardUrl;
        const state: boolean = true;
        return { message, state };
    }

    async generateCode(length?: number) {
        if (!length) length = 10;
        let result: string = '';

        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * length));
        }

        return result;
    }

    async addUrlForwarding(url: string) {
        const checkIfExists = await prisma.uRL.findFirst({ where: { forwardUrl: url } });
        if (checkIfExists)
            return `This URL already is being forwarded. URL: http://localhost:3000/${checkIfExists.generatedToken}`;
        const code: string = await this.generateCode(5);
        await prisma.uRL.create({
            data: {
                forwardUrl: url,
                generatedToken: code,
            },
        });
        return `Succcessfully generated your URL shortner! URL: http://localhost:3000/${code} (USING LOCALHOST)`;
    }
}
