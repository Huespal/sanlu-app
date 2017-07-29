import { NgModule } from '@angular/core';
import { WhoComponent } from './who/who.component';
import { WhatComponent } from './what/what.component';
import { WhereComponent } from './where/where.component';
import { WhyComponent } from './why/why.component';
import { DbCardsComponent } from './dbcards/dbcards.component';
import { AdminComponent } from './dbcards/admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    },
    {
        path: 'app',
        children: [
            {
                path: '',
                redirectTo: 'who',
                pathMatch: 'full'
            },
            {
                path: 'who',
                pathMatch: 'full',
                component: WhoComponent
            },
            {
                path: 'what',
                pathMatch: 'full',
                component: WhatComponent
            },
            {
                path: 'why',
                pathMatch: 'full',
                component: WhyComponent
            },
            {
                path: 'where',
                pathMatch: 'full',
                component: WhereComponent
            }
        ]
    },
    {
        path: 'dbcards',
        children: [
            {
                path: '',
                component: DbCardsComponent,
                pathMatch: 'full'
            },
            {
                path: 'admin',
                component: AdminComponent,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutesModule {

}