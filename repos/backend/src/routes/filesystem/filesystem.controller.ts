import { Controller, Get, Query } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';

@Controller('/filesystem')
export class FilesystemController {
  constructor(private readonly filesystemService: FilesystemService) {}

  @Get('/listDir')
  async listDir(@Query('path') path: string) {
    return await this.filesystemService.listDir(path);
  }

  @Get('/readFile')
  async readFile(@Query('path') path: string) {
    return await this.filesystemService.readFile(path);
  }

  @Get('/treeDir')
  async treeDir(@Query('path') path: string, @Query('depth') depth: string) {
    return await this.filesystemService.treeDir(path, Number(depth) ?? 1);
  }
}
