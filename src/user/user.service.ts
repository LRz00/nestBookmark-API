import { Injectable } from "@nestjs/common";
import { PrismadbService } from "src/prismadb/prismadb.service";
import { EditUserDto } from "./dto";

@Injectable()
export class UserService{
    constructor(private prisma: PrismadbService){}

    async editUser(userId: number, dto: EditUserDto){
        const user = await this.prisma.user.update({
            where: {id: userId},
            data: {...dto},
        });

        delete user.hash;

        return user;
    }
}