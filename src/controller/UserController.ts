import { Request, Response } from 'express';
import { CreateUserDTO, UserLoginDTO } from "../DTO";
import { UsersService } from "../services";
import jwt from 'jsonwebtoken';


export default class UserController {
    private userService: UsersService;

    constructor() {
        this.userService = new UsersService();
    };

    async createUser(req: Request, res: Response) {
        try {
            const createUserDTO: CreateUserDTO = req.body;

            const validateCreate = CreateUserDTO.validateData(createUserDTO);
            if (!validateCreate.success) {
                return res.status(401).json("Please provide the correct parameters in the request body");
            }
            const createdUser = await this.userService.createUser(createUserDTO);
            return res.status(201).json({ data: createdUser });
        } catch (err) {
            const errorMessage: string = (err as Error).message;
            if (errorMessage === "User already exists") {
                return res.status(400).json({ message: errorMessage });
            }
            return res.status(500).json({ errorMessage });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const userLoginDTO: UserLoginDTO = req.body;
            if (!(userLoginDTO.email && userLoginDTO.password)) {
                return res.status(400).send('Please provide email and password in the request body');
            }
            const user = await this.userService.login(userLoginDTO);
            if (user != null) {
                const token = this.userService.generateJwtToken(user);
                return res.status(200).json({ message: 'Logged in successfully!', data: user, token });
            } else {
                return res.status(401).json({ message: 'Invalid User or Password!' });
            }

        } catch (err) {
            return res.status(401).json({ message: err });
        }
    }
    async updateUser(req: Request, res: Response) {
        const user = req.body;
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            const user = req.body;
            const newUser = await this.userService.updateUser(user, token);
            return res.status(200).json({ message: 'Updated Successfully!', data: newUser });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const user = req.body;
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            const user = req.body;
            await this.userService.deleteUser(user.email, token);
            return res.status(200).json({ message: 'Deleted Successfully!' });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

}