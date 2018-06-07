import {upDate,add,search,deLete} from './doSomethings.js';
import {myDB} from './myDB.js';
import store from '../store';

var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

if(!indexedDB){
	alert("你的浏览器不支持IndexedDB")
}

function openDB(myDB) {
	const p = new Promise((resolve,reject)=>{
		var version=myDB.version || 1;//版本默认1应为整数
		var request = indexedDB.open(myDB.name,version);//打开或创建数据库
		// 连接失败
		request.onerror=(e)=>{
			reject(e.currentTarget.error.message)
		}
		// 链接成功
		request.onsuccess=(e)=>{
			myDB.db = e.target.result;//indexedDB对象
			resolve('success')
		}
		//  只能请求>=当前数据库版本号的版本
        //  大于当前版本号, 则触发 onupgradeneeded, 
        //  小于当前版本号，则触发 onerror
        request.onupgradeneeded=(e)=>{
        	var req=e.target.result;
        	if(!req.objectStoreNames.contains(myDB.objStore)){
                var store=req.createObjectStore(myDB.objStore,{keyPath:'id'});

                store.createIndex('idIndex','id',{unique:true})
                store.createIndex('nameIndex','name',{unique:false})
                store.createIndex('ageIndex','age',{unique:false})
				store.createIndex('sexIndex','sex',{unique:false})
				store.createIndex('allIndex1',['name','sex'],{unique:false})
				store.createIndex('allIndex2',['name','age'],{unique:false})
				store.createIndex('allIndex3',['sex','age'],{unique:false})
				store.createIndex('allIndex4',['name','sex','age'],{unique:false})
            }
            console.log('DB version changed to '+version);
        }

	})
	return p;
}

// 保存数据
export const addData=()=>{
	openDB(myDB)
		.then((result)=>{
			add(myDB.db,myDB.objStore)
		})
		.catch((error)=>{
			console.log('error',error)
		})
}

// 新增或者更新数据
export const updateData=(data)=>{
	const proupdate = new Promise((resolve,reject)=>{
		openDB(myDB)
			.then((result)=>{
				
				if(data.id||data.id==0){
					var objData={
						id:data.id,
						name:data.name,
						sex:data.sex,
						age:data.age,
					}
					
					upDate(myDB.db,myDB.objStore,objData)
					resolve('success')
				}else{
					search(myDB.db,myDB.objStore,'idIndex')
						.then((rst)=>{
							var id =rst.length? Number(Number(rst[rst.length-1].id)+1):0;
							data.id=id;
							var objData={
								id:data.id,
								name:data.name,
								sex:data.sex,
								age:data.age,
							}
							upDate(myDB.db,myDB.objStore,objData)
							resolve('success')
						})
				}
				
			})
			.catch((error)=>{
				console.log('error',error)
			})
	})

	return proupdate;
	
}

// 查询数据
export const searchData=async (byWhich,searchObj)=>{
	const pro =new Promise((resolve,reject)=>{
		openDB(myDB)
			.then((result)=>{
				search(myDB.db,myDB.objStore,byWhich,searchObj)
					.then((data)=>{
						if(!searchObj){
							// store.commit('SET_SEARCHDB',data);
							resolve(data)
						}else{
							resolve(data)
						}
						
					})
			})
			.catch((error)=>{
				console.log('error',error)
			})
	})
	return pro
}

// 删除
export const deleteData=(id)=>{
	const prodele = new Promise((resolve,reject)=>{
		openDB(myDB)
			.then((result)=>{
				deLete(myDB.db,myDB.objStore,id)
				resolve('success')
			})
			.catch((error)=>{
				console.log('error',error)
			})
	})
	return prodele;
}


