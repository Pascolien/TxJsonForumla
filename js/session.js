var result;

function Get_sID_Tree(){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		dataType:'script',
		async:false,
		cache:false,
		data:{
			sFunction_Name:"Get_sID_Tree"
		},
		success:function(data){
			result = data;
		}
	});
	return result;
}

function Set_sID_Tree(AsID_Tree){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Set_sID_Tree",
			sid_tree:AsID_Tree
		}
	});
}


function Get_ID_OT(){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		dataType:'script',
		async:false,
		cache:false,
		data:{
			sFunction_Name:"Get_ID_OT"
		},
		success:function(data){
			result = data;
		}
	});
	return result;
}

function Set_ID_OT(AID_OT){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Set_ID_OT",
			id_ot:AID_OT
		}
	});
}

function Get_ID_Object(AIndex){
	if (!AIndex)
		AIndex = "";
	new J.ajax({
		url:AIndex+'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Get_ID_Object"
		},
		success:function(data){
			result = data;
		}
	});
	return result;
}

function Set_ID_Object(AIDs_Object){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Set_ID_Object",
			id_object:AIDs_Object
		}
	});
}

function Get_ID_Tab(){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Get_ID_Tab"
		},
		success:function(data){
			result = data;
		}
	});
	return result;
}

function Set_ID_Attribute(AID_Attribute){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Set_ID_Attribute",
			id_attribute:AID_Attribute
		}
	});
}

function Get_View(){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Get_View"
		},
		success:function(data){
			result = data;
		},
		error:function(a,b,c){
		}
	});
	return result;
}

function Set_View(AView){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'html',
		data:{
			sFunction_Name:"Set_View",
			view:AView
		}
	});
}

function Get_RW_Mode(){
	var test;
	
	if (Check_IE()){
		new J.ajax({ 
			url:'../asp/ajax/initialize_session_variable.asp',
			async: false,
			cache:false,
			dataType:'script',
			data:{
				sFunction_Name:"Get_RW_Mode"
			},
			success:function(data){
				test = data;
				return test;
			}
		});
	} else {
		new J.ajax({
			url:'../../code/asp/ajax/initialize_session_variable.asp',
			async: false,
			cache: false,
			dataType:'html',
			data:{
				sFunction_Name:"Get_RW_Mode"
			},
			success:function(data){
				test = data;
			}
		});
	}
	return test;
}

function Set_RW_Mode(ARW_Mode){
	new J.ajax({
		url:'../../code/asp/ajax/initialize_session_variable.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Set_RW_Mode",
			rw_mode:ARW_Mode
		}
	});
}
