import { EventBus } from '../EventBus.js'
Vue.component('check-all',{
    data:function(){
        return {}
    },
    props:['choices'],
    template:`<ul class="check-all">
        <li v-for="c in choices" v-bind:class="c.value" v-bind:style="c.selected ? '' : 'opacity:.5;'">
            <label style="width:100%; display:block;">
                <input type="checkbox" v-model="c.selected" v-bind:value="c.value" v-on:change="onCheckChange" />
                <span v-text="c.text">
                </span>
            </label>
        </li>
    </ul>`,
    methods:{
        onCheckChange:function(e){
            EventBus.$emit('search-option-checked',e.currentTarget);
        }
    }
})

export default {}