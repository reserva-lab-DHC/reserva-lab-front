import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'inicio',
        loadComponent: () => import('./features/inicio/inicio.component').then(m => m.InicioComponent),
        canActivate: [authGuard]
    },
    {
        path: 'quadro-de-reservas',
        loadComponent: () => import('./features/quadro-de-reservas/quadro-de-reservas.component').then(m => m.QuadroDeReservasComponent),
        canActivate: [authGuard]
    },
    {
        path: 'confirmar-reserva',
        loadComponent: () => import('./features/confirmar-solicitacoes/confirmar-solicitacoes.component').then(m => m.ConfirmarSolicitacoesComponent),
        canActivate: [authGuard]
    },
    {
        path: 'cadastrar-laboratorio',
        loadComponent: () => import('./features/cadastrar-laboratorio/cadastrar-laboratorio.component').then(m => m.CadastrarLaboratorioComponent),
        canActivate: [authGuard]
    },
    {
        path: 'solicitacao-de-reservas',
        loadComponent: () => import('./features/solicitacao-de-reservas/solicitacao-de-reservas.component').then(m => m.SolicitacaoDeReservasComponent),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }