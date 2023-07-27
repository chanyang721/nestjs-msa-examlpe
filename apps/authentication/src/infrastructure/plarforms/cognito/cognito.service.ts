import { Injectable }           from '@nestjs/common'
import { ConfigurationService } from '@app/configuration'



@Injectable()
export class CognitoService {
    private readonly cognitoClient: any;


    constructor( private readonly configurationService: ConfigurationService ) {
        this.cognitoClient = this.configurationService.accessAwsCognitoConfig
    }
}
