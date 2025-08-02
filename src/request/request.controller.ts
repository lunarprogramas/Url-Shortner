import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsPublic } from 'src/core/security.decorator';
import { RequestService } from './request.service';

@Controller()
export class RequestController {
    constructor(private requestService: RequestService) {}

    @Get(':fileCode')
    @IsPublic(true)
    async handleUrlRequest(@Res() response: Response, @Param('fileCode') fileCode: string) {
        const { message, state } = await this.requestService.findUrlFromCode(fileCode);
        if (state) {
            return response.redirect(message);
        } else {
            return response.send(message);
        }
    }

    @Post()
    @IsPublic(true)
    async addUrlToForwarding(@Req() request: Request, @Res() response: Response) {
        const url = (request.body && request.body['url']) ?? null;
        if (!url) return response.send('Unable to find the provided URL code.');
        const message = await this.requestService.addUrlForwarding(url);
        return response.send(message);
    }
}
