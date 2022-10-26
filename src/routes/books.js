const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

/**
*  @swagger
*  components:
*    schemas:
*      Book:
*        type: object
*        required:
*          - title
*          - author
*          - finished
*        properties:
*          id:
*            type: integer
*            description: The auto-generated id of the book.
*          title:
*            type: string
*            description: The title of your book.
*          author:
*            type: string
*            description: Who wrote the book?
*          finished:
*            type: boolean
*            description: Have you finished reading it?
*          createdAt:
*            type: string
*            format: date
*            description: The date of the record creation.
*        example:
*          title: The Pragmatic Programmer
*          author: Andy Hunt / Dave Thomas
*          finished: true
*/

/**
 * @swagger
 * tags:
 *    name: Others
 *    description: API to manage others
 */

/**
 * @swagger
 * /books:
 *    post:
 *      tags:
 *        - Books
 *      summary: Creates a new book
 *      description: Creates a new book record
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      responses:
 *        '200':
 *          description: The created book
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Book'
 */
router.post('/', (req, res) => {
  res.send('Birds home page')
})

/**
 * @swagger
 * /books:
 *  get: 
 *    tags: [Books]
 *    summary: Returns a book
 *    description: Retrives a book details by book id
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: bookId
 *        schema:
 *          type: integer
 *        required: true
 *        description: a valid book id
 *    responses:
 *      '200': 
 *        description: Returns a book details
 *      '404':
 *        description: Book details not found
 */
router.get('/', (req, res) => {
  res.status(200).json({
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt / Dave Thomas',
    finished: true
  });
})

/**
 * @swagger
 * /books/about:
 *  get: 
 *    tags: [Others]
 *    summary: About api
 *    description: About api details
 *    produces:
 *       - application/json 
 *    responses:
 *      '200': 
 *        description: About API details
 */
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router