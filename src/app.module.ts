import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SecurityGuard } from './core/security.guard';
import { RequestModule } from './request/request.module';

@Module({
    imports: [RequestModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: SecurityGuard,
        },
        RequestModule,
    ],
})
export class AppModule {}
