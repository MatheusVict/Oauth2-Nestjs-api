import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_ID_CLIENT,
  clientSecret: process.env.GOOGLE_SECRET,
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async login(@Body('token') token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID_CLIENT,
    });

    const payload = ticket.getPayload();

    return await this.appService.login({
      email: payload.email,
      name: payload.name,
      image: payload.picture,
    });
  }
}
