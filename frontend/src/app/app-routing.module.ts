import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { PostsComponent } from "./components/posts/posts.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { RoomComponent } from "./components/room/room.component";
import { NewRoomComponent } from './components/new-room/new-room.component';
import { OldRoomComponent } from './components/old-room/old-room.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';

import { AuthGuardService as AuthGuard} from './services/auth-guards.service';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { PendingComponent } from './components/pending/pending.component';

// redirect fara login
const routes: Routes = [
  {path: "", component: LoginComponent, canActivate: [AuthGuard] },
  {path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {path: "new-room", component: NewRoomComponent, canActivate: [AuthGuard] },
  {path: "old-room", component: OldRoomComponent, canActivate: [AuthGuard] },
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {path: "posts", component: PostsComponent, canActivate: [AuthGuard] },
  {path: "login", component: LoginComponent},
  {path: "chat", component: ChatComponent, canActivate: [AuthGuard] },
  {path: "signup", component: SignupComponent},
  {path: "room", component: RoomComponent,canActivate: [AuthGuard]  },
  {path: "scheduler", component: SchedulerComponent, canActivate: [AuthGuard]},
  {path: "pending", component: PendingComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


