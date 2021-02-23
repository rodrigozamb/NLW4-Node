import {Request, response, Response} from 'express'
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController{

    async create(request:Request,response:Response){
        const {name,email} = request.body;

        const usersRep = getRepository(User);

        const userAlreadyExists = await usersRep.findOne({
            email
        })
        
        if(userAlreadyExists){
            return response.status(400).json({
                error:"User already exists",
                user:userAlreadyExists
            })
        }else{
            console.log("nao achou")
        }


        const user = usersRep.create({
            name, email
        })

        await usersRep.save(user);

        return response.json(user);

    }



}


export { UserController }