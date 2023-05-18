import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { _DECLARATION, _IMPORTS } from './components.barrel';

@NgModule({
  declarations: [
    _DECLARATION
  ],
  imports: [ 
    _IMPORTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
