import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;
  id: number;

  constructor(private serversService: ServersService, private curRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.curRoute.queryParams.subscribe(
      (params: Params) => {
        this.allowEdit = params['allowEdit'] === '1'? true:false;
      }
    )
    this.id = +this.curRoute.snapshot.queryParams['id'];
    //add subscrive to route params to update id when changes
    this.curRoute.queryParams.subscribe(
      (params: Params) => {
        this.id = +this.curRoute.snapshot.queryParams['id'];
      }
    )
    this.server = this.serversService.getServer(this.id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved=true;
    this.router.navigate(['../'], {relativeTo: this.curRoute});
  }

  canDeactivate():Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm('Do you want to leave?');
    }else{
      return true;
    }
  }
}
