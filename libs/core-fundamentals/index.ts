import { RequestMethod }          from "@nestjs/common";
import { globalGuards }           from "./guards";
import { globalInterceptors }     from "./interceptors";
import { globalPipes }            from "./pipes";
import { globalExceptionFilters } from "./filters";



export const coreFundamentals = async( app: any ) => {
  /**
   * Global Core Fundamentals
   * */
  // app.use() // 글로벌 미들웨어 설정

  app.useGlobalGuards(...globalGuards);

  app.useGlobalInterceptors(...globalInterceptors);

  app.useGlobalPipes(...globalPipes);

  app.useGlobalFilters(...globalExceptionFilters);


  /**
   * Global Settings
   * */
  app.setGlobalPrefix("api", {
    exclude: [
      {
        path  : "/health-checker",
        method: RequestMethod.GET
      }
    ]
  });

};
