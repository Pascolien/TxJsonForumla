var JS_Picture_Name;
var JS_Selection;

// Load the URL of the picture and insert the picture into the editor
function Insert() {

	var elm = parent.tinymce.activeEditor.selection.getNode();			
		 
	var LinkName = document.getElementById("src").value;
	
	var LinkName= LinkName.replace("../../../", "../../");
	var title = document.getElementById("title").value;
	var description = document.getElementById("alt").value;
	
	var h = document.getElementById("h").value;
	var w = document.getElementById("w").value;
	var al = document.getElementById("align").value;
	
	elm2 = parent.tinymce.activeEditor.dom.getParent(elm, 'img');
	if (elm2 == null) {
		var elementCreated = parent.tinymce.activeEditor.dom.createHTML('img', {src: LinkName,  width : w, align: al, title: title, alt: description});
		parent.tinymce.activeEditor.selection.setContent(elementCreated);
	}else{
		var newElement = parent.tinymce.activeEditor.dom.create('img', {src:LinkName, width : w, align : al, title: title, alt: description});
		parent.tinymce.activeEditor.dom.replace(newElement, elm2);
	}
	CloseTinyPop();
} 

// Return the true dimensions of the picture
function ReturnTrueHeight() {
	var tmp_img = new Image();
	tmp_img.src= src.value;
	tmp_img.onload= function(){ 
		return height = this.height;
	} 
}
	
function ReturnTrueWidth() {
	var tmp_img = new Image();
	tmp_img.src= src.value;
	tmp_img.onload= function (){ 
		return width = this.width;
	}
}

// Proportion of the picture is controlled while changing its dimensions 
function changeHeight() {
	var constrain = document.getElementById("constrain");
	var h = document.getElementById("h");
	var w = document.getElementById("w");
	var w_hidden = document.getElementById("w_hidden");
	var h_hidden = document.getElementById("h_hidden");
	var tp ;

	if (w.value == "" || h.value == "")
		return;

	if (constrain.checked) {
		tp = (parseInt(w.value) / parseInt(w_hidden.value)) *parseInt(h_hidden.value);
		h.value = tp.toFixed(0);		
	}
}
	

function changeWidth() {
	var constrain = document.getElementById("constrain");
	var h = document.getElementById("h");
	var w = document.getElementById("w");
	var w_hidden = document.getElementById("w_hidden");
	var h_hidden = document.getElementById("h_hidden");
	var tp ;
	
	if (w.value == "" || h.value == "")
		return;
				
	if (constrain.checked) {
		tp = (parseInt(h.value) / parseInt(h_hidden.value)) * parseInt( w_hidden.value);
		w.value = tp.toFixed(0);
	}
}
	
// Load informations about the picture
function LoadImgInformation() {
			// Get src path 
	var elm = parent.tinymce.activeEditor.selection.getNode();			
	var srcValue = parent.tinymce.activeEditor.dom.getAttrib(elm,'src');
	var titleValue = parent.tinymce.activeEditor.dom.getAttrib(elm,'title');
	var descValue = parent.tinymce.activeEditor.dom.getAttrib(elm,'alt');
	var heightValue = parent.tinymce.activeEditor.dom.getAttrib(elm,'height');
	var widthValue = parent.tinymce.activeEditor.dom.getAttrib(elm,'width');
	if (srcValue != ''){
		var src = document.getElementById('src');		
		// Replace ../../ by ../../../
		var srcValue= srcValue.replace("../../", "../../../");
		J("#src").val(srcValue);
		J("#title").val(titleValue);
		J("#alt").val(descValue);

		document.getElementById("prev").innerHTML = "";
		var img = document.createElement("img");
		
		img.setAttribute("src",srcValue);
		img.setAttribute("width","330px");
		img.setAttribute("height","195px");
		document.getElementById("prev").appendChild(img); 
		// Launch function which fills the preview
		
		var tmp_img = new Image();
		tmp_img.src= src.value;
		tmp_img.onload= function(){ 
			width = this.width;
			height = this.height;

			J("#w").attr("value", widthValue);
			J("#h").attr("value", heightValue);
			
			J("#w_hidden").attr("value", width);
			J("#h_hidden").attr("value", height);
		}
		
	}
} 	
	

// Initializing DHTMLX Tabbar  for the insertion of pictures
function Int_Tabs(){
	dhxTabbar=new dhtmlXTabBar("a_tabbar","top");
	dhxTabbar.setImagePath("../../../resources/theme/img/dhtmlx/tabbar/");
	dhxTabbar.addTab("tab1",RS_Tab1,"100px");
	dhxTabbar.addTab("tab2",RS_Tab2,"100px");
	dhxTabbar.addTab("tab3",RS_add_link,"100px");
	dhxTabbar.enableAutoSize(true, true);
	dhxTabbar.setContent("tab1","a1");
	dhxTabbar.setContent("tab2","a2");
	dhxTabbar.setContent("tab3","a3");

// Hide the third tab 'Image Cliquable' 
	dhxTabbar.hideTab("tab3", false); 
	dhxTabbar.setTabActive("tab1");
	dhxTabbar.attachEvent("onTabClick", function(id){

	if (id=="tab2"){
		var ed = parent.tinymce.activeEditor.windowManager.windows[0];
		var width = '880';
		var height = '290';
		ed.resizeTo(width,height); 
		dhxTabbar.enableAutoSize(true, true);
		document.getElementById("table").style.marginRight = "1px";
	}
	
	if (id=="tab1"){
		var ed = parent.tinymce.activeEditor.windowManager.windows[0];
		var width = '780';
		var height = '537';
		ed.resizeTo(width,height); 
		dhxTabbar.enableAutoSize(true, true); 
		document.getElementById("table").style.marginRight = "18px";
	}
		
	if (id=="tab3") {  
		var ed = parent.tinymce.activeEditor.windowManager.windows[0];
		var width = '900';
		var height = '700';
		ed.resizeTo(width,height); 
		dhxTabbar.enableAutoSize(true, true); }
	});
}

// Change the appearance of the picture
function changeappearance() {
	var selection = document.getElementById("align").value;
	var img = document.getElementById("myImg");
	img.setAttribute("align",selection);
}


// Close the TinyMCE Popup 
function CloseTinyPop(){
    parent.tinymce.activeEditor.windowManager.windows[0].close();
} 


// Launch function for preview
function showPreviewImage() {
	document.getElementById("prev").innerHTML = "";
	var img = document.createElement("img");
	var src = document.getElementById('src');
    img.setAttribute("src",src.value);
	img.setAttribute("width","330px");
	img.setAttribute("height","195px");
	document.getElementById("prev").appendChild(img); 

	var tmp_img = new Image();
	tmp_img.src = src.value;
	tmp_img.onload = function (){ 
		largeur = this.width;
		hauteur = this.height;

		J("#w").attr("value", largeur);
		J("#h").attr("value", hauteur);
		
		J("#w_hidden").attr("value", largeur);
		J("#h_hidden").attr("value", hauteur);				
	}
}

// Launch function for the list of pictures
function selection(){
	var filename = JS_Picture_Name.replace(/^.*\\/, "");
	var ext = filename.substr(filename.lastIndexOf('.') + 1);	
	filename=filename.substring(0, filename.indexOf("."+ext));
	//alert("Filename : " +filename);
	
	var x = "_"+Math.floor((Math.random() * 999) + 1);
	var LastFileName = filename+x+"."+ext;
	//alert("LastFileName : "+LastFileName);
	Save_NameFile(LastFileName);
	var ServerPath = "../../../Pictures/";
	JS_Selection = ServerPath+LastFileName;
	
	self.parent.document.forms[0].elements['src'].value=JS_Selection;
	Save_PathFile(JS_Selection);
}


function Save_PathFile(AJS_Picture_Name){	
	new J.ajax({
		url:'ajax_wrapper.asp',
		dataType:'html',
		async: false,
		cache: false,
		data:{	
			sFunction_Name:"Save_PathFile",
			JS_Selection:AJS_Picture_Name
		}
	})
	return true;
}

function Save_NameFile(AFileName){	
	new J.ajax({
		url:'ajax_wrapper.asp',
		dataType:'html',
		async: false,
		cache: false,
		data:{	
			sFunction_Name:"Save_NameFile",
			FileName:AFileName
		}
	})
	return true;
}

// Functions for the third tab which is hidden
/* function updated(element) {
	   var idx=element.selectedIndex;
	   var val=element.options[idx].value;
	   var content=element.options[idx].innerHTML;

	
if (val=="internal_link") { 
		document.getElementById('intern').style.display = 'block';
		document.getElementById('extern').style.display = 'none';
		var ed = parent.tinymce.activeEditor.windowManager.windows[0];
		var width = '900';
		var height = '570';
		ed.resizeTo(width,height);
		dhxTabbar.enableAutoSize(true, true); 
	} 
	
if (val=="external_link") { 
	document.getElementById('extern').style.display = 'block';
	document.getElementById('intern').style.display = 'none';
	var ed = parent.tinymce.activeEditor.windowManager.windows[0];
	var width = '850';
	var height = '390';
	ed.resizeTo(width,height);
	dhxTabbar.enableAutoSize(true, true); 
	} 
	
	
}

function TreeInit(AID_Object_checked){
			ID_Object_checked = AID_Object_checked;
			ID_Object_checked = 0;
			Initialize_TxWebCombo("../../../resources/theme/img/dhtmlx/combo/");
			Initialize_TxWebTree();
			
			sComboName = Add_ComboOT("id_div_combo",300,100,1,"Toute la base");
			dhxCombo = eval(sComboName);
	}
	
	function Custom_Combo_OnChange(){
	dhxCombo.attachEvent("onChange",function(){
		if (dhxTree)
			dhxTree.destructor();
			
		ID_OT = parseInt(dhxCombo.getSelectedValue());
		
		if (ID_OT == 0){
			//cas de l'arbre dans toute la base
			sTreeName = Add_ObjTree(ID_OT,"id_div_tree","id_div_toolbar","100","100",2,0,0,0,0,1,ID_Object_checked)
			dhxTree = eval(sTreeName);
		} else {
			sTreeName = Add_ObjTree(ID_OT,"id_div_tree","id_div_toolbar","100","100",2,0,0,0,1,1,ID_Object_checked)
			dhxTree = eval(sTreeName);
		}	

	});
} */

/* function Custom_OnCheck(){
	J("#entityText").val(dhxTree.getItemText(dhxTree.getAllChecked()));
} */


/* function InsertInternalLink() {

	var elm = parent.tinymce.activeEditor.selection.getNode();			
		 
		var LinkName = document.getElementById("src").value;
		var h = document.getElementById("h").value;
		var w = document.getElementById("w").value;
		var al = document.getElementById("align").value;
		
		var id_object_Value = document.getElementById("ID_Object").value;
		var onMouseOverAction = "this.style.cursor='hand';";
		var onClickAction = "javascript:navigation(0,"+id_object_Value+",'read_form');";
		
		elm2 = parent.tinymce.activeEditor.dom.getParent(elm, 'img');
		if (elm2 == null) {
		
			var elementCreated = parent.tinymce.activeEditor.dom.createHTML('img', {src: LinkName, 'onclick' :onClickAction, height: h, width : w, align: al,'id_object':id_object_Value, 'onmouseover':onMouseOverAction});
			
			parent.tinymce.activeEditor.selection.setContent(elementCreated);
		}else{
		
			var newElement = parent.tinymce.activeEditor.dom.create('img', {src:LinkName,  'onclick' :onClickAction, height: h, width : w, align : al,'id_object':id_object_Value, 'onmouseover':onMouseOverAction});
			
			parent.tinymce.activeEditor.dom.replace(newElement, elm2);
		}
		 CloseTinyPop();


}

function InsertExternalLink() {

		var elm = parent.tinymce.activeEditor.selection.getNode();			
		 
		var LinkName = document.getElementById("src").value;
		var h = document.getElementById("h").value;
		var w = document.getElementById("w").value;
		var al = document.getElementById("align").value;
		var url = document.getElementById('extern_link').value;
		
		var id_object_Value = document.getElementById("ID_Object").value;
		var onMouseOverAction = "this.style.cursor='hand';";
		//var onClickAction = "window.open('http://www.smkproduction.eu5.org','_blank');";
		var onClickAction = "window.open('"+url+"','_blank');";

		elm2 = parent.tinymce.activeEditor.dom.getParent(elm, 'img');
		//if checkbox ok  ajout de l'image ou rempalcement avec le lien on click
		add_link = document.getElementById('add_link');
		if (add_link.checked) {
			if (elm2 == null) {
				var elementCreated = parent.tinymce.activeEditor.dom.createHTML('img', {src: LinkName, 'onclick':onClickAction, height: h, width : w, align: al,'onmouseover':onMouseOverAction});
				parent.tinymce.activeEditor.selection.setContent(elementCreated);
			}else{
				var newElement = parent.tinymce.activeEditor.dom.create('img', {src:LinkName,  'onclick':onClickAction, height: h, width : w, align : al, 'onmouseover':onMouseOverAction});
				parent.tinymce.activeEditor.dom.replace(newElement, elm2);
			}	 
		}
		// Sinon, si pas ok,   ajout de l'image ou rempalcement sans le lien on click
		else{
			if (elm2 == null) {
				var elementCreated = parent.tinymce.activeEditor.dom.createHTML('img', {src: LinkName, height: h, width : w, align: al,'onmouseover':onMouseOverAction});
				parent.tinymce.activeEditor.selection.setContent(elementCreated);
			}else{
				var newElement = parent.tinymce.activeEditor.dom.create('img', {src:LinkName,  height: h, width : w, align : al, 'onmouseover':onMouseOverAction});
				parent.tinymce.activeEditor.dom.replace(newElement, elm2);
			}
		}
		 CloseTinyPop();
} */
