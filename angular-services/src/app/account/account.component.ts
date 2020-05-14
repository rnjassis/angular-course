import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging-service/logging.service';
import { AccountService } from '../account-service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private accountService: AccountService){}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    //this.accountService.statusUpdated.emit(status);
  }
}
