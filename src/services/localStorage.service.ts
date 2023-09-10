import { Historico } from "../models/historico";

export class localStorageService{

  public carregarDados(): Historico{
    const historicoFavoritoIDS = localStorage.getItem('gerenciador_cinema_favoritos');
    if(historicoFavoritoIDS){
      return JSON.parse(historicoFavoritoIDS);
    }
    else {
      return {
        historicoFavoritoIDS: [],
      };
  }
  }

  public salvarFavoritos(favoritos: Historico) {
    localStorage.setItem('gerenciador_cinema_favoritos', JSON.stringify(favoritos));
}
}

