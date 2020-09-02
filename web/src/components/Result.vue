<template>
  <v-card id="card-result" class="mx-auto" max-width="344">
    <v-img v-bind:src="img" aspect-ratio="1.7" contain />

    <v-card-title>{{nome_praga}}</v-card-title>

    <v-card-subtitle>
      <v-progress-linear
        v-bind:color="barra_cor"
        height="25"
        :rounded="true"
        :value="valor_praga"
        readonly
      >
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

<style>
@media (min-width: 700px) {
  #card-result {
    width: 250px;
    float: left;
  }
}
</style>