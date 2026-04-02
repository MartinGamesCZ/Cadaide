import { Module } from '@nestjs/common';
import { LspService } from './lsp.service';
import { LspGateway } from './lsp.gateway';
import { LspController } from './lsp.controller';

@Module({
  imports: [],
  providers: [LspService, LspGateway],
  controllers: [LspController],
})
export class LspModule {}
