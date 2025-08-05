import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routes";

import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared-module";


import { routes } from "./app.routes";

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}