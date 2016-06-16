// JavaScript Document

function CheckStrongPassword(avalue) {
	test = 'false';		
	new J.ajax({
		url:'../../code/asp/ajax/check_strong_password.asp',
		async: false,
		cache: false,
		data : { avalue : avalue},
		success: function(data) {
			test = data;
		}
	});
	if (test == 'true') {
		J("#pass_ok").val('true');
		J("#new_pass").css('backgroundColor','green');
	} else {
		J("#pass_ok").val('false');
		J("#new_pass").css('backgroundColor','red');
	}
}
	
function CheckPasswordChange(aid_login, AOldPassword, ANewPassword, ANewPasswordConfirm) {
	// on vérifie l'ancien mot de passe
	test = '0';

	// on vérifie le mot de passe fort si besoin
	if ((J('#pass_ok').val() == 'false') || (ANewPassword != ANewPasswordConfirm) || (ANewPassword == '')) {
	    parent.Popup_Alert(RS_JS_Error_New_Password);
		return;
	}

	new J.ajax({
		url:'../../code/asp/ajax/check_password.asp', 
		async: false,
		cache: false,
		dataType:'html',
		data : { avalue : AOldPassword, id_login : aid_login },
		success: function(AData) {
			test = AData;
		}
	});
		
	if (test == '0') {
		parent.Popup_Alert(RS_JS_Old_Password_Incorrect);
		return;
	}	
	
	new J.ajax({
		url:'../../code/asp/ajax/actions_Main_Interface.asp', 
		async: false,
		cache: false,
		dataType:'script',
		data : { 
			sFunction_Name : "Change_Password",
			sNewPassword:ANewPassword
		}
	});
}
	
function Authenticate(ALogin,APassword){
	new J.ajax({
		url:'code/asp/ajax/login.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Authenticate",
			login:ALogin,
			password:APassword
		}
	});
}

function Logout(){
	new J.ajax({
		url:'code/asp/ajax/login.asp',
		async: false,
		cache: false,
		data:{
			sFunction_Name:"Logout"			
		}
	});
}
