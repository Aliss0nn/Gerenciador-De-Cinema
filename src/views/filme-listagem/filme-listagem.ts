import { Historico } from "../../models/historico";
import { Filme } from "../../models/listagem-filmes";
import { FilmeService } from "../../services/filme.service";
import { localStorageService } from "../../services/localStorage.service";
import "./filme-listagem.css"

export class Listagemfilme{
pnlFilmes: HTMLDivElement;
lblEmAlta: HTMLHeadingElement;
lblFavoritos: HTMLHeadingElement;
filmeService = new FilmeService();
localStorageService: localStorageService;
favoritos: Historico;


constructor(){
  this.filmeService = new FilmeService();

  //this.localStorageService = new localStorageService();
 // this.favoritos = this.localStorageService.carregarDados();

  this.registrarElementos();
  this.registrarEventos();

  this.selecionarFilmesEmAlta();
}

private registrarElementos(){
  this.pnlFilmes = document.getElementById('pnlFilmes') as HTMLDivElement;
  this.lblEmAlta = document.getElementById('lblEmAlta') as HTMLHeadingElement;
  this.lblFavoritos = document.getElementById('lblFavoritos') as HTMLHeadingElement;
}
  
private registrarEventos(){
  //const ids = this.favoritos.historicoFavoritoIDS;
  //console.log(this.favoritos);

  this.lblEmAlta.addEventListener('click', () => this.selecionarFilmesEmAlta());
  //this.lblFavoritos.addEventListener('click', () => {this.selecionarFilmesFavoritos(ids)});
}

private gerarTabelaFilmes(filmes: Filme[]){
  let filmesInnerHtml: string = "";

  for (let filme of filmes) {
    const filmeHtml: string =
      `<div class="col-6 col-md-4 col-lg-2">
        <div class="d-grid gap-2 text-center">
          <img
            src="https://image.tmdb.org/t/p/original${filme.poster}"
            class="img-fluid rounded-3"
          />
          <a href="detalhes.html?id=${filme.id}" class="fs-5 link-info text-decoration-none text-light"
            >${filme.titulo}</a
          >
        </div>
      </div>`;

    filmesInnerHtml += filmeHtml;
  }

  this.pnlFilmes.innerHTML = filmesInnerHtml;
}

private selecionarFilmesEmAlta() {
  this.filmeService.selecionarFilmes()
    .then((filmes) => this.gerarTabelaFilmes(filmes));

  this.lblEmAlta.classList.remove('lbl-selecionado');
  this.lblFavoritos.classList.remove('lbl-selecionado');
  this.lblEmAlta.classList.add('lbl-selecionado');
}

private selecionarFilmesFavoritos(ids: string[]) {
 this.filmeService.selecionarFilmesPorIds(ids)
   .then((filmes) => this.gerarTabelaFilmes(filmes));

   this.lblEmAlta.classList.remove('lbl-selecionado');
   this.lblFavoritos.classList.remove('lbl-selecionado');
   this.lblFavoritos.classList.add('lbl-selecionado');
}
}
window.addEventListener('load', () => new Listagemfilme());