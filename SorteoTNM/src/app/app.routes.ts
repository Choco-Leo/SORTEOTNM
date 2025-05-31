import { Routes } from '@angular/router';
//LAYOUTS
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
//AUTH
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';
import { loginGuard } from './services/login.guard';
//PAGES
import { GruposComponent } from './pages/grupos/grupos.component';
import { RegGrupComponent } from './pages/reg-grup/reg-grup.component';
import { EditGrupComponent } from './pages/edit-grup/edit-grup.component';
import { ResultFinalComponent } from './pages/result-final/result-final.component';

export const routes: Routes = [
//RUTAS PUBLICAS Y AUTENTICADAS
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: '',
                component: GruposComponent,

            },
            {
                path: 'loginST',
                component: LoginComponent,
                canActivate: [loginGuard],
                

            },
        ]
    },
    //RUTAS PRIVADAS y AUTENTICADAS
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'registerGrupoST',
                component: RegGrupComponent,
            },
            {
                path: 'edit-GruposST',
                component: EditGrupComponent,
            },
            {
                path: 'resultadosST',
                component: ResultFinalComponent,
            }
        ]
    }

];
