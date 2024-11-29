import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismadbService extends PrismaClient{
    constructor(){
        super({
            datasources: {
                db:{
                    url: ''
                }
            }
        })
    }
}
