import { Global, Module, DynamicModule, forwardRef } from '@nestjs/common';

import { LanguageService } from './language.service';

@Global()
@Module({
  imports: [],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
