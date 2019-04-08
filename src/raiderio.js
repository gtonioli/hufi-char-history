import axios from 'axios/index';
import {guild, realm, region, season} from './config';

class RaiderIO {
   static async listGuildMembers() {
      return await axios.get("https://raider.io/api/mythic-plus/rankings/characters?region=" + region + "&realm=" + realm + "&guild=" + guild + "&season=" + season + "&class=all&role=all&page=0").then((response) => {
         return response.data.rankings.rankedCharacters;
      }).catch(() => {
         throw new Error("Erro ao buscar informações =(");
      });
   }
}

export default RaiderIO;
