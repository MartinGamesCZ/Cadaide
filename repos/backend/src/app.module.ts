import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'cadaide.fs',
          protoPath: join(process.cwd(), '../microservices/fs/fs.proto'),
          url: 'unix:' + join(process.cwd(), '../microservices/fs/fs.sock'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
