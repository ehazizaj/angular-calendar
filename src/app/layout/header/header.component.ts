import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {User} from '../../core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // header button show / hide sidebar
  @Output() menuToggled = new EventEmitter<boolean>();

  // get auth user to show name in html file
  user: User = this.authService.state;

  constructor(private authService: AuthService) {
  }

  // logout user and delete localstorage
  logout(): void {
    this.authService.logout();
  }
}
