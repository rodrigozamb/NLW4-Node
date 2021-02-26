import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepostory } from '../repositories/UsersRepository';

class UserController{

    async create(request:Request,response:Response){
        const {name,email} = request.body;

        const usersRep = getCustomRepository(UsersRepostory);

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

        return response.status(201).json(user);

    }


    async show(request:Request, response:Response){

        const usersRepository = getCustomRepository(UsersRepostory);

        const all = await usersRepository.find();

        return response.json(all);

    }

}


export { UserController };
