import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TenantsComponent } from './pages/tenants/tenants.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import { AddTenantComponent } from './pages/add-tenant/add-tenant.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'properties', component: HomeComponent },
    { path: 'add-property', component: AddPropertyComponent },
    { path: 'about', component: AboutComponent },
    { path: 'tenants', component: TenantsComponent },
    { path: 'add-tenant', component: AddTenantComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'add-task', component: AddTaskComponent },
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