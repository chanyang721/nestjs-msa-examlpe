import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ConfigurationService {
    constructor(
        private readonly configService: ConfigService
    ) {
    }


    get accessAwsConfig() {
        return {
            region         : this.configService.get<string>("AWS_REGION"),
            accessKeyId    : this.configService.get<string>("AWS_ACCESS_KEY_ID"),
            secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY")
        };
    }


    get accessAwsS3Config() {
        return {};
    }


    get accessAwsSnsConfig() {
        return {};
    }


    get accessAwsSqsConfig() {
        return {
            region     : this.configService.get<string>("AWS_REGION"),
            endpoint   : this.configService.get<string>("AWS_ENDPOINT"),
            credentials: {
                accessKeyId    : this.configService.get<string>("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY")
            }
        };
    }


    get accessAwsCognitoConfig() {
        return {
            clientId  : this.configService.get<string>("AWS_COGNITO_CLIENT_ID"),
            userPoolId: this.configService.get<string>("AWS_COGNITO_USER_POOL_ID")
        };
    }


    get accessFirebaseConfig() {
        return {
            type                   : this.configService.get<string>("FIREBASE_TYPE"),
            projectId              : this.configService.get<string>("FIREBASE_PROJECT_ID"),
            privateKeyId           : this.configService.get<string>("FIREBASE_PRIVATE_KEY_ID"),
            privateKey             : this.configService.get<string>("FIREBASE_PRIVATE_KEY"),
            clientEmail            : this.configService.get<string>("FIREBASE_CLIENT_EMAIL"),
            clientId               : this.configService.get<string>("FIREBASE_CLIENT_ID"),
            authUri                : this.configService.get<string>("FIREBASE_AUTH_URI"),
            tokenUri               : this.configService.get<string>("FIREBASE_TOKEN_URI"),
            authProviderX509CertUrl: this.configService.get<string>("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
            clientC509CertUrl      : this.configService.get<string>("FIREBASE_CLIENT_X509_CERT_URL")
        };
    }


    get OpenApiConfig() {
        return {
            serviceKey: this.configService.get<string>("OPEN_API_SERVICE_KEY"),
            baseUrl   : this.configService.get<string>("OPEN_API_BASE_URL"),
            statusApi : this.configService.get<string>("OPEN_API_STATUS_PATH")
        };
    }


    get JwtConfig() {
        return {
            accessTokenExpiresIn: `${this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}m`,
            refreshTokenExpiresIn: `${this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME")}d`
        }
    }


    get HashingConfig() {
        return {
            saltRound: +this.configService.get("HASHING_SALT_ROUND")
        }
    }

    get KafkaConfig() {
        return {
            // clientId: this.configService.kafkaClientId,
            // brokers: this.configService.kafkaBrokers,
            // groupId: this.configService.kafkaGroupId,
            clientId: "",
            brokers: [] as string[],
            groupId: "",
        }
    }
}
