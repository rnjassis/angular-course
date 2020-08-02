import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dss: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  isAuthenticated = false;
  private userSub: Subscription;

  ngOnInit() {
    this.userSub = this.store.select('auth')
      .pipe(
        map(authState => authState.user))
      .subscribe(
        user => {
          this.isAuthenticated = !!user; // same as !user ? false:true
        });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dss.storeRecipes();
  }

  onFetchData() {
    this.dss.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }
}
