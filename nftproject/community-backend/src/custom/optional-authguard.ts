import { AuthGuard } from '@nestjs/passport';

export class OptionalAuthGuard extends AuthGuard('jwt') {
  // Override handleRequest so it never throws an error
  handleRequest(err, user, info, context) {
    return user;
  }
}
