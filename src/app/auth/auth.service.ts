import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/Operators';
import * as jwt_decode from 'jwt-decode';

import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { User } from './user.model';
//import { ErrorService } from '../errors/error.service';
import { ProfileService } from '../profile/profile.service';
import { ChatService } from '../chat/chat.service';
import { ContactService } from '../layout/contact-list/contact.service';
import { TodoService } from '../todos/todo.service';
import { NotificationService } from '../notifications/notification.service';

declare var auth0: any;

var currentBEaddress = "http://localhost:3000";

@Injectable()
export class AuthService {
  authCallOccurred = new EventEmitter<String>();

  auth0 = new auth0.WebAuth({
    domain: 'makks.eu.auth0.com',
    clientID: 'asLK8UP5QoSpU8ZZ8x8ZY82fnjSWb4pl',
    // specify your desired callback URL
    redirectUri: 'https://ch-a-pp.herokuapp.com/',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  public incorrectUserOrPassword = false;
  public userIsLoggedIn: boolean = false;
  public loggedInUser: string = "";

  userProfile: any;

  refreshSubscription: any;

  constructor(/*public errorService: ErrorService,*/ private http: Http, private profileService: ProfileService, private notificationService: NotificationService, private todoService: TodoService, private chatService: ChatService, private contactService: ContactService) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  public getAccessToken(): string {
    return this._accessToken;
  }

  public getIdToken(): string {
    return this._idToken;
  }

  public handleAuthentication(): void {
    this.incorrectUserOrPassword = false;
    this.auth0.parseHash({ _idTokenVerification: false}, (err: any, authResult: any) => {
      if(err) {
        var errorCode = err.code;
        var errorMessage = err.message;
        //this.errorService.handleError(err);
      }
      if(authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.getProfile((err, profile) => {
          this.userProfile = profile;
        });
        this.localLogin(authResult, this.userProfile);
      }
    });
  }

  public login(): void {
    this.auth0.authorize();
  }

  private localLogin(authResult, userProfile: any) {
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;

    this.scheduleRenewal();
    const url = currentBEaddress + '/user';
    let params = '';
    let options = new RequestOptions({
        search: new URLSearchParams('email='+userProfile.email)
    });
    //get user
    //if user exists set as logged in user (set variables here, and set user in profile)
    //if user doesn't exist, add user and then set as logged in user
    return this.http.get(url, options)
      .map((response: Response) => {
        const responseObject = response.json().obj;
        if(responseObject.message == 'Success'){
          this.userIsLoggedIn = true;

          var contactNames = [];
          var chatNames = [];
          //sort contacts => contactNames array
          //sort chats => chatNames array
          for(var i=0; i<responseObject.contacts.length; i++){
            contactNames.push(responseObject.contacts[i].name);
          }

          for(var j=0; j<responseObject.chats.length; j++){
            chatNames.push(responseObject.chats[j].name);
          }

          var user = new User(
            responseObject.username,
            responseObject.email,
            contactNames,
            chatNames,
            responseObject.todos
          )
          this.loggedInUser = user.email;
          this.profileService.setUser(user);
          //get data from all other services for this user

          //1. get contacts
          this.contactService.getContactsOnLogin(user);
          this.contactService.getGroupsOnLogin(user);
          //2. get chats
          this.chatService.getChatsOnLogin(user);
          //3. get messages -> will be done in each chats component individually and loaded into that chat
          //4. get todos -> held by profile of targetted user and by chat - need to get todos for every chat loaded and apply them to the loaded user if applicable
          //5. get notifications
        }
        else{
          var user = new User(
            userProfile.name,
            userProfile.email,
            [],
            [],
            []
          )
          this.loggedInUser = user.email;
          this.addUser(user);
          this.profileService.setUser(user);
          //new user, no other data to get
        }
      })
      .catch((error: Response) => {
        console.log(error.json());
        return Observable.throw(error.json());
      })
  }

  private renewLogin(authResult): void{
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;

    this.scheduleRenewal();
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.renewLogin(authResult);
      } else if (err) {
        alert ('Could not get a new token');
        this.logout();
      }
    })
  }

  public scheduleRenewal() {
    if(!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = this._expiresAt;

    const expiresIn$ = Observable.of(expiresAt).pipe(
      mergeMap(
        expiresAt => {
          const now = Date.now();
          return Observable.timer(Math.max(1, expiresAt - now));
        }
      )
    );
    this.refreshSubscription = expiresIn$.subscribe(
      () => {
        this.renewTokens();
        this.scheduleRenewal();
      }
    );
  }

  public unscheduleRenewal() {
    if(this.refreshSubscription){
      this.refreshSubscription.unsubscribe();
    }
  }

  public isAuthenticated(): boolean {
    return this._accessToken && Date.now() < this._expiresAt;
  }

  public isIncorrect(): boolean {
    return this.incorrectUserOrPassword;
  }

  public logout(): void {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    this.unscheduleRenewal();

    this.auth0.logout({
      returnTo: window.location.origin
    });
    this.loggedInUser = "";
    this.userIsLoggedIn = false;
  }

  public getProfile(cb): void {
    if(!this._accessToken){
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;

    this.auth0.client.userInfo(this._accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    })
  }

  public addUser(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = currentBEaddress + '/user';
    return this.http.post(url, body, {headers: headers})
      .map((response: Response) => {
        console.log(response);
        response.json();
      })
      .catch((error: Response) => {
        console.log(error.json());
        return Observable.throw(error.json());
      })
  }

  public handleAuthClick(type: string){
    this.authCallOccurred.emit(type);
  }

}
