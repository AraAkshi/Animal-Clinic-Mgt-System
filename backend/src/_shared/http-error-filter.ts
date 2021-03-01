import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

// const util = require('util');
// const  fs=require('fs');
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    
  async catch(exception: unknown, host: ArgumentsHost) {
    // const readFile = util.promisify(fs.readFile);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const newErrorResponse={
        statusCode: status,
        date: new Date().toDateString(),
        time:new Date().toLocaleTimeString(),
        path: request.url,
        method:request.method,
        message:exception||null
    }
    response.status(status).json(newErrorResponse);
  }
}