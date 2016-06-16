function select_valeur_cmb(obj1, obj2) {
	J(obj1).html(J(obj2).html());
	ID_TE_cmb = J(obj2).attr("ident");
	J('#div_treeviewE').html(RS_JS_Chargement + ' ...');
	J('#div_treeviewPE').html(RS_JS_Chargement + ' ...');
  
  // Chargement du nouveau treeviewE
	new J.ajax({
		url:'../asp/ajax/load_treeview_object_export.asp',
		async: false,
		cache:false,
		dataType:'html',
		data:{ 
			id_te: ID_TE_cmb, 
			type_vue : 3 
		},
		success:function(data){
			J("#div_treeviewE").html(data);
		}
	});
	
	document.form1.id_te.value = ID_TE_cmb;
	document.form1.id_tree.value = Jn('id_tree_lien_te_'+ID_TE_cmb).eq(0).val();
  
  // Chargement du nouveau treeviewPE	
	new J.ajax({
		url:'../asp/ajax/actions_Treeview.asp',
		async: false,
		cache:false,
		dataType:'html',
		data:{ 
			sFunction_Name :"Get_HTML_TreeviewPEAPI",
			id_te: ID_TE_cmb  
		},
		success:function(data){
				J("#div_treeviewPE").html(data);
			}
	});
	
}

function Exporter() {
	J("#id_div_waiting_message").css("display","block");
	J("#id_div_refresh_export").css("display","none");
	Jn("iIndex").eq(0).val(J("#select_export_type option:selected").attr("iIndex"));
	Jn("id_export").eq(0).val(J("#select_export_type option:selected").attr("id"));
	Jn("zipped").eq(0).val(J("#id_cb_export").is(':checked'));
	document.form1.submit();
}

