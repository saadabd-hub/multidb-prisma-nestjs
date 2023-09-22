import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient as MateriClient } from '@prisma/client/db_materi';
// import { PrismaClient as ProductClient } from '@prisma/client/db_product';
import { PrismaClient as PtnClient } from '@prisma/client/db_pt';
import { PrismaClient as UserClient } from '@prisma/client/db_user';

@Injectable()
export class PrismaService implements OnModuleInit {
  // public materiClient: MateriClient;
  // public productClient: ProductClient;
  public ptnClient: PtnClient;
  public userClient: UserClient;

  constructor() {
    // this.materiClient = new MateriClient();
    // this.productClient = new ProductClient();
    this.ptnClient = new PtnClient();
    this.userClient = new UserClient();
  }

  async onModuleInit() {
    // await this.materiClient.$connect();
    // await this.productClient.$connect();
    await this.ptnClient.$connect();
    await this.userClient.$connect();
  }

  async enableShutdownHooks() {
    // await this.materiClient.$disconnect();
    // await this.productClient.$disconnect();
    await this.ptnClient.$disconnect();
    await this.userClient.$disconnect();
  }
}
