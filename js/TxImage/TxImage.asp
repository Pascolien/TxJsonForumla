<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="margin-left: 5px;">
<head>
	<link rel="stylesheet" type="text/css" href="css/aspimage.css" />
	<link rel="stylesheet" type="text/css" href="css/styleImage.css" />

	<link rel="stylesheet" type="text/css" href="/resources/theme/css/common.css"/>
	<link rel="stylesheet" type="text/css" href="/resources/theme/css/dhtmlx/tabbar/dhtmlxtabbar.css"/>
	
	<script type="text/javascript" src="/code/js/dhtmlx/dhtmlxcommon.js"></script>
	<script type="text/javascript" src="/code/js/dhtmlx/tabbar/dhtmlxtabbar.js"></script>
	
	<script type="text/javascript" src="/code/js/TxImage/langs/<%=Session("Langue")%>.js"></script>
	<script type="text/javascript" src="js/TxImage.js"></script>
	<script type="text/javascript" src="/code/js/lib/jquery.js"></script>
	

	<% IF Session("Langue") = "fr" THEN %>
		<!-- #include virtual="/code/js/TxImage/langs/fr.asp" -->
	<% ELSE %>	
		<!-- #include virtual="/code/js/TxImage/langs/en.asp" -->
	<% END IF %>

	<script type="text/javascript" src="/code/js/framework_bassetti.js"></script>	
	
	<script type="text/javascript">
	var J = jQuery.noConflict();
	var dhxTabbar,dhxForm,formData;
	</script>
</head>

	<body OnLoad=" LoadImgInformation(); Int_Tabs();">


	<form action="#"> 
		<div id="a_tabbar"  style="width:735px; height: 10000px;" >
			<div class="panel_wrapper">
				<div id="a1" name="Général"> 	
					<div id="leftfield">
						<fieldset style="width: 350px;">
							<legend><%=RS_general%></legend>
							<iframe src="upload.asp" id="upload" frameborder="0"></iframe>							
							<table style="margin-left: 20px; margin-top : -10px; font-family : Tahoma, Verdana, Arial, Helvetica, sans-serif, monospace; font-size : 11px; " class="properties">
								<tr>
									<td class="column1" align="right"><label id="srclabel" for="src"><%=RS_src%></label></td>
									<td colspan="2">
										<table border="0" cellspacing="0" cellpadding="0">
											<tr> 
												<td>
												<!--[if !IE]><!--><input style="height : 10px;" name="src" type="src" id="src" value="" class="mceFocus cl_input_insertImage"  disabled="true" onchange="showPreviewImage(this.value);" style="width: 167px;" /><!--<![endif]-->
											   <!--[if IE]><input name="src" type="src" id="src" value="" class="mceFocus"  disabled="true" onchange="showPreviewImage(this.value);" style="" /><![endif]-->
												</td> 
												<td id="srcbrowsercontainer">&nbsp;</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr> 
									<td class="column1" align="right"><label id="altlabel" for="alt"><%=RS_alt%></label></td> 
									<td colspan="2"><input class="cl_input_insertImage" style="height : 10px;" id="alt" name="alt" type="text" value="" /></td> 
								</tr> 
								<tr> 
									<td class="column1" align="right"><label id="titlelabel" for="title"><%=RS_title%></label></td> 
									<td colspan="2"><input style="height : 10px;" class="cl_input_insertImage" id="title" name="title" type="text" value="" /></td> 
								</tr>	
							</table>
						</fieldset>
						<fieldset style=" height: 230px; width: 350px ; padding-bottom: 20px;">
								<legend><%=RS_preview%></legend>
								<div  ; id="prev" style="margin-left: 5px; width : 335px; height : 200px; margin-right : 5px;" ></div>
						</fieldset>
						<div id="rightfield" >
							<fieldset   id="imagelist" class="imagelist" style = "width: 310px; height: 381px">
								<legend><%=RS_image_list%></legend>
								<iframe src="file_browser.asp" name="fileWindow" id="fileWindow" frameborder="0" style="margin-top : -15px"></iframe>
							</fieldset>	
						</div>												
					</div>
					</br>
	 			</div>
			</div>
		</div>
				
		<div id="a2" name="Avancé" style="width:850px;">
			<fieldset style="width: 780px; margin-left : 20px">
				<legend><%=RS_tab_appearance%></legend>
				<table style ="font-family : Tahoma, Verdana, Arial, Helvetica, sans-serif, monospace; font-size : 11px;" border="0" cellpadding="4" cellspacing="0">
					<tr> 
						<td class="column1"><label id="alignlabel" for="align"><%=RS_align%></label></td> 
						<td><select id="align" name="align" onchange="changeappearance()"> 
								<option value=""><%=RS_not_set%></option> 
								<option value="baseline"><%=RS_align_baseline%></option>
								<option value="top"><%=RS_align_top%></option>
								<option value="middle"><%=RS_align_middle%></option>
								<option value="bottom"><%=RS_align_bottom%></option>
								<option value="left"><%=RS_align_left%></option>
								<option value="right"><%=RS_align_right%></option>
							</select> 
						</td>
						<td style="width: 520px;" rowspan="6" valign="top">
							<div  style = "border : 1px solid ;  border-color: grey margin-left: 5px ; padding-left: 5px;padding-top: 5px;padding-right: 5px;padding-bottom: 5px;">
								<img align="" id="myImg"  src="img/sample.gif" alt="The Pulpit Rock" width="45px" height="45px" hspace="20">
								<p style="display : inline;">Lorem ipsum, Dolor sit amet, consectetuer adipiscing loreum ipsum edipiscing elit, sed diam
								nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum, Dolor sit amet, consectetuer adipiscing loreum ipsum edipiscing elit, sed diam
								nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
							</div>
						</td>
					</tr>
					<tr>
						<td class="column1"><label id="widthlabel" for="width"><%=RS_dimensions%></label></td>
						<td nowrap="nowrap">
							<input name="width" type="text" id="w" value="" size="5" maxlength="5" class="size" onchange="changeHeight();" /> x 
							<input name="height" type="text" id="h" value="" size="5" maxlength="5" class="size" onchange="changeWidth();" /> px
							<input name="" type="hidden" id="w_hidden" value="" onchange="ReturnTrueWidth();" />  
							<input name="" type="hidden" id="h_hidden" value="" onchange="ReturnTrueHeight();" />  
						</td>
					</tr>
					<tr>
						<td class="column1"><input id="constrain" type="checkbox"  style="float:right;" name="constrain" class="checkbox" checked /></td>
						<td><label id="constrainlabel" for="constrain"><%=RS_constrain_proportions%></label></td>	
					</tr>
				</table>
			</fieldset>
			</br>
		</div>
	
		<div id="a3" name="Image Cliquable">
			<fieldset style="width: 780px;">
				<legend><%=RS_add_link%></legend>
				<table border="0" cellpadding="4" cellspacing="0">
					<input type="checkbox" name="add_link" value="allow">Ajouter un lien 
					<tr>
						<td></td>
					</tr>
					<tr> 
						<td align="right" class="column1"><label id="alignlabel" for="align"><%=RS_link_type%></label></td> 
						<td><select style="width : 670px" id="align" name="align" onchange="updated(this)"> 
								<option value="internal_link"><%=RS_internal_link%></option>				
								<option value="external_link" ><%=RS_external_link%></option> 
							</select> 
						</td>
					 </tr>
					 <tr>
						<td></td>
					</tr>
					<tr>
						<td></td>
					</tr>
					<table id="intern" style = "border:1px solid #CCCCD4; display:block; border: 1px solid #CCCCD4;padding-left: 70px;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;margin-left: 100px;width: 590px;" cellpadding="4" cellspacing="0">
						<tr>
							<td align="right" class="nowrap"><label id="titlelabel" for="entityText"><%=RS_title%></label></td>
							<td>
								<input id="entityText" name="entityText" style="width:275px;" type="text" value="" />
								<img title="" src="/resources/theme/img/btn_form/16x16_false.png" onclick="J('#entityText').val('')" style="cursor:pointer;"/>
							</td>
						</tr>
						<tr>
							<td align="right" class="nowrap"><label id="hreflabel" for="filterObject"><%=RS_filterObject%></label></td>
							<td>
								<table border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td><div id="TXPlugin_combobox" style="width:250px;"></div></td>
										<td id="hrefbrowsercontainer">&nbsp;</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td align="right" class="nowrap"><label id="aze" for="selectObject"><%=RS_selectObject%></label></td>
							<td>
								<div id="TXPlugin_treebox">
									<div id="TXPlugin_tree" style=""></div>
									<div id="TXPlugin_toolbar" style=""></div>
								</div>
								<div id="TXPlugin_treebox_linear">
									<div id="TXPlugin_tree_linear" style=""></div>
									<div id="TXPlugin_toolbar_linear" style=""></div>
								</div>
							</td>
						</tr>
					</table>
					<table id="extern" style = "border:1px solid #CCCCD4; display:none; border: 1px solid #CCCCD4;padding-left: 70px;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;margin-left: 100px;width: 590px;" cellpadding="4" cellspacing="0">
						<tr>
							<td align="right" class="nowrap"><label id="titlelabel" for="entityText"><%=RS_title%></label></td>
							<td>
								<input id="title" name="title" style="width:275px;" type="text" value="" />
								<img title="" src="/resources/theme/img/btn_form/16x16_false.png" onclick="J('#title').val('')" style="cursor:pointer;"/>
							</td>
						</tr>
						<tr>
							<td align="right" class="nowrap"><label id="titlelabel" for="entityText"><%=RS_URL%></label></td>
							<td>
								<input id="extern_link" name="URL" style="width:275px;" type="text" value="http://" />
								<img title="" src="/resources/theme/img/btn_form/16x16_false.png" onclick="J('#URL').val('')" style="cursor:pointer;"/>
							</td>
						</tr>
					</table>
				</table>
			</fieldset>
		</div> 
    </form>
	
	<div class="mceActionPanel" id="formdhx" style="float:right">
		<input id="ID_Object" type="hidden" />
		<table id="table" style="margin-right: 9px;">
			<tr>
				<td>
					<input id="ID_Object" type="hidden" />
					<input class="cl_btn_action" type="button" id="insert" name="insert" value="<%=RS_insert%>" style="display:block;" onclick=" Insert();return false;"/>
				</td>
				<td>
					<input  class="cl_btn_action"  type="button" id="cancel" name="cancel" value="<%=RS_cancel%>" style="display:block;" onclick="CloseTinyPop();return false;"/>
				</td>
			</tr>
		</table>
	</div>
	
</body> 
</html> 
