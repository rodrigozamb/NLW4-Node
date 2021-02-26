import {Request, Response} from "express"
import { getCustomRepository } from "typeorm";
import {resolve} from 'path'
import {SurveysRepostory} from '../repositories/SurveysRepository'
import { UsersRepostory } from "../repositories/UsersRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController{

    async execute(request:Request, response:Response){
        const { email, survey_id} = request.body;

        const usersRepository = getCustomRepository(UsersRepostory);
        const surveysRepository = getCustomRepository(SurveysRepostory);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
     
        //Check if user exists, so we can send the email
        const user = await usersRepository.findOne({email});
        if(!user){
            return response.status(400).json({
                error:"User does no exists"
            })
        }
    
        //Check if survey exists, so we can send the email
        const survey = await surveysRepository.findOne({id:survey_id})
        if(!survey){
            return response.status(400).json({
               error:"Survey does not exists"
            })
        }

        const variables = {
            name:user.name,
            title:survey.title,
            description:survey.description,
            user_id:user.id,
            link:process.env.URL_MAIL
        }
        const path = resolve(__dirname,"..","views","emails","npsMail.hbs");

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{ user_id: user.id }, { value: null }],
            relations:["user","survey"]
        });
        
        if (surveyUserAlreadyExists) {
            await SendMailService.execute(email, survey.title, variables, path);
            return response.json(surveyUserAlreadyExists);
        }

        const surveyUser = surveysUsersRepository.create({
            user_id:user.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser) 

    }


    async show(request:Request, response:Response){

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const all = await surveysUsersRepository.find();

        return response.json(all);

    }

}


export {SendMailController}