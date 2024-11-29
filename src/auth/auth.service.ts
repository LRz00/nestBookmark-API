import { Injectable } from "@nestjs/common";
import {User, Bookmark} from '@prisma/client'; //types created automatically by prisma
import { PrismadbService } from "src/prismadb/prismadb.service";

//injection = allows to create a instance without declaring. instead it does via dependency injection
@Injectable()
export class AuthService{
    constructor(private prisma: PrismadbService){}

    signin(){

    }

    signup(){
        
    }
}