import { API_KEY } from "../../secrets";
import { Filme} from "../models/listagem-filmes";

export class FilmeService{


  public selecionarFilmePorId(id: number): Promise<Filme> {
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

private mapearFilme(obj: any): Filme {
  return {
      id: obj.id,
      titulo: obj.title,
      poster: obj.poster_path
  }
}
}