import { AuthGuard } from '@nestjs/passport';

export default class LocalGuard extends AuthGuard('local') {}
