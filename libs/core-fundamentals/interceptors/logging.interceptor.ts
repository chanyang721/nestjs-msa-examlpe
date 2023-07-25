import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable, tap }                                                    from 'rxjs'



@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name)

    intercept( context: ExecutionContext, next: CallHandler ): Observable<any> {
        const { method, url, body, params } = context.getArgByIndex(0);
        const now = Date.now();

        if ( method === "GET" && url === "/api/health-checker" ) {
            return next.handle()
                       .pipe();
        }

        if ( method === "GET" ) {
            this.logger.debug(`\n[ Request ]: ${method} | ${url} \n[ Params ]: ${JSON.stringify(params)}`);
        }
        else {
            this.logger.debug(`\n[ Request ]: ${method} | ${url} \n[ Body ]: ${JSON.stringify(body)}`);
        }

        return next
            .handle()
            .pipe(tap(( data ) => this.logger.debug(`\n[ Response ]: ${method} | ${url} | ${Date.now() - now}ms \n[ Response ]: ${JSON.stringify(data)}`)),)
    }

}