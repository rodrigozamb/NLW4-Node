import { UserController} from './controllers/UserController'
import { SurveysController} from './controllers/SurveysController'
import { SendMailController} from './controllers/SendMailController'
import { Router } from 'express'

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();


const sendMailController = new SendMailController();


router.post("/users", userController.create);
router.get("/users", userController.show);


router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute);
router.get("/sendMail", sendMailController.show);



export {router};
