import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';


const APP_ROUTES: Routes = [
	{ path: '', redirectTo: '/chat', pathMatch: 'full' },
	{ path: ':groupname', component: ChatComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
