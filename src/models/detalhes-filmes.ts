export type DetalhesFilmes = {
  id: number;
  titulo: string;
  sinopse: string;
  dataLancamento: string;

  urlPoster: string;

  mediaNota: number;
  contagemVotos: number;

  generos: string[];
}