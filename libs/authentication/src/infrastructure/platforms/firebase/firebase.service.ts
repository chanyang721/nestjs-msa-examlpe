import firebase                from "firebase-admin";
import { Injectable }          from "@nestjs/common";
import { CommonConfigService } from "../../../../configuration/common.config.service";



@Injectable()
export class FirebaseService {
  private readonly firebaseClient: any;


  constructor( private readonly commonConfigService: CommonConfigService ) {
    this.firebaseClient = firebase.initializeApp({
      credential: firebase.credential.cert(
        commonConfigService.accessFirebaseConfig
      )
    });
  }


  public getFirebaseClient() {
    return this.firebaseClient;
  }
}
