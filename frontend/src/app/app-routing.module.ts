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

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "new-room", component: NewRoomComponent},
  {path: "old-room", component: OldRoomComponent},
  {path: "profile", component: ProfileComponent},
  {path: "posts", component: PostsComponent},
  {path: "login", component: LoginComponent},
  {path: "chat", component: ChatComponent},
  {path: "signup", component: SignupComponent},
  {path: "room", component: RoomComponent},
  {path: "**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
