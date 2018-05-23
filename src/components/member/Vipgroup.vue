<template>
	<div>
		<el-upload
		  action="http://localhost:3000/member/uploadImg"
		  list-type="picture-card"
		  :limit='limit'
		  :on-preview="handlePictureCardPreview"
		  :on-success='hanldeSuccess'
		  :file-list='fileList'
		  >
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:"Vipgroup",
		data() {
	      return {
	        dialogImageUrl: '',
	        dialogVisible: false,
	        limit:1,
	        fileList:[{'url':'http://img5.imgtn.bdimg.com/it/u=812586171,724963760&fm=27&gp=0.jpg'}]
	      };
	    },
	    methods: {
	      handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	      },
	      hanldeSuccess(response, file, fileList){

	      	if(response.code==200){
	      		var imgUrl = response.result
	      	}

	      }
	    }
	}
</script>
<style>

</style>
