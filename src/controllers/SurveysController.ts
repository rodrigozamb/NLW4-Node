import {Request, Response} from "express"
import { getCustomRepository } from "typeorm";
import {SurveysRepostory} from '../repositories/SurveysRepository'

class SurveysController{

    async create(request:Request, response:Response){
        const { title, description} = request.body;

        const surveysRepository = getCustomRepository(SurveysRepostory);

        const survey = surveysRepository.create({
            title,
            description
        });

        await surveysRepository.save(survey);

        return response.status(201).json(survey)

    }

    async show(request:Request, response:Response){

        const surveysRepository = getCustomRepository(SurveysRepostory);

        const all = await surveysRepository.find();

        return response.json(all);

    }

}


export {SurveysController}