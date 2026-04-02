import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { ChildProcess, spawn } from 'child_process';
import path from 'path';

interface FsMicroservice {
  listDir(data: { path: string }): Promise<{
    entries: {
      name: string;
      path: string;
      type: string;
    }[];
  }>;
  readFile(data: { path: string }): Promise<{
    content: string;
  }>;
  treeDir(data: { path: string; depth: number }): Promise<{
    entries: {
      name: string;
      path: string;
      type: string;
    };
  }>;
  writeFile(data: { path: string; content: string }): Promise<{}>;
}

@Injectable()
export class FilesystemService implements OnModuleInit, OnModuleDestroy {
  private fsMicroservice: FsMicroservice;

  readonly #logger = new Logger(FilesystemService.name);
  #fsProcess: ChildProcess | null = null;

  constructor(@Inject('FS_SERVICE') private readonly fsClient: ClientGrpc) {}

  async onModuleInit() {
    await this.#startFsMicroservice();

    this.fsMicroservice = this.fsClient.getService<FsMicroservice>('FsService');
  }

  async onModuleDestroy() {
    await this.#stopFsMicroservice();
  }

  async #startFsMicroservice() {
    this.#fsProcess = spawn('go', ['run', 'src/main.go'], {
      cwd: path.join(process.cwd(), '../microservices/fs'),
      stdio: 'inherit',
    });

    this.#fsProcess.on('error', (error) => {
      console.error('Failed to start fs microservice:', error);
    });

    this.#fsProcess.on('exit', (code) => {
      console.log(`Fs microservice exited with code ${code}`);
    });

    this.#logger.log(`Started fs microservice (pid=${this.#fsProcess.pid})`);
  }

  async #stopFsMicroservice() {
    if (!this.#fsProcess) return;

    this.#fsProcess.kill('SIGTERM');

    this.#logger.log(`Stopped fs microservice (pid=${this.#fsProcess.pid})`);

    this.#fsProcess = null;
  }

  async listDir(path: string) {
    const response = await this.fsMicroservice.listDir({ path });

    return response;
  }

  async readFile(path: string) {
    const response = await this.fsMicroservice.readFile({ path });

    return response;
  }

  async treeDir(path: string, depth: number) {
    const response = await this.fsMicroservice.treeDir({ path, depth });

    return response;
  }

  async writeFile(path: string, content: string) {
    const response = await this.fsMicroservice.writeFile({ path, content });

    return response;
  }
}
