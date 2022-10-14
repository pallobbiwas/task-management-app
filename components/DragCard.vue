<template>
  <div class="gap">
    <div class="center">
      <div>
        <div style="width: 10%">{{ task.tname }}</div>
      </div>
    </div>
    <!-- <div v-for="(task, i) in tasks" :key="i">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div>
              <p><b>Task name : </b>{{ task.tname }}</p>
              <p><b>Task assign to : </b>{{ task.Assignto }}</p>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <div>
                <div class="flex">
                  <p><b>Under project : </b>{{ task.projectName }}</p>
                  <div>
                    <v-icon> mdi-pencil </v-icon>
                    <v-icon> mdi-eye </v-icon>
                    <v-icon> mdi-delete </v-icon>
                  </div>
                </div>
                <p><b>Task name : </b>{{ task.tname }}</p>
                <p><b>Task assign to : </b>{{ task.Assignto }}</p>
                <p><b>Task deadline : </b>{{ task.desline }}</p>
              </div>
              <div>
                <p><b>Start stage : </b>{{ task.initstage }}</p>
                <p><b>Under project : </b>{{ task.projectName }}</p>
                <p><b>Task Describtion : </b>{{ task.tdescribtion }}</p>
                <p><b>Task created time: </b>{{ task.createdtime }}</p>
                <p><b>Importance : </b>{{ task.importence }}</p>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div> -->
  </div>
</template>
<script>
export default {
  props: ['task'],
}
</script>
<style lang=""></style>
