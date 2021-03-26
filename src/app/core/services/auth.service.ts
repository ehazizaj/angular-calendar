import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models';
import users from '../../../assets/users.json';


@Injectable({providedIn: 'root'})
export class AuthService {

  private auth: BehaviorSubject<User> = new BehaviorSubject<User>(this.userLocal);

  constructor(private router: Router) {
  }


  /**
   * Return current looged user
   * @return User
   */

  public get state(): User {
    return this.auth.getValue();
  }

  /**
   * Return current looged user
   * @param payload object with username and password property
   * @return string of token or error with code
   */
  login(payload: { username: string, password: string }): Observable<string | { error: number }> {
    // filter and find user that has the form credentials
    const user = users.find(x => x.username === payload.username && x.password === payload.password);
    // in case no user found throw error
    if (!user) {
      return throwError(403);
    }
    // create logged user object to store in local storage
    const loggedUser: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      token: 'fake-jwt-token'
    };
    // save in local storage
    localStorage.setItem('user', JSON.stringify(loggedUser));
    // set auth BehaviorSubject value to logged user object
    this.auth.next(loggedUser);
    // return "token" string observable
    return of(loggedUser.token);
  }

  /**
   * remove user from local storage to log user out
   * @return void
   */
  logout(): void {
    localStorage.removeItem('user');
    this.auth.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * set auth: BehaviorSubject initial value
   * @return user in case user is logged in or null
   */
  private get userLocal(): User | null {
    return JSON.parse(localStorage.getItem('user'));
  }

}
