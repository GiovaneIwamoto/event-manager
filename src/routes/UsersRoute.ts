import { Router, Request, Response } from 'express';
import { UserController } from '../controller';
import authMiddleware from '../middlewares/AuthMiddleware';

const route = Router();

const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: All operations with events.
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users/signUp:
 *   post:
 *     summary: Create User
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User First Name
 *               lastName:
 *                 type: string
 *                 description: User Last Name
 *               birthDate:
 *                 type: string
 *                 description: User Birthdate
 *               city:
 *                 type: string
 *                 description: User City
 *               country:
 *                 type: string
 *                 description: User Country
 *               email:
 *                 type: string
 *                 description: User Email
 *               password:
 *                 type: string
 *                 description: User Password
 *               confirmPassword:
 *                 type: string
 *                 description: User Password Confirm
 *             required:
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - city
 *               - country
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */


route.post('/users/signUp', (req: Request, res: Response) => {
  return userController.createUser(req, res);
});



/**
 * @swagger
 *
 * /users/signIn:
 *   post:
 *     summary: login as a user.
 *     tags: 
 *       - Users
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: The user was logged successfully.
 *       400:
 *         description: Invalid request body or parameters.
 */
route.post('/users/signIn', (req: Request, res: Response) => {
  const user = userController.login(req, res);
});


/**
 * @swagger
 * /users/updateUser:
 *   put:
 *     summary: Update your own User
 *     tags:
 *       - Users
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User First Name
 *                 nullable: true
 *               lastName:
 *                 type: string
 *                 description: User Last name
 *                 nullable: true
 *               birthDate:
 *                 type: string
 *                 description: User Birthdate
 *                 nullable: true
 *               city:
 *                 type: string
 *                 description: User City
 *                 nullable: true
 *               country:
 *                 type: string
 *                 description: User Country
 *                 nullable: true
 *               email:
 *                 type: string
 *                 description: User Email
 *                 required: true
 *                 example: example@example.com
 *             example:
 *               firstName: Example
 *               lastName: Example
 *               birthDate: MM/DD/YYYY
 *               city: New York
 *               country: USA
 *               email: example@example.com

 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */

route.put('/users/updateUser', authMiddleware, (req: Request, res: Response) => {
  const user = userController.updateUser(req, res);
});

/**
 * @swagger
 *
 * /users/deleteUser:
 *   delete:
 *     summary: Delete your own user.
 *     tags: 
 *       - Users
 *     security:
 *     - bearerAuth: []
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of your user.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: The user was logged successfully.
 *       400:
 *         description: Invalid request body or parameters.
 */
route.delete('/users/deleteUser', authMiddleware, (req: Request, res: Response) => {
  const user = userController.deleteUser(req, res);
});



export default route;