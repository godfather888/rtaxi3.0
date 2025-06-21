import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../../../../@services/table-service';
import { environment } from '../../../../../environments/environment';

@Component({
  standalone: false,
  selector: 'app-sms-provider-list',
  templateUrl: './sms-provider-list.component.html',
})
export class SMSProviderListComponent {
  serverUrl = environment.root;

  constructor(
    public route: ActivatedRoute,
    public tableService: TableService,
  ) {}
}
