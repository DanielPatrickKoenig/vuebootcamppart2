import SearchText from './SearchTextComponent'
import TagListComponent from './TagListComponent'
import CheckAllComponent from './CheckAllComponent'

Vue.component('user-interface',{
    data:function(){
        return {
            open:false
        };
    },
    props:['searchoptions','namelist','selectedtags'],
    template:`<div v-bind:class="open ? 'user-interface open' : 'user-interface' ">
        <label class='open-toggle'><input type='checkbox' v-model="open" /><span>FILTERS</span></label>
        <div>
            <check-all :choices="searchoptions"></check-all>
            <search-text :namelist="namelist" :excludelist="getExcludeList(selectedtags)"></search-text>
            <tag-list :selectedtags="selectedtags"></tag-list>
        </div>
    </div>`,
    methods:{
        getExcludeList:function(el){
            var outList = [];
            for(var i = 0;i<el.length;i++){
                outList.push(el[i].text);
            }
            return outList;
        }
    }
})

export default {}