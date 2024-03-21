import { MailerService } from './mailer.service';
import { TestSystem } from '@nogql/test-server';
import { environment } from '../_environments/environment';
import { registerModules } from '../module';

describe('Mailer Service', () => {
  const system = new TestSystem();
  let mailerService: MailerService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    mailerService = app.get<MailerService>(MailerService);
  });
  afterAll(async () => await system.terminate());
  it('Send Test Mail', async () => {
    const success = await mailerService.sendMail({
      from: 'hello@ahobbies.com',
      to: 'hobbies@naver.com',
      subject: 'Test Email',
      html: '<b>This is a Test Email for dev</b>',
    });
    expect(success).toBeTruthy();
  });
});
