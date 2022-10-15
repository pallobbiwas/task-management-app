<template>
  <v-app>
    <div class="main-box">
      <div>
        <div class="py">
          <v-row>
            <v-col md="5">
              <div class="search-bg">
                <v-row>
                  <v-col md-4>
                    <v-select
                      v-model="searchprojectname"
                      :items="projects"
                      item-text="name"
                      label="Select project"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col md-4>
                    <v-select
                      v-model="searchprojectassign"
                      :items="devs"
                      item-text="devname"
                      label="Select project"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col md-4>
                    <v-select
                      v-model="searchprojectimportance"
                      :items="importance"
                      label="Select Priority"
                      solo
                    ></v-select>
                  </v-col>
                  <!-- <v-col md-4>
                    <button @click="searchbyproject" class="search">
                      Search by project
                    </button>
                  </v-col> -->
                </v-row>
                <button @click="searchbyproject" class="search">
                  Search by project
                </button>
                <button @click="resetSearch" class="search">Reset</button>
              </div>
            </v-col>
            <v-col md="6">
              <div v-for="(e, i) in searchresults" :key="i">
                <v-row class="search-container">
                  <v-col md="6">
                    <div class="box">
                      <h4>Task name: {{ e.taskName }}</h4>
                      <h4>Project name: {{ e.projectName }}</h4>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div>
        <!-- dragable -->

        <template>
          <v-row class="row margit-both gutters">
            <v-col cols="12" sm="6" md="4" class="col-4 drop-box-1">
              <h3>
                Assign <small class="count">{{ assigns.length }}</small>
              </h3>
              <div class="gap"><hr /></div>
              <draggable
                class="dragArea list-group"
                :list="assigns"
                :clone="clone"
                :group="{ name: 'people', pull: pullFunction }"
                @start="start"
                @change="(event) => log(event, 1)"
              >
                <div
                  class="list-group-item"
                  v-for="(element, ind) in assigns"
                  :key="element.id"
                >
                  <template>
                    <div>
                      <v-expansion-panels>
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <div class="cbox">
                              <p><b>Task name : </b>{{ element.taskName }}</p>
                              <p><b>Assign to : </b>{{ element.asignto }}</p>
                            </div>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <div class="flex">
                              <p><b>Task name : </b>{{ element.taskName }}</p>
                              <v-icon @click="details(element)">
                                mdi-eye
                              </v-icon>
                              <v-icon @click="deleteone(ind, 1)">
                                mdi-trash-can
                              </v-icon>
                              <v-icon @click="editItem(ind, 1)">
                                mdi-pencil
                              </v-icon>
                            </div>
                            <p><b>Project : </b>{{ element.projectName }}</p>
                            <p><b>Importance : </b>{{ element.Importance }}</p>
                            <p>
                              <b>Describtion : </b>{{ element.taskDescription }}
                            </p>
                            <p>
                              <b>Created time : </b>{{ element.createdTime }}
                            </p>
                            <p><b>Dead line : </b>{{ element.deadline }}</p>
                            <div>
                              <template>
                                <v-row>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      v-model="endhour"
                                      :counter="10"
                                      label="HH"
                                      required
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      v-model="endmiint"
                                      :counter="10"
                                      label="MM"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <button @click="addend(element)">
                                      Submit
                                    </button>
                                  </v-col>
                                </v-row>
                              </template>
                              <div class="py">
                                <hr />
                              </div>
                              <div>
                                <v-text-field
                                  v-model="adddescription"
                                  counter
                                  maxlength="150"
                                  hint="This field uses maxlength attribute"
                                  label="Limit exceeded"
                                ></v-text-field>
                                <button
                                  @click="addDescrition(element)"
                                  class="search"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                  </template>
                </div>
              </draggable>
            </v-col>

            <v-col cols="12" sm="6" md="4" class="col-4 drop-box-2">
              <h3>
                In-prograss <small class="count">{{ progrss.length }}</small>
              </h3>
              <div class="gap"><hr /></div>
              <draggable
                class="dragArea list-group"
                :list="progrss"
                group="people"
                @change="(event) => log(event, 2)"
              >
                <div
                  class="list-group-item"
                  v-for="(element, ind) in progrss"
                  :key="element.id"
                >
                  <div>
                    <template>
                      <div>
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              <div class="cbox">
                                <p><b>Task name : </b>{{ element.taskName }}</p>
                                <p><b>Assign to : </b>{{ element.asignto }}</p>
                              </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <div class="flex">
                                <p><b>Task name : </b>{{ element.taskName }}</p>
                                <v-icon @click="details(element)">
                                  mdi-eye
                                </v-icon>
                                <v-icon @click="deleteone(ind, 2)">
                                  mdi-trash-can
                                </v-icon>
                                <v-icon @click="editItem(ind, 2)">
                                  mdi-pencil
                                </v-icon>
                              </div>
                              <p><b>Project : </b>{{ element.projectName }}</p>
                              <p>
                                <b>Importance : </b>{{ element.Importance }}
                              </p>
                              <p>
                                <b>Describtion : </b
                                >{{ element.taskDescription }}
                              </p>
                              <p>
                                <b>Created time : </b>{{ element.createdTime }}
                              </p>
                              <p><b>Dead line : </b>{{ element.deadline }}</p>
                              <div>
                                <template>
                                  <v-row>
                                    <v-col cols="12" md="4">
                                      <v-text-field
                                        v-model="endhour"
                                        :counter="10"
                                        label="HH"
                                        required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                      <v-text-field
                                        v-model="endmiint"
                                        :counter="10"
                                        label="MM"
                                        required
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                      <button @click="addend(element)">
                                        Submit
                                      </button>
                                    </v-col>
                                  </v-row>
                                </template>
                                <div>
                                  <v-text-field
                                    v-model="adddescription"
                                    counter
                                    maxlength="150"
                                    hint="This field uses maxlength attribute"
                                    label="Limit exceeded"
                                  ></v-text-field>
                                  <button
                                    @click="addDescrition(element)"
                                    class="search"
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </template>
                  </div>
                </div>
              </draggable>
            </v-col>

            <v-col cols="12" sm="6" md="4" class="col-4 drop-box-3">
              <h3>
                Done <small class="count">{{ done.length }}</small>
              </h3>
              <div class="gap"><hr /></div>
              <draggable
                class="dragArea list-group"
                :list="done"
                group="people"
                @change="(event) => log(event, 3)"
              >
                <div
                  class="list-group-item"
                  v-for="(element, ind) in done"
                  :key="element.id"
                >
                  <div>
                    <template>
                      <div>
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              <div class="cbox">
                                <p><b>Task name : </b>{{ element.taskName }}</p>
                                <p><b>Assign to : </b>{{ element.asignto }}</p>
                              </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <div class="flex">
                                <p><b>Task name : </b>{{ element.taskName }}</p>
                                <v-icon @click="details(element)">
                                  mdi-eye
                                </v-icon>
                                <v-icon @click="deleteone(ind, 3)">
                                  mdi-trash-can
                                </v-icon>
                                <v-icon @click="editItem(ind, 3)">
                                  mdi-pencil
                                </v-icon>
                              </div>
                              <p><b>Project : </b>{{ element.projectName }}</p>
                              <p>
                                <b>Importance : </b>{{ element.Importance }}
                              </p>
                              <p>
                                <b>Describtion : </b
                                >{{ element.taskDescription }}
                              </p>
                              <p>
                                <b>Created time : </b>{{ element.createdTime }}
                              </p>
                              <p><b>Dead line : </b>{{ element.deadline }}</p>
                              <!-- <v-text-field
                                v-model="endtime"
                                label="end"
                                required
                              ></v-text-field>
                              <button @click="addend(element)">ok</button> -->
                              <!-- end method -->
                              <div>
                                <template>
                                  <v-row>
                                    <v-col cols="12" md="4">
                                      <v-text-field
                                        v-model="endhour"
                                        :counter="10"
                                        label="HH"
                                        required
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                      <v-text-field
                                        v-model="endmiint"
                                        :counter="10"
                                        label="MM"
                                        required
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                      <button @click="addend(element)">
                                        Submit
                                      </button>
                                    </v-col>
                                  </v-row>
                                </template>
                                <div>
                                  <v-text-field
                                    v-model="adddescription"
                                    counter
                                    maxlength="150"
                                    hint="This field uses maxlength attribute"
                                    label="Limit exceeded"
                                  ></v-text-field>
                                  <button
                                    @click="addDescrition(element)"
                                    class="search"
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </template>
                  </div>
                </div>
              </draggable>
            </v-col>
          </v-row>
        </template>
      </div>
    </div>
    <!-- details modal -->
    <v-dialog v-model="dialog2" width="700">
      <v-card>
        <div class="details-box">
          <div class="bg-header">
            <div class="flex px-4 my-5">
              <div>
                <h2>ProjectName: {{ detailsArray.projectName }}</h2>
                <h4>Create time: {{ detailsArray.createdTime }}</h4>
                <h4>Dead line: {{ detailsArray.deadline }}</h4>
                <h3>
                  remainig time:
                  <span class="rmain">{{ remainingTime }} Dayes</span>
                </h3>
              </div>
              <div>
                <h3>TasktName: {{ detailsArray.taskName }}</h3>
                <h3>Assign to: {{ detailsArray.asignto }}</h3>
                <h3>Initial state: {{ detailsArray.initstage }}</h3>
              </div>
            </div>
          </div>
          <!-- {{ detailsArray.info }} -->
          <div>
            <DataTable
              v-if="detailsArray.timeinfo"
              :headers="[
                { text: 'Stage', value: 'cStage' },
                { text: 'Spend time', value: 'takeTime' },
                { text: 'Developer', value: 'developer' },
              ]"
              :items="detailsArray.timeinfo"
            ></DataTable>
            <hr />
            <div class="py">
              <!-- <h3>Total time : {{ getMinit }}</h3>
              <h3>Total time : {{ getHour }}</h3> -->
              <h3 class="time-head">Total time : {{ getfulltimehours }}</h3>
              <!-- <h3>Total time : {{ gettotalminit }}</h3> -->
              <!-- <h3>Total time : {{ getTimeValue }}</h3> -->
            </div>
            <div class="change-container">
              <div class="change-container-header">
                <v-row>
                  <v-col md="4">Swtich stage</v-col>
                  <v-col md="8">
                    <div class="ms-10">
                      <v-row>
                        <v-col md="4">Curretn stage</v-col>
                        <v-col md="4">Moving time</v-col>
                        <v-col md="4">Developer</v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div class="stageinfo">
                <v-row>
                  <v-col md="5">
                    <div v-for="(sn, i) in switchInfo" :key="i">
                      <p class="stage-name">{{ sn.infoStage }}</p>
                    </div>
                  </v-col>
                  <v-col md="7">
                    <div
                      class="stage-info"
                      v-for="(sn, i) in detailsArray.info"
                      :key="i"
                    >
                      <p class="stage-valu">{{ sn.stage }}</p>
                      <p class="stage-valu">{{ sn.lastUpdate }}</p>
                      <p class="stage-valu">{{ sn.Developer }}</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
          <div class="py time-head">Last update : {{ duration }}</div>
          <div class="py">
            <div
              class="px-15 comand-box"
              v-for="(e, i) in detailsArray.comand"
              :key="i"
            >
              <v-row>
                <v-col md="2">
                  <v-avatar color="red">
                    <span class="white--text text-h5">{{
                      e.comandName.slice(0, 2)
                    }}</span>
                  </v-avatar>
                </v-col>
                <v-col md="10">
                  <div class="d-flex time-head">
                    <v-icon class="pink white--text"> mdi-timer </v-icon>
                    <h4 class="ms-2">{{ e.time }}</h4>
                  </div>
                  <h3>
                    Comment by
                    <span class="pink px-4 white--text">{{
                      e.comandName
                    }}</span>
                  </h3>
                  <p class="ms-5">
                    {{ e.comandDes }}
                  </p>
                  <!-- post -->
                  <div class="text-end">
                    <button @click="replyBox">...</button>
                    <div v-if="openTextField" class="text-container">
                      <v-text-field
                        v-model="replytext"
                        label="Write your reply"
                      ></v-text-field>
                      <div>
                        <v-btn @click="createReply(e)">Post</v-btn>
                      </div>
                    </div>
                  </div>
                  <!-- reply -->

                  <div v-for="(p, i) in e.reply" :key="i" class="text-ends">
                    <div class="d-flex time-head">
                      <v-icon class="pink white--text"> mdi-timer </v-icon>
                      <h4 class="ms-2">{{ p.time }}</h4>
                    </div>
                    <h3>
                      Comment by
                      <span class="pink px-4 white--text">{{
                        p.postername
                      }}</span>
                    </h3>
                    <p class="ms-5">
                      {{ p.posts }}
                    </p>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="my-5">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h2 class="edit-header">Edit information</h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div
                    class="edit-content mb-5"
                    v-for="(sn, i) in changeinfo"
                    :key="i"
                  >
                    <div>
                      <p class="time-head">
                        Last update :
                        <span>{{ sn.changeTime }}</span>
                      </p>
                      <p class="adde-by">
                        Updae by : by
                        <span>{{ sn.changerName }}</span>
                      </p>
                    </div>
                    <div class="py">
                      <hr />
                    </div>
                    <v-row>
                      <v-col md="7">
                        <div>
                          <p>
                            <b>Present developer : </b>
                            <span>{{ sn.presentDeveloper }}</span>
                          </p>
                          <p>
                            <b>Periveous developer : </b>
                            <span>{{ sn.previosDeveloper }}</span>
                          </p>
                        </div>
                      </v-col>
                      <v-col md="5">
                        <div>
                          <div>
                            <p>
                              <b>Prasent importency : </b>
                              <span>{{ sn.presentImportance }}</span>
                            </p>
                            <p>
                              <b>Previous importency : </b>
                              <span>{{ sn.previosImportance }}</span>
                            </p>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog2 = !dialog2">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- edit dailog -->
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2"> Update </v-card-title>

            <v-select
              v-model="developername"
              :items="devs"
              item-text="devname"
              label="Select Developer"
              solo
            ></v-select>

            <v-select
              v-model="importan"
              :items="importance"
              label="Select importence"
              solo
            ></v-select>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="editItems"> Update </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-app>
</template>

<script>
import draggable from 'vuedraggable'

// import moment from "moment"

export default {
  name: 'IndexPage',
  display: 'Clone on Control',
  instruction: 'Press Ctrl to clone element from list 1',
  data() {
    return {
      searchresults: [],
      importance: ['High', 'Mideam', 'Low'],
      importan: '',
      dialog: false,
      detailsArray: [],
      arrayState: [],
      endtime: '',
      dialog2: false,
      assigns: [],
      progrss: [],
      done: [],
      controlOnStart: true,
      developername: '',
      eval: '',
      eval: '',
      changeinfo: [],
      switchInfo: [],
      endhour: 0,
      endmiint: 0,
      hr: [],
      mi: [],
      searchprojectassign: '',
      searchprojectname: '',
      searchprojectimportance: '',
      importance: ['High', 'Mideam', 'Low'],
      searchAray: [],
      rules: [(v) => v.length <= 25 || 'Max 25 characters'],
      adddescription: '',
      replytext: '',
      openTextField: false,
    }
  },
  mounted() {
    let assig = JSON.parse(localStorage.getItem('vuex'))
    if (assig.tasks) {
      this.assigns = [...assig.tasks]
      this.searchAray = [...assig.tasks]
    }
  },
  computed: {
    duration() {
      let duration = 0
      if (this.detailsArray.info) {
        this.detailsArray.info?.map((p) => {
          duration = p.lastUpdate
        })
      }
      return duration
    },
    getTimeValue() {
      let durationtime = []
      if (this.detailsArray.timeinfo) {
        this.detailsArray.timeinfo?.map((p) => {
          durationtime.push(p.takeTime)
        })
      }
      return durationtime
    },
    splitArray() {
      let numArray = []
      let mi = []
      let hr = []
      if (this.getTimeValue) {
        this.getTimeValue.map((p) => {
          numArray = p.split(' ')
          hr.push(numArray[0])
          mi.push(numArray[2])
        })
      }
      return { hr, mi }
    },
    gettotalhour() {
      let toth = 0
      let totm = 0
      let convertsecond = 0
      if (this.splitArray.hr) {
        this.splitArray.hr.forEach((h) => {
          toth = toth + parseInt(h)
        })
      }
      if (this.splitArray.mi) {
        this.splitArray.mi.forEach((m) => {
          totm = totm + parseInt(m)
        })
      }
      convertsecond = toth * 60 + totm
      return convertsecond
    },
    getfulltimehours() {
      var hours = Math.floor(this.gettotalhour / 60)
      var minutes = this.gettotalhour % 60
      return `${hours} Hours  ${minutes} Minutes`
    },

    remainingTime() {
      let date4 = this.detailsArray.deadline
      let date3 = this.detailsArray.createdTime
      var date13 = new Date(date3)
      var date23 = new Date(date4)

      // To calculate the time difference of two dates
      var Difference_In_Time = date23.getTime() - date13.getTime()

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
      return Difference_In_Days
    },
    users() {
      return this.$store.state.users
    },
    projects() {
      return this.$store.state.projects
    },
    devs() {
      return this.$store.state.devs
    },
    activeUser() {
      return this.$store.state.activeUser
    },
  },
  watch: {
    tasks(vl) {
      vl.forEach((e) => {
        e.currentStage = 'Assign'
      })
    },
    progrss(vl) {
      vl.forEach((e) => {
        e.currentStage = 'In-progress'
      })
    },
    done(vl) {
      vl.forEach((e) => {
        e.currentStage = 'Done'
      })
    },
    arrayState(vl) {
      var pStage = ''
      var cstage = ''
      if (this.arrayState.length == 2) {
        if (this.arrayState[1] == 1 && this.arrayState[0] == 2) {
          pStage = 'Assign'
          cstage = 'In-prgress'
        }
        if (this.arrayState[1] == 1 && this.arrayState[0] == 3) {
          pStage = 'Assign'
          cstage = 'Done'
        }
        if (this.arrayState[1] == 2 && this.arrayState[0] == 1) {
          pStage = 'In-prgress'
          cstage = 'Assign'
        }
        if (this.arrayState[1] == 2 && this.arrayState[0] == 3) {
          pStage = 'In-prgress'
          cstage = 'done'
        }
        if (this.arrayState[1] == 3 && this.arrayState[0] == 1) {
          pStage = 'done'
          cstage = 'Assign'
        }
        if (this.arrayState[1] == 3 && this.arrayState[0] == 2) {
          pStage = 'done'
          cstage = 'In-prgress'
        }
        this.switchInfo.push({ infoStage: `${pStage} to ${cstage}` })
        this.arrayState = []
      }
    },
  },
  methods: {
    replyBox() {
      this.openTextField = true
    },
    createReply(e) {
      let postText = {
        posts: this.replytext,
        postername: e.comandName,
        time: new Date().toISOString().substr(0, 10),
      }
      e.reply.push(postText)
      this.openTextField = false
    },
    addDescrition(item) {
      let comadDetails = {
        comandDes: this.adddescription,
        comandName: item.asignto,
        time: new Date().toISOString().substr(0, 10),
        reply: [],
      }
      item.comand.push(comadDetails)
      this.adddescription = ''
    },
    openDialog(item) {
      this.dialog = !this.dialog
      this.modalTitle = item
    },
    resetSearch() {
      this.searchresults = ''
      this.searchprojectassign = ''
      this.searchprojectname = ''
      this.searchprojectimportance = ''
    },
    searchbyproject() {
      /* console.log(this.searchprojectname, this.searchprojectassign, this.searchprojectimportance); */

      // let searchAray = JSON.parse(localStorage.getItem('vuex'))
      let assig = JSON.parse(localStorage.getItem('vuex'))
      if (assig.tasks) {
        this.searchAray = [...assig.tasks]
      }
      if (
        this.searchprojectname &&
        !this.searchprojectassign &&
        !this.searchprojectimportance
      ) {
        console.log('1')
        const sv = this.searchAray.filter(
          (t) => t.projectName == this.searchprojectname
        )
        this.searchresults = sv
      } else if (
        this.searchprojectname &&
        this.searchprojectassign &&
        !this.searchprojectimportance
      ) {
        console.log('2')
        const sv = this.searchAray.filter(
          (t) =>
            t.projectName == this.searchprojectname &&
            t.asignto == this.searchprojectassign
        )
        this.searchresults = sv
      } else if (
        this.searchprojectname &&
        this.searchprojectassign &&
        this.searchprojectimportance
      ) {
        console.log('3')
        const sv = this.searchAray.filter(
          (t) =>
            t.projectName == this.searchprojectname &&
            t.asignto == this.searchprojectassign &&
            t.Importance == this.searchprojectimportance
        )
        this.searchresults = sv
      }
    },
    /*
    users = users.filter(obj => obj.name == filter.name && obj.address == filter.address)
    */
    /* searchbyproject() {
      console.log(this.searchprojectassign, this.searchprojectname)
      const sv = this.assigns.filter(
        (t) =>
          t.projectName == this.searchprojectname ||
          t.asignto == this.searchprojectassign
      )
      this.searchresults = sv
    }, */
    deleteone(id, val) {
      if (val === 1) {
        this.assigns.splice(id, 1)
      }
      if (val === 2) {
        this.progrss.splice(id, 1)
      }
      if (val === 3) {
        this.done.splice(id, 1)
      }
    },

    addend(item) {
      var cStage = ''
      if (item.currentStage) {
        cStage = item.currentStage
      } else {
        cStage = item.initstage
      }
      item.timeinfo.push({
        developer: item.asignto,
        cStage: cStage,
        takeTime: `${this.endhour} H ${this.endmiint} M`,
      })
      this.endhour = ''
      this.endmiint = ''
    },
    editItem(id, val) {
      this.eid = id
      this.eval = val
      this.dialog = !this.dialog
    },
    editItems() {
      var previosImportance = ''
      var presentImportance = ''
      var previosDeveloper = ''
      var presentDeveloper = ''
      if (this.eval === 1) {
        const editItem = this.assigns.find((e, i) => i == this.eid)
        previosImportance = editItem.Importance
        previosDeveloper = editItem.asignto
        editItem.asignto = this.developername
        editItem.Importance = this.importan
        presentImportance = editItem.Importance
        presentDeveloper = editItem.asignto
        console.log(editItem)
      }
      if (this.eval === 2) {
        const editItem = this.progrss.find((e, i) => i == this.eid)
        previosImportance = editItem.Importance
        previosDeveloper = editItem.asignto
        editItem.asignto = this.developername
        editItem.Importance = this.importan
        presentImportance = editItem.Importance
        presentDeveloper = editItem.asignto
        console.log(editItem)
      }
      if (this.eval === 3) {
        const editItem = this.done.find((e, i) => i == this.eid)
        previosImportance = editItem.Importance
        previosDeveloper = editItem.asignto
        editItem.asignto = this.developername
        editItem.Importance = this.importan
        presentImportance = editItem.Importance
        presentDeveloper = editItem.asignto
        console.log(editItem)
      }
      let chaInfo = {
        presentImportance: presentImportance,
        previosImportance: previosImportance,
        presentDeveloper: presentDeveloper,
        previosDeveloper: previosDeveloper,
        changeTime: new Date().toLocaleString([], { timeZone: 'Asia/Dhaka' }),
        changerName: this.activeUser.username,
      }
      this.changeinfo.push(chaInfo)
      this.dialog = false
    },
    /* ai sei log */
    log: function (evt, value) {
      var today = new Date()
      this.arrayState.push(value)
      if (evt.added) {
        if (value === 1) {
          let details = this.assigns.find((e) => e.id === evt.added.element.id)
          details.info.push({
            stage: 'Assign',
            lastUpdate:
              today.getHours() +
              ':' +
              today.getMinutes() +
              ':' +
              today.getSeconds(),
            Developer: details.asignto,
          })
          console.log(details)
        }
        if (value === 2) {
          let details = this.progrss.find((e) => e.id === evt.added.element.id)
          details.info.push({
            stage: 'In-progress',
            lastUpdate:
              today.getHours() +
              ':' +
              today.getMinutes() +
              ':' +
              today.getSeconds(),
            Developer: details.asignto,
          })
          console.log(details)
        }
        if (value === 3) {
          let details = this.done.find((e) => e.id === evt.added.element.id)
          details.info.push({
            stage: 'Done',
            lastUpdate:
              today.getHours() +
              ':' +
              today.getMinutes() +
              ':' +
              today.getSeconds(),
            Developer: details.asignto,
          })
          console.log(details)
        }
      }
    },
    /*   "pCreatedTime": "Tue Oct 11 2022 12:05:21",
      "pDaedLine": "Tue Oct 19 2022 12:05:21"
          var asiaDhaka = new Date().toLocaleString([], { timeZone: 'Asia/Dhaka' })
        var today = new Date(asiaDhaka) */

    details(id) {
      this.detailsArray = id
      this.dialog2 = !this.dialog2
    },
    clone({
      id,
      projectName,
      taskName,
      taskDescription,
      Importance,
      createdTime,
      asignto,
      info,
      timeinfo,
      initstage,
      comand,
      deadline,
    }) {
      return {
        id,
        projectName,
        taskName,
        taskDescription,
        Importance,
        createdTime,
        asignto,
        info,
        timeinfo,
        initstage,
        comand,
        deadline,
      }
    },
    pullFunction() {
      return this.controlOnStart ? 'clone' : true
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey
    },
  },
  components: { draggable },
}
</script>
<style scoped>
* {
  list-style: none;
}
.main-box {
  text-align: center;
  padding: 10px 20px;
}
.details-box {
  padding: 10px 15px;
  background-color: aliceblue;
}
.box {
  text-align: left;
  padding: 5px 10px;
}
.gap {
  margin: 5px 0;
}
.searchbtn {
  background: green;
  color: white;
}
.create-btn {
  background: green;
  color: white;
  padding: 10px 40px;
  border-radius: 2px;
}
.list-group-item {
  background-color: cornflowerblue;
  margin-bottom: 5px;
  padding: 5px 10px;
}
.margin-top {
  margin-top: 40px;
}
.count {
  background-color: rgb(59, 9, 9);
  color: white;
  padding: 3px 10px;
  border-radius: 25px;
}
.margit-both {
  margin: 40px;
}
.drop-box-3 {
  text-align: left;
  background-color: bisque;
  padding: 5px;
}
.stage-info {
  display: flex;
  justify-content: space-between;
}
.drop-box-1 {
  text-align: left;
  background-color: rgb(151, 117, 76);
  padding: 5px;
}
.drop-box-2 {
  text-align: left;
  background-color: rgb(112, 108, 102);
  padding: 5px;
}
.gap {
  margin: 10px 0;
}
.cbox {
  text-align: left;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.search-btn {
  background: rgb(9, 151, 170);
  color: white;
  padding: 5px 10px;
  border-radius: 2px;
}
.single-project {
  background-color: darkgray;
  margin: 10px 0;
  padding: 8px 10px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.plus-buttn {
  font-size: 30px;
  color: rgb(240, 236, 236);
  cursor: pointer;
}
.plus-buttn:hover {
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}
.pading {
  padding: 10px 8px;
}
.margin-top {
  margin-top: 50px;
}
</style>

<!-- 
      mounted() {
    this.assign = [...this.$store.state.tasks]
  },
 -->
