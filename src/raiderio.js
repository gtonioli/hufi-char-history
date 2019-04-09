import axios from 'axios/index';
import {guild, season, tier, realm, region} from './config';

class RaiderIO {
   static async listGuildMembers() {
      return await axios.get("https://raider.io/api/mythic-plus/rankings/characters?region=" + region + "&realm=" + realm + "&guild=" + guild + "&season=" + season + "&class=all&role=all&page=0").then((response) => {
         return response.data.rankings.rankedCharacters;
      }).catch(() => {
         throw new Error("Erro ao buscar informações =(");
      });
   }

   static async getCharacter(name, _region, _realm) {
      return await axios.get("https://raider.io/api/characters/" + _region + "/" + _realm + "/" + name + "/?season=" + season + "&tier=" + tier).then(async (response) => {
         const runs = await RaiderIO.getCharacterDetails(response.data.characterDetails.character.id);

         return {
            info: response.data,
            runs: runs
         };
      }).catch((err) => {
         if (err instanceof Error) {
            throw err;
         }

         throw new Error("Char não encontrado =(");
      });
   }

   static async getCharacterDetails(id) {
      return await axios.get("https://raider.io/api/characters/mythic-plus-scored-runs?season=" + season + "&role=all&mode=scored&affixes=all&date=all&characterId=" + id).then((response) => {
         return response.data;
      }).catch(() => {
         throw new Error("Erro ao buscar informações =(");
      });
   }
}

export default RaiderIO;
