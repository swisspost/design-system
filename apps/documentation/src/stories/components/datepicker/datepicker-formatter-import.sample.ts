import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  providers: [{ provide: NgbDateParserFormatter, useClass: SwissPostDateParserFormatter }],
})
export class YourAppModule {}
