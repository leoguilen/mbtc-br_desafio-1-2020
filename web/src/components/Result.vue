<template>
  <v-card class="mx-auto" max-width="344">
    <v-img v-bind:src="img" height="200px" />

    <v-card-title>{{nome_praga}}</v-card-title>

    <v-card-subtitle>
      <v-progress-linear v-model="valor_praga" v-bind:color="barra_cor" height="25" :rounded="true">
        <strong>{{ Math.ceil(valor_praga) }}%</strong>
      </v-progress-linear>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "Result",
  props: {
    nome_praga: String,
    valor_praga: Number,
    barra_cor: String,
    img: String,
  },
};
</script>
