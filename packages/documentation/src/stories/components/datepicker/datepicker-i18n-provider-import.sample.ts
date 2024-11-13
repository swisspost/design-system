import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  providers: [{ provide: NgbDatepickerI18n, useClass: SwissPostDatepickerI18n }],
})
export class YourAppModule {}
