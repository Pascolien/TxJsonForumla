// JavaScript Document

function select_valeur_cmb(obj1, obj2) {
	J("#"+obj1).html(J(obj2).html());

	ID_TE_cmb = J(obj2).attr("ident");
	document.form1.id_te.value = ID_TE_cmb;

	J('#div_treeviewE').html(RS_JS_Chargement + ' ...');

	// Chargement du de la liste des PE Courbes
	new J.ajax({
		url:'../../code/asp/ajax/actions_Treeview.asp',
		async: false,
		cache: false,
		data: { 
			sFunction_Name :"Get_HTML_TreeviewPE_Curves",
			id_te: ID_TE_cmb 
		},
		success:function(data){
			J('#id_pe_courbe').html(data);
		}
	});
	ChangementPE(document.form1.id_pe_courbe.value);
}

function Exporter() {
	Visualiser();	
}

function Load_EntityPopup() {
	return false;
}

function ChangementPE(id_pe) {
	// Chargement du nouveau treeviewE
	if (J('#id_pe_courbe').html() != '') {
		new J.ajax({
			url:'../../code/asp/ajax/load_treeview_object_export.asp',
			async: false,
			cache: false,
			data: { id_te: ID_TE_cmb, type_vue: 2, id_pe: id_pe, folder_selectable: false },
			success:function(data){
				J('#div_treeviewE').html(data);
			}
		});
	} else {
		J('#div_treeviewE').html('<div class="treeview_liste">'+ RS_JS_Pas_de_Courbe +'</div>');
	}
}

function Visualiser() {
	var List_ID_Objects_Checked;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		dataType:'script',
		async: false,
		cache: false,
		data:{
			sFunction_Name:"Get_ID_Objects_Checked_Curves"
		},
		success:function(data){
			J("#id_div_waiting_message").css("display","block");
			J("#id_div_refresh_curves").css("display","none");
			List_ID_Objects_Checked = data;
			Jn("id_objects_checked").eq(0).val(List_ID_Objects_Checked);
			Jn("id_attribute").eq(0).val(document.form1.id_pe_courbe.value);
			document.form1.submit();
		}
	});
}
