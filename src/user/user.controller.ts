import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';


@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get('me')
    getMe(@GetUser() user: User){
        return user; 
    }

    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto){
        return this.editUser(userId, dto)
    }
}
