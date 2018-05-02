import { EventBus } from '../EventBus.js'
Vue.component('tag-list',{
    data:function(){
        return {

        }
    },
    props:['selectedtags'],
    template:`<ul class='tag-list'>
        <li v-for="(s,i) in selectedtags" v-bind:class="s.type">
            <span v-text="s.text">
            </span>
            <span v-bind:tag-index="i" v-on:click="onDeleteClicked">
            </span>
        </li>
    </ul>`,
    methods:{
        onDeleteClicked:function(e){
            EventBus.$emit('tag-deleted-clicked', e.currentTarget);
        }
    }
})

export default {}