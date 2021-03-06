Vue.component('rating-chart',{
    data:function(){
        return {}
    },
    props:['chartdata','text','total','color'],
    template:`<div class="rating-chart" style="position:relative;">
        <div v-bind:style="'position:absolute;height:100%;width:'+((chartdata/total)*100)+'%;background-color:'+color">
        </div>
        <span v-text="text" style="position:relative;"></span>
    </div>`
})