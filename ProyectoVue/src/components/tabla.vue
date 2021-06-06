<template>
  <div>
    <b-table striped hover :busy="busy" :items="items" :fields="fields">

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
        </div>
      </template>

      // Bootstrap
      <template #cell(actions)="data">
        <!--<v-container fluid>-->
          <slot name="actions" :item="data"/> 
        <!--</v-container>-->

       
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    items: Array,
    fields: Array,
    busy: Boolean
  },
};
</script>

