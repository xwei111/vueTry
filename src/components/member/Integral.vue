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
				console.log('this1',this)
			},
			handleA(){
				console.log('this2',this)
			}
		}
	}
</script>
<style scoped>
	
</style>
