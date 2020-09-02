<template>
  <div>
    <v-alert text prominent type="error" dismissible v-show="err.enable">{{err.errMsg}}</v-alert>
    <v-bottom-navigation
      background-color="#f3f3f3"
      grow
      style="justify-content: start;
             justify-items: center;
             align-items: center;
             padding:1.8rem"
    >
      <div>
        <img src="../assets/images/ibm-logo.png" height="50" alt="Logo IBM" />
      </div>
      <div>
        <img
          src="../assets/images/cocamar-logo.png"
          height="20"
          style="margin-left:10px"
          alt="Logo IBM"
        />
      </div>
    </v-bottom-navigation>

    <v-container fluid style="background-color:#f1f1f1">
      <v-row>
        <v-col>
          <h1 style="font: 400 1.6rem Archivo;color:#544F4F;letter-spacing:0.3px">{{ titulo }}</h1>
        </v-col>
      </v-row>

      <v-row style="background-color:#FFFFFF; padding: 1.5rem 3rem">
        <v-row>
          <v-col class="text-right">
            <p style="font: 400 0.9rem Archivo;color:#4F4F54">
              <b>Última execução às:</b>
              {{dataUltimaExec}}
            </p>
            <v-btn
              small
              outlined
              color="info"
              width="16rem"
              max-width="20rem"
              @click="removeAllFiles"
            >Remover todas imagens</v-btn>
          </v-col>
        </v-row>

        <v-row style="width: 100vw;margin-top:-1.7rem">
          <v-col cols="12">
            <h3 id="text-import">IMPORTAR ARQUIVOS</h3>
            <br />
            <Dropzone id="drop1" ref="dropzone" :useCustomSlot="true" :options="dropOptions" />
          </v-col>
          <v-col>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="blue"
              class="ma-2 white--text"
              @click="recognizeFiles"
              style="float:right"
            >
              Analisar imagens
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <div id="results" v-show="showResults">
          <v-row id="results-row">
            <v-col cols="6" v-for="res in resultados" :key="res.img">
              <Result
                :nome_praga="res.nome_praga"
                :valor_praga="res.valor_praga"
                :barra_cor="res.barra_cor"
                :img="res.img"
              />
            </v-col>
          </v-row>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Dropzone from "vue2-dropzone";
import Result from "../components/Result";
import api from "../config/api";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "Index",
  components: {
    Dropzone,
    Result,
  },
  data: () => ({
    err: { enable: false, errMsg: "" },
    loader: null,
    loading: false,
    showResults: false,
    titulo: "PROCESSAMENTO DE ANÁLISES PARA IDENTIFICAÇÃO DE PRAGAS",
    dropOptions: {
      url: "http://localhost:7777/api/v1/upload",
      paramName: "images",
      dictDefaultMessage:
        "Selecione imagens do seu computador ou arraste-as para cá.",
      thumbnailWidth: 200,
    },
    dataUltimaExec: "-",
    resultados: [],
  }),
  methods: {
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles(true);
    },
    recognizeFiles() {
      this.resultados = [];
      this.loader = "loading";

      this.$refs.dropzone.dropzone.files.forEach((file) => {
        const l = this.loader;
        this[l] = true;

        api
          .get(`recognize/${file.name}`)
          .then((res) => {
            const { classes } = res.data.result.images[0].classifiers[0];
            const praga = classes[0].class;
            const valor = classes[0].score;
            const barra_cor = valor > 0.6 ? "green" : "yellow";

            this.resultados.push({
              nome_praga: praga,
              valor_praga: valor * 100,
              barra_cor,
              img: `http://localhost:7777/images/${file.name}`,
            });

            console.log(this.resultados);
          })
          .catch((err) => {
            this.err = { enable: true, errMsg: err.message };
          })
          .finally(() => {
            this[l] = false;
            this.showResults = true;

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();
            var hr = String(today.getHours()).padStart(2, "0");
            var min = String(today.getMinutes()).padStart(2, "0");
            var sec = String(today.getSeconds()).padStart(2, "0");

            this.dataUltimaExec =
              mm + "/" + dd + "/" + yyyy + " " + hr + ":" + min + ":" + sec;
          });
      });

      this.loader = null;
    },
  },
};
</script>

<style>
#results {
  width: 100%;
  margin: 10px 0px;
  padding: 0px 15px;
}

#results .result-title {
  font: 500 1rem Archivo;
}

#text-import {
  font: 500 1.3rem Archivo;
  color: #4f4f54;
}
@media (min-width: 700px) {
  #results {
    width: 100%;
    margin: 10px 0px;
  }

  #results-row {
    float: left;
  }

  #results-row .col-6 {
    width: 150px;
  }

  #drop1 .dz-message {
    margin: 5em 0;
  }

  #text-import {
    font: 500 1.5rem Archivo;
  }
}
</style>
