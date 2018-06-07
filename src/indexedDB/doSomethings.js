const data=[{
	id:0,
	name:'xw',
	sex:1,
	age:20
},{
	id:1,
	name:'zy',
	sex:0,
	age:18
},{
	id:2,
	name:'gz',
	sex:1,
	age:19
}];

// 保存数据
export const add=(db,storeName)=>{
    var transaction=db.transaction(storeName,'readwrite'); 
    var store=transaction.objectStore(storeName); 

    for(var i=0;i<data.length;i++){
        store.add(data[i]);
    }
}

// 新增或者更新数据
export const upDate=(db,storeName,data)=>{
	var transaction=db.transaction(storeName,'readwrite'); 
    var store=transaction.objectStore(storeName); 
    store.put(data); 
}


// 查询数据
export const search=async (db,storeName,byWhich,searchObj)=>{
    var transaction=db.transaction(storeName,'readwrite'); 
    var store=transaction.objectStore(storeName);
    var index = store.index(byWhich);
    var req=index.openCursor(searchObj);
    const arry = await getAry(req)
    return arry;
}

function getAry(req){
    var ary=[];
    const p =new Promise((resolve,reject)=>{
        req.onsuccess=(e)=>{
            var cursor = e.target.result;
            if(cursor){
                var currentStudent=cursor.value;
                ary.push(currentStudent)
                cursor.continue();
            }else{
                resolve(ary)
            }
        }
    }) 
    return p;
}

// 删除
export const deLete= (db,storeName,id)=>{
    var transaction=db.transaction(storeName,'readwrite'); 
    var store=transaction.objectStore(storeName);
    store.delete(id)
}
