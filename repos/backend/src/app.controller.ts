import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { type ClientGrpc } from '@nestjs/microservices';

interface FsService {
  listDir(data: { path: string }): Promise<{ entries: string[] }>;
}

@Controller()
export class AppController implements OnModuleInit {
  private fsService: FsService;

  constructor(
    private readonly appService: AppService,
    @Inject('FS_SERVICE') private fsClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.fsService = this.fsClient.getService<FsService>('FsService');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ls')
  async listDir(@Query('path') path: string) {
    return await this.fsService.listDir({ path });
  }
}
