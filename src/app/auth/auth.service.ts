import {throwError,  Observable, from, of, BehaviorSubject, combineLatest } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { mergeMap, map, tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user.model';
//import { ErrorService } from '../errors/error.service';
import { ProfileService } from '../profile/profile.service';
import { ChatService } from '../chat/chat.service';
import { ContactService } from '../layout/contact-list/contact.service';
import { TodoService } from '../todos/todo.service';
import { NotificationService } from '../notifications/notification.service';

var currentBEaddress = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authCallOccurred = new EventEmitter<String>();

  auth0Client$ = (from(
    createAuth0Client({
      domain: "makks.eu.auth0.com",
      client_id: "asLK8UP5QoSpU8ZZ8x8ZY82fnjSWb4pl",
      redirect_uri: `${window.location.origin}`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );


  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );

  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(private router: Router,
  private http: HttpClient, private profileService: ProfileService, private chatService: ChatService, private contactService: ContactService, private todoService: TodoService, private notificationService: NotificationService) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?: any): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => {
        this.checkExistingUser(user.email, user);
        this.userProfileSubject$.next(user);
      })
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath }
      });
    });
  }

  private handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap(cbRes => {
          // Get and set target redirect route from callback results
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: "asLK8UP5QoSpU8ZZ8x8ZY82fnjSWb4pl",
        returnTo: `${window.location.origin}`
      });
    });
  }

  createNewUser(user: User) {
    const url = currentBEaddress + '/user';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, user, httpOptions)
    .subscribe(response => {
        console.log("created user: " + user.name + "\ngot: " + response);
        this.connectOverall();
      }),
      catchError(error => of(`That shouldn't have happened! Caught ${error}`))
  }

  setLocalUser(BEResponseUser: any){
    var localNamedEmptyUser = new User(BEResponseUser.username, BEResponseUser.email, [], [], []);
    this.profileService.setUser(localNamedEmptyUser);
    this.getUsersDataOnLogin(localNamedEmptyUser);
  }

  getUsersDataOnLogin(user: User) {
    //start with user returned from check
    //use BEResponseUser email to get all relevant data
    //populate services and local sockets
    this.notificationService.getNotificationsOnLogin(user);
    this.contactService.getContactsOnLogin(user);
    this.contactService.getGroupsOnLogin(user);
    //connect overall
    this.connectOverall();
  }

  connectOverall(){
    this.chatService.connectToOverall();
    this.notificationService.connectToOverall();
    this.contactService.connectToOverall();
    this.todoService.connectToOverall();
  }

  checkExistingUser(email:string, user: any){
    const url = currentBEaddress + '/user/' + email;
    return this.http.get<any>(url, { observe: 'response' })
    .subscribe(resp => {
      console.log(resp);
      if(resp.body.obj != null){
        // get stuff
        this.setLocalUser(resp.body.obj);
        return true; // user exists
      }
      else if(resp.body.obj == null){
        // create user
        var newUser = new User(user.nickname, user.email, [], [], []);
        this.createNewUser(newUser);
      }
    }//, catchError( // add error constructor )
    )
  }

}
