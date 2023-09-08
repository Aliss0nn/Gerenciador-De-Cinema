import { FilmeService } from "../../services/filme.service";
import "./filme-detalhes.css"

export class DetalhesFilme{
  pnlCabecalho: HTMLDivElement;
  pnlTrailer: HTMLDivElement;
  pnlGeneros: HTMLDivElement;
  pnlPoster: HTMLDivElement;
  pnlCreditos: HTMLDivElement;
  lblDescricao: HTMLParagraphElement;
  filmeService = new FilmeService();
  //localStorageService: LocalStorageService;
  //favoritos: HistoricoUsuario;
  filme_id: number;

  constructor(){

    this.registrarElementos();
  }

  private registrarElementos(){
    this.pnlCabecalho = document.getElementById('pnlCabecalho') as HTMLDivElement;
    this.pnlTrailer = document.getElementById('pnlTrailer') as HTMLDivElement;
    this.pnlGeneros = document.getElementById('pnlGeneros') as HTMLDivElement;
    this.pnlPoster = document.getElementById('pnlPoster') as HTMLDivElement;
    this.pnlCreditos = document.getElementById('pnlCreditos') as HTMLDivElement;
    this.lblDescricao = document.getElementById('lblDescricao') as HTMLParagraphElement;
  }

}

window.addEventListener('load', () => new DetalhesFilme());