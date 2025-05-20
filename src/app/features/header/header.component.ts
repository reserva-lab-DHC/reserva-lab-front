import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'dhc-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /* O uso de signals e *ngIf facilitará muito a sua vida para não ter que ficar dando query pra cada elemento
  com eventos e afins vc consegue controlar tudo
  há também a ideia de template e container tbm, vale a pena entender
  e quando de fato precisar de pegar um elemento do DOM, use o viewChild (n é @ViewChild)
   */
  /*  ngAfterViewInit() {
     const botao_menu = document.getElementById("Menu__button") as HTMLButtonElement;
     const nav = document.getElementById("navegacao") as HTMLElement;
     const icone_menu = document.getElementById("icone-menu") as HTMLImageElement;
     const icone_fechar = document.getElementById("icone-fechar") as HTMLImageElement;
     const icone_menu_desk = document.getElementById("icone-menu-desk") as HTMLImageElement;
     const icone_fechar_desk = document.getElementById("icone-fechar-desk") as HTMLImageElement;
 
     botao_menu?.addEventListener("click", () => {
       nav?.classList.toggle("hidden");
       const isDesktop = window.innerWidth >= 1200;
 
       if (isDesktop) {
         icone_menu_desk?.classList.toggle("hidden");
         icone_fechar_desk?.classList.toggle("hidden");
       } else {
         icone_menu?.classList.toggle("hidden");
         icone_fechar?.classList.toggle("hidden");
       }
     });
   } */
}