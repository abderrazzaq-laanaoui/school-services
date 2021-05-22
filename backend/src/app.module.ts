import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, DocumentModule],
})
export class AppModule {}
