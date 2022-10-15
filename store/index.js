export const state = () => ({
  users: [],
  projects: [],
  tasks: [],
  devs: [],
  activeUser: {},
  searchresult: [],
})

export const mutations = {
  addUser(state, user) {
    state.users.push(user)
  },
  addTask(state, task) {
    state.tasks.push(task)
  },
  addDevs(state, dev) {
    state.devs.push(dev)
  },
  setActiveuser(state, au) {
    state.activeUser = au
  },
  removeDev(state, id) {
    state.devs.splice(id, 1)
  },
  addProjects(state, project) {
    state.projects.push(project)
  },
  deleteProjects(state, id) {
    state.projects.splice(id, 1)
  },
  clearActiveUser(state){
    state.activeUser = {}
    console.log('in');
  }
  /* searchbyname(state, name) {
    let singlevalue = state.projects.filter((p) => p.name == name)
    state.searchresult.push(singlevalue)
  }, */
}
