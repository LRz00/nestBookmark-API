import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark } from '@prisma/client'; //types created automatically by prisma
import { PrismadbService } from "src/prismadb/prismadb.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

//injection = allows to create a instance without declaring. instead it does via dependency injection
@Injectable()
export class AuthService {
    constructor(private prisma: PrismadbService, private jwt: JwtService, private config: ConfigService) { }

   async signToken(userId: number, email: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });

        return {
            access_token: token
        }
    }

    async signin(dto: AuthDto) {
        //find user by email or throw exception
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        })

        if(!user) throw new ForbiddenException("Incorrect credentials");

        //compare passwords 
        const pwMatches = await argon.verify(user.hash, dto.password);

        if(!pwMatches) throw new ForbiddenException("Incorrect credentials");

        //return token
        return this.signToken(user.id, user.email);
    }

    async signup(dto: AuthDto) {
        //generate passwrod hash
        const hash = await argon.hash(dto.password);

        //save new user
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            });
            delete user.hash;
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException("Credentials taken");
                }
            } else {
                throw error;
            }
        }

        //return saved user

    }
}