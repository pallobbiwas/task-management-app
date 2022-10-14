<template lang="">
  <div class="home-container">
    <div>
      <h2>Nextive solution</h2>
    </div>

    <div class="content-container">
      <template>
        <v-container class="grey lighten-5">
          <v-row gutters>
            <!-- curent developer -->
            <v-col cols="12" sm="6" md="4">
              <v-card class="pa-2" outlined tile>
                <div class="box-1">
                  <div class="py">
                    <div class="flex pb-4">
                      <h3>Create a Developer</h3>
                      <v-icon @click="dialog3 = !dialog3" class="create-b">
                        mdi-plus-thick
                      </v-icon>
                    </div>
                    <hr />
                  </div>
                  <ul v-for="(dev, i) in devs" ::key="i">
                    <li class="developer">
                      <div class="flex">
                        <div>
                          <span>Name : {{ dev.devname }}</span>
                          <br />
                          <span>Position : {{ dev.title }}</span>
                        </div>
                        <div>
                          <v-avatar color="red">
                            <span class="white--text text-h5">{{
                              dev.devname.slice(0, 2)
                            }}</span>
                          </v-avatar>
                          <v-icon @click="deletdev(i)"> mdi-trash-can </v-icon>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </v-card>
            </v-col>
            <!-- create project -->
            <v-col cols="12" sm="6" md="4">
              <v-card class="pa-2" outlined tile>
                <div class="box-2">
                  <div class="py c-header">
                    <div class="flex pb-4">
                      <h3>Create Project</h3>
                      <v-icon @click="openModal" class="create-b">
                        mdi-plus-thick
                      </v-icon>
                    </div>
                    <hr />
                  </div>
                </div>
              </v-card>
            </v-col>
            <!-- show project list -->
            <v-col cols="12" sm="6" md="4">
              <v-card class="pa-2" outlined tile>
                <div class="box-3">
                  <div class="py">
                    <div class="pb-4">
                      <h3>Youer All projects {{ projects.length }}</h3>
                    </div>
                    <hr />
                  </div>
                  <div class="">
                    <div v-for="(project, ind) in projects">
                      <div class="project-list flex">
                        <div>
                          <p><b>Name : </b>{{ project.name }}</p>
                          <p><b>Create time : </b>{{ project.date }}</p>
                          <p><b>Project Id : </b>{{ project.id }}</p>
                        </div>
                        <div>
                          <v-icon @click="openModal2(project)" class="create-b">
                            mdi-plus-thick
                          </v-icon>
                          <v-icon
                            @click="deleteProject(ind)"
                            class="red white--text pointer ms-2"
                          >
                            mdi-trash-can
                          </v-icon>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <!-- dialog for developer -->
        <template>
          <div class="text-center">
            <v-dialog v-model="dialog3" width="500">
              <v-card>
                <div class="px">
                  <v-text-field
                    v-model="createdeveloper"
                    label="Create dev"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="dagicnation"
                    label="Dev dagicnation"
                    required
                  ></v-text-field>
                </div>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="createdev">
                    create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>
        <!-- dialog -->
        <template>
          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Create a project
                </v-card-title>
                <div class="px">
                  <v-text-field
                    v-model="projectName"
                    label="Project name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="projectDescribtion"
                    label="Project describtion"
                    required
                  ></v-text-field>
                </div>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="createProject">
                    create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>
        <!-- second modal -->

        <template>
          <div class="text-center">
            <v-dialog v-model="dialog2" width="500">
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Create a Task
                </v-card-title>
                <div class="px">
                  <v-text-field
                    v-model="taskName"
                    label="task name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="taskDescribtion"
                    label="task describtion"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="importan"
                    :items="importance"
                    label="Select importence"
                    solo
                  ></v-select>

                  <v-select
                    v-model="developername"
                    :items="devs"
                    item-text="devname"
                    label="Select Developer"
                    solo
                  ></v-select>

                  <template>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Set deadline"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                    <v-spacer></v-spacer>
                  </template>
                </div>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="createTask">
                    create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      dialog2: false,
      dialog3: false,
      createdeveloper: '',
      dagicnation: '',
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      projectDescribtion: '',
      projectName: '',
      date: '',
      id: 0,
      taskid: 0,
      importance: ['High', 'Mideam', 'Low'],
      taskName: '',
      taskDescribtion: '',
      developername: '',
      date: '',
      importan: '',
      singleProducts: [],
    }
  },
  computed: {
    devs() {
      return this.$store.state.devs
    },
    projects() {
      return this.$store.state.projects
    },
  },
  methods: {
    createdev() {
      const dev = { devname: this.createdeveloper, title: this.dagicnation }
      this.$store.commit('addDevs', dev)
      this.dialog3 = false
    },
    deletdev(id) {
      this.$store.commit('removeDev', id)
    },
    openModal() {
      this.dialog = !this.dialog
    },
    openModal2(item) {
      this.dialog2 = !this.dialog2
      this.singleProducts = item
    },
    createProject() {
      this.id = this.id + 1
      let project = {
        id: this.id,
        name: this.projectName,
        describtion: this.projectDescribtion,
        date: new Date().toISOString().substr(0, 10),
      }
      this.$store.commit('addProjects', project)
      this.$toast.success('Successfully added')
      this.dialog = false
    },
    createTask() {
      this.taskid = this.taskid + 1
      let tasks = {
        id: this.taskid,
        projectName: this.singleProducts.name,
        taskName: this.taskName,
        taskDescription: this.taskDescribtion,
        Importance: this.importan,
        createdTime: new Date().toISOString().substr(0, 10),
        asignto: this.developername,
        info: [],
        deadline: this.date,
        timeinfo: [],
        comand:[],
        initstage: 'stage 1',
      }
      this.$store.commit('addTask', tasks)
      this.$toast.success('Successfully added')
      this.dialog2 = false
    },
    deleteProject(id) {
      this.$store.commit('deleteProjects', id)
    },
  },
}
</script>
<style scoped>
* {
  list-style: none;
}
p {
  margin: 0;
}
.pointer {
  cursor: pointer;
  border-radius: 5px;
}
.create-b {
  background-color: rgb(10, 6, 243);
  color: white;
  border-radius: 4px;
}
.home-container {
  background-color: beige;
  padding: 20px 40px;
}
.project-list {
  background-color: rgb(14, 85, 62);
  margin-bottom: 5px;
  padding: 4px 10px;
  color: white;
  border-radius: 5px;
}
h2 {
  color: rgb(10, 161, 111);
  font-size: 40px;
  font-weight: bolder;
  width: 500px;
  border-bottom: 2px solid rebeccapurple;
}
.box-1 {
  background-color: darkgoldenrod;
  padding: 10px 8px;
}
.box-2 {
  background-color: rgb(53, 68, 153);
  padding: 10px 8px;
}
.box-3 {
  background-color: rgb(184, 11, 92);
  padding: 10px 8px;
}
.developer {
  background-color: aquamarine;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
