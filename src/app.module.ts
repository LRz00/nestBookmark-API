import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismadbModule } from './prismadb/prismadb.module';


//Module: Container for diffrent parts of an application(Similiar to a package maybe?)
//@Module: Decorator. A modul can import other modules. Decorator = Bean
//terminal: nest g module_name to automatically generate a module
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UserModule, BookmarkModule, PrismadbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
