import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    // headerTit: '',
    yunfeimubanliebiaoPage: 1, //运费模板
    yunfeimubanliebiaoPageSize: 10,
    // 
    redulianjiebiaoPage:1,
    changeYearSy:null,
    startTime:'开始时间',
    endTime:'结束时间',
    sxrqIsStart:true,
    isSmallHeader:false,
    caijiFabuName:'新闻',
    caijiFabuIndex:'',
    addDialogVisible:false,
    isAdd:false,
    syaddDialogVisible:false,
    syisAdd:false,
    sytableIndex:0,
    fabuXinwenPage: 1,
    syStartTime:'',
    syEndTime:'',
    syIndex:0,
    zstTime:'',
    pxIndex:1,
    sySearch:'',
  },
  mutations: {
    sySearch(state, str) {
      state.sySearch = str;
    },
    pxIndex(state, str) {
      state.pxIndex = str;
    },
    zstTime(state, str) {
      state.zstTime = str;
    },
    syIndex(state, str) {
      state.syIndex = str;
    },
    userInfo(state, str) {
      state.userInfo = str;
    },
    redulianjiebiaoPage(state, str) {
      state.redulianjiebiaoPage = str;
    },
    shangpingliebiaoPage(state, str) {
      state.shangpingliebiaoPage = str;
    },
    shangpingliebiaoPageSize(state, str) {
      state.shangpingliebiaoPageSize = str;
    },
    changeYearSy(state, str){
      state.changeYearSy = str;
    },
    syStartTime(state, str){
      state.syStartTime = str;
    },
    syEndTime(state, str){
      state.syEndTime = str;
    },
    startTime(state, str){
      state.startTime = str;
    },
    endTime(state, str){
      state.endTime = str;
    },
    sxrqIsStart(state, str){
      state.sxrqIsStart = str;
    },
    isSmallHeader(state, str){
      state.isSmallHeader = str;
    },
    caijiFabuName(state, str){
      state.caijiFabuName = str;
    },
    caijiFabuIndex(state, str){
      state.caijiFabuIndex = str;
    },
    addDialogVisible(state, str){
      state.addDialogVisible = str;
    },
    isAdd(state, str){
      state.isAdd = str;
    },
    syaddDialogVisible(state, str){
      state.syaddDialogVisible = str;
    },
    syisAdd(state, str){
      state.syisAdd = str;
    },
    sytableIndex(state, str){
      state.sytableIndex = str;
    },
    fabuXinwenPage(state, str){
      state.fabuXinwenPage = str;
    },
  },
  actions: {

  },
});