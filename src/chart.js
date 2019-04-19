import axios from 'axios/index';

class Chart {
   static async getBase64(data, layout) {
      if (!Array.isArray(data)) {
         data = [data];
      }

      const response = await axios.post("https://hufi-plotly.herokuapp.com/", {data, layout});

      return response.data.base64;
   }
}

export default Chart;
