import { API_KEY } from "../../secrets";
import { CreditosFilme } from "../models/creditos-filmes";
import { DetalhesFilmes } from "../models/detalhes-filmes";
import { Filme} from "../models/listagem-filmes";
import { TrailerFilme } from "../models/trailer-filmes";

export class FilmeService {
  
public selecionarFilmePorId(id: string): Promise<Filme> {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

  return fetch(url, this.obterHeaderAutorizacao())
      .then((res: Response): Promise<any> => this.processarResposta(res))
      .then((obj: any): Filme => this.mapearFilme(obj));
}

public selecionarFilmes(): Promise<any[]> {
  const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1";

  return fetch(url, this.obterHeaderAutorizacao())
      .then((res: Response): Promise<Filme> => this.processarResposta(res))
      .then((obj: any): Promise<Filme[]> => this.mapearListaFilmes(obj.results));
}

public selecionarFilmesPorIds(ids: string[]): Promise<Filme[]> {
  const filmes = ids.map(id => this.selecionarFilmePorId(id));
  return Promise.all(filmes);
}

public selecionarDetalhesFilmePorId(id: number): Promise<DetalhesFilmes> {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

  return fetch(url, this.obterHeaderAutorizacao())
      .then((res: Response): Promise<any> => this.processarResposta(res))
      .then((obj: any): DetalhesFilmes => this.mapearDetalhesFilme(obj));
}

public selecionarCreditosFilmePorId(id: number): Promise<CreditosFilme>{
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

  return fetch(url, this.obterHeaderAutorizacao())
      .then((res: Response): Promise<any> => this.processarResposta(res))
      .then((obj: any): CreditosFilme => this.mapearCreditosFilme(obj));
}

public selecionarTrailerPorId(id: number): Promise<TrailerFilme> {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`;

      return fetch(url, this.obterHeaderAutorizacao())
          .then((res: Response): Promise<any> => this.processarResposta(res))
          .then((obj: any): TrailerFilme => this.mapearFilmeTrailer(obj.results));
}

private obterHeaderAutorizacao() {
  return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
   };
}

private processarResposta(resposta: Response): any {
  if (resposta.ok) {
      return resposta.json();
  }

  throw new Error('Filme não encontrado');
}

private mapearListaFilmes(objetos: any[]): Promise<Filme[]> {
  const filmes = objetos.map(obj => this.selecionarFilmePorId(obj.id));
  return Promise.all(filmes);
}

private mapearDetalhesFilme(obj: any): DetalhesFilmes {
  const apiGeneros: any[] = obj.genres;

  return {
      id: obj.id,
      titulo: obj.title,
      urlPoster: obj.poster_path,
      contagemVotos: obj.vote_count,
      mediaNota: obj.vote_average,
      dataLancamento: obj.release_date,
      sinopse: obj.overview,
      generos: apiGeneros.map(g => g.name)
  }
}

private mapearFilme(obj: any): Filme {
  return {
      id: obj.id,
      titulo: obj.title,
      poster: obj.poster_path
  }
}

private mapearFilmeTrailer(obj: any): TrailerFilme {
  const trailer = obj[obj.length - 1]?.key; 
  return {
    urlTrailer: trailer == null ? "" : trailer
  };
}

private mapearCreditosFilme(obj: any): CreditosFilme {
  let creditos = {
      diretores: [...(obj.crew)].filter(c => c.known_for_department == "Directing")?.map(c => c.name),
      escritores: [...(obj.crew)].filter(c => c.known_for_department == "Writing")?.map(c => c.name),
      atores: [...(obj.crew)].filter(c => c.known_for_department == "Acting")?.map(c => c.name)
  }

  let valores = Object.values(creditos);

  creditos.diretores = valores[0].filter((v, indice) => valores[0].indexOf(v) == indice);
  creditos.escritores = valores[1].filter((v, indice) => valores[1].indexOf(v) == indice);
  creditos.atores = valores[2].filter((v, indice) => valores[2].indexOf(v) == indice);
  
  return creditos;
}
}