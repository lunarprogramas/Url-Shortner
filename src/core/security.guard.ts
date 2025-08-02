import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IsPublic } from './security.decorator';

@Injectable()
export class SecurityGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.get(IsPublic, context.getHandler());

        if (isPublic) {
            return true;
        }

        if (!request.headers['x-api-key'] || request.headers['x-api-key'] !== process.env.API_KEY) {
            throw new UnauthorizedException('You are not permitted to access this resource.');
        }

        return true;
    }
}
