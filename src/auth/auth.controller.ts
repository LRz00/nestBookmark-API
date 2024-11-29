import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

//pipes: useful for data validation and transformation. kinda like @Valid i guess??
//yarn add class-validator class-transformer

@Controller('auth')
export class AuthController{
    //this is instance creation via dependency injection
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){

        return this.authService.signup();
    }

    @Post('signin')
    signin(){
        return this.authService.signin();
    }
}