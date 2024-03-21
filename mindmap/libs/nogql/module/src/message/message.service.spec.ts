import { MessageService } from './message.service';
import { TestSystem } from '@nogql/test-server';
import { environment } from '../_environments/environment';
import { registerModules } from '../module';

describe('Message Service', () => {
  const system = new TestSystem();
  let messageService: MessageService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    messageService = app.get<MessageService>(MessageService);
  }, 10000);
  afterAll(async () => await system.terminate());
  it('Send Test Message', async () => {
    const success = await messageService.send('010-7445-3714', 'test message');
    // expect(success).toBeTruthy();
  });
});
