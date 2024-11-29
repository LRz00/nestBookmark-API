import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismadbModule } from './prismadb/prismadb.module';

//Module: Container for diffrent parts of an application(Similiar to a package maybe?)
//@Module: Decorator. A modul can import other modules. Decorator = Bean
//terminal: nest g module_name to automatically generate a module
@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismadbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
