import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TenantsComponent } from './pages/tenants/tenants.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'properties', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'tenants', component: TenantsComponent },
    { path: 'tasks', component: TasksComponent },
    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }