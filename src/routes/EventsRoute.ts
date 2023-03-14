import { Router, Request, Response } from 'express';
import { EventsController } from '../controller';
import { authMiddleware } from '../middlewares/AuthMiddleware'
const route = Router();

const eventsController = new EventsController();

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
 * security:
 *   - bearerAuth: []
 */
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event with a given description and date/time.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The description of the event.
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the event Date-12/05/2024.
 *             required:
 *               - description
 *               - dateTime
 *     responses:
 *       '201':
 *         description: The created event.
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */
route.post('/events', authMiddleware, (req: Request, res: Response) => {
    return eventsController.CreateEvent(req, res);
});

/**
 * @swagger
 * /events:
 *   get:
 *     summary: GetAll / GetallByWeekday
 *     description: Retrieve a list of all events or events occurring on a specific weekday, based on params.
 *     tags: [Events]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: dayOfWeek
 *         description: The weekday to filter by.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of events.
 *         content:
 *             schema:
 *               type: array
 * 
 */
route.get('/events', authMiddleware, (req: Request, res: Response) => {
    return eventsController.GetAllEvents(req, res);
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a single event by ID.
 *     description: Retrieve an event by its unique identifier.
 *     tags: [Events]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the event to retrieve.
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: The event object.
 *         content:
 *       '404':
 *         description: The event with the specified ID was not found.
 */
route.get('/events/:id', authMiddleware, (req: Request, res: Response) => {
    return eventsController.GetEventsById(req, res);
});

/**
 * @swagger
 * /events:
 *   delete:
 *     summary: DeleteByID OR AllEventsByWeekday
 *     description: Delete an event by its ID OR delete ALL events in a weekday.
 *     tags: [Events]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         description: The ID of the event to delete.
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: dayOfWeek
 *         description: The weekday of the event to delete.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Event successfully deleted.
 *       '404':
 *         description: Event not found.
 *       '500':
 *         description: Internal server error.
 */
route.delete('/events', authMiddleware, (req: Request, res: Response) => {
    return eventsController.DeleteEvent(req, res);
});


export default route;