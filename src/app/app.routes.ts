import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TenantsComponent } from './pages/tenants/tenants.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AddEditPropertyComponent } from './pages/add-edit-property/add-edit-property.component';
import { AddEditTenantComponent } from './pages/add-edit-tenant/add-edit-tenant.component';
import { AddEditTaskComponent } from './pages/add-edit-task/add-edit-task.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'properties', component: HomeComponent },
    { path: 'add-property', component: AddEditPropertyComponent },
    { path: 'about', component: AboutComponent },
    { path: 'tenants', component: TenantsComponent },
    { path: 'add-tenant', component: AddEditTenantComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'add-task', component: AddEditTaskComponent },
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