Vue.options.delimeters = ["<%","%>"];
import { EventBus } from './EventBus.js'
import PieChart from './templates/PieChartComponent'
import LineChartComponent from './templates/LineChartComponent'
import BarChartComponent from './templates/BarChartComponent'
import RatingChartComponent from './templates/RatingChartComponent'
import UserInterface from './templates/UserInterfaceComponent'


const app = new Vue({
  // create your Vue Object
  el: '#main',
  data:{
    regions:{},
    genres:{},
    years:{},
    names:{},
    namelist:[],
    lists:{
      game:[],
      genre:[],
      system:[],
      publisher:[]
    },
    searchOptions:[
      {text:"Genres",value:"genre",selected:true},
      {text:"Systems",value:"system",selected:true},
      {text:"Publishers",value:"publisher",selected:true},
      {text:"Games",value:"game",selected:true}
    ],
    selectedtags:[],
    salesdata:{apples:30,grains:44,banannas:27},
    yeardata:{},
    comparisondata:{},
    chartColors:['#00aeef','#fdc689','#7cc576','#f26d7d','#a186be','#ec008c','#c69c6d','#ed145b','#f26522','#acd373','#aba000','#f5989d'],
    chartTextColor:"#eeeeee",
    ratings:{}
  },
  methods:{
    onUpdateSim:function(){
      var self = this;
      var _params = {};
      for(var i = 0;i<self.$data.selectedtags.length;i++){
        if(_params[self.$data.selectedtags[i].type] == undefined){
          _params[self.$data.selectedtags[i].type] = [];
        }
        _params[self.$data.selectedtags[i].type].push(self.$data.selectedtags[i].text);
      }
      console.log(_params);
      axios.get(UPDATEDATA,{params:_params})
      .then(response => {
        console.log(response.data);

        self.$data.salesdata = response.data.sales;
        self.$data.yeardata = response.data.years;
        self.$data.comparisondata = response.data.subset;
        self.$data.ratings = response.data.ratings;
      })
      //console.log(val);
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      
            axios.get(GETDATA)
            .then(response => {
              console.log(response.data);
              //document.getElementById('main').innerHTML = response.data
              //importedObject = response.data;
              app.regions = response.data.regions;
              app.genres = response.data.genres;
              //console.log(response.data.genres);
              app.years = response.data.years;
              app.names = response.data.names;
              app.lists.game = response.data.namelist;
              app.lists.genre = response.data.genrelist;
              app.lists.system = response.data.systemlist;
              app.lists.publisher = response.data.publisherlist;

              

              app.namelist = {genre:app.lists.genre,system:app.lists.system,publisher:app.lists.publisher,game:app.lists.game};
              app.salesdata = response.data.genres.Puzzle;
              app.onUpdateSim();
              //setTimeout(function(){app.salesdata = response.data.genres.Action;},3000);
              //setTimeout(function(){app.salesdata = response.data.genres.Adventure;},6000);
              //setTimeout(function(){app.salesdata = response.data.genres.Fighting;},9000);
              //setTimeout(function(){app.salesdata = response.data.genres.Puzzle;},12000);
              
              //console.log(app.salesdata);
    
            })


        })

        EventBus.$on('tag-deleted-clicked', val => {
          //console.log('Delet Tag Clicked')
          app.selectedtags.splice(Number(val.getAttribute("tag-index")), 1);
          app.onUpdateSim();
          var namelistCopy = {};
          for(var n in app.namelist){
            namelistCopy[n] = app.namelist[n];
          }
          namelistCopy['p'+Math.random().toString()] = {};
          app.namelist = namelistCopy;
          
        });

        EventBus.$on('search-term-clicked', val => {
          //console.log('Delet Tag Clicked')
          console.log('hello');
          var tagToAdd = {text:val.innerHTML,type:val.getAttribute("class")};
          
          var hasTag = false;
          for(var i = 0;i<app.selectedtags.length;i++){
            if(app.selectedtags[i].text == tagToAdd.text && app.selectedtags[i].type == tagToAdd.type)
            {
              hasTag == true;
            }
          }
          if(!hasTag){
            app.selectedtags.push(tagToAdd);
          }
          
          app.onUpdateSim();
        });

        EventBus.$on('search-option-checked', val => {
          var updatedList = val.checked ? app.lists[val.getAttribute("value")] : [];
          var listMatrix = {};
          for(var n in app.namelist){
            if(n == val.getAttribute("value")){
              listMatrix[val.getAttribute("value")] = updatedList;
            }
            else{
              listMatrix[n] = app.namelist[n];
            }
          }
          
          app.namelist = listMatrix;
        });
        
    }
})



// use axios for xhr
//var importedObject = {};

