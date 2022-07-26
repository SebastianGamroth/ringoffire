import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { GameInfoComponent } from './game-info/game-info.component';
import {MatCardModule} from '@angular/material/card';
import { ImprintComponent } from './imprint/imprint.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInfoComponent,
    ImprintComponent,
    CopyrightComponent,
    PrivacyComponent,
    MenuComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
