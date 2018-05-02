import { EventBus } from '../EventBus.js'
Vue.component('search-text',{
    data:function(){
        var dta = {
            //gamenames:this.names,
            searchTerm:"",
            matches:[]
        }
        return dta;
    },
    props:['namelist','excludelist'],
    template:`<div class='search-text'>
        <input type="text" v-on:keyup="onTextEntered" v-model="searchTerm" />
        <ul>
            <li v-for="(m,i) in matches" v-text="m.text" v-bind:match-index="i" v-bind:class="m.listIndex" v-on:click="onSearchTermClicked"></li>
        </ul>
    </div>`,
    methods:{
        onSearchTermClicked:function(e){
            var self = this;
            EventBus.$emit('search-term-clicked',e.currentTarget);
            self.hideMatch(e.currentTarget.getAttribute("match-index"));
        },
        onTextEntered:function(e){
            //console.log(this.names);
            var self = this;
            
            var matches = [];
            console.log("######## exc ########");
            console.log(this.excludelist);
            console.log("######## exc ########");
            console.log("######## nam ########");
            console.log(this.namelist);
            console.log("######## nam ########");
            if(self.$data.searchTerm != ""){
                for(var n in this.namelist){//var i = 0; i<this.namelist.length;i++){

                    for(var j = 0;j<this.namelist[n].length;j++){
                        if(this.namelist[n][j].toLowerCase().split(self.$data.searchTerm.toLowerCase()).length>1 && !this.excludelist.includes(this.namelist[n][j])){
                            matches.push({ text:this.namelist[n][j], listIndex:n });
                        }
                    }
                    
                }
            }
            
            //console.log(matches);
            self.$data.matches = matches;
            
        },
        hideMatch:function(index){
            var self = this;
            self.$data.matches.splice(index,1);
            setTimeout(function(){self.onTextEntered();},40);
        }
    },
    watch:{
        namelist:function(){
            console.log("udpated name list");
            var self = this;
            self.onTextEntered();
        }
    }
});

export default {}