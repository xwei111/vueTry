<template>
	<div>
		<p @click="IntegralClick">Integral</p>

		<p @click="handleA">aaaaaaaaaaa</p>
	</div>
</template>

<script>
	export default{
		name:"Integral",
		data(){
			return{
				
			}
		},
		methods:{
			IntegralClick:()=>{
				console.log('thisaaaaaa',this)
			},
			handleA(){
				console.log('thisssss',this)
			}
		}
	}
</script>
<style>
	
</style>
