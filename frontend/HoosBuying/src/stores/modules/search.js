
const state = {
    selected_tags: [],
};
const getters = {
    // StateTags:state => state.selected_tags,
    allTags: state => {
        return state.selected_tags
    }
};
const actions = {
  
};

const mutations = {
    changeTags(state, tag_id){
        console.log("pushing", tag_id)
        // const index = state.selected_tags.indexOf(tag_id);
        // console.log("state index is", index);
        // if (index >= 0) { //if tag is in, remove
        //     state.selected_tags.splice(index, 1);
        // }
        // else{ // if tag not in, add
        //     state.selected_tags.push(tag_id);
        // }
        state.selected_tags.push(tag_id);
        state.selected_tags = state.selected_tags.filter((item, index) => state.selected_tags.indexOf(item) === index);
        console.log("new state is", state.selected_tags)
    },
    removeTag(state, tag_id) {
        const index = state.selected_tags.indexOf(tag_id);
        if (index > 0) {
            state.selected_tags.splice(index, 1)
        }
    },
    clearTags(state) {
        state.selected_tags = []
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};