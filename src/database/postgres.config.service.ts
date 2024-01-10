import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: '127.0.0.1',
      port: 5435,
      username: 'root',
      password: 'root',
      database: 'user',
      entities: [],
      synchronize: true,
    };
  }
}
