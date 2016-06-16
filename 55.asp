 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">  
	<head>      
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />  
		<title>Default portal</title>
		 <script type="text/javaScript" src="./js/lib/jquery.js"></script>
		<script type="text/javascript" src="./js/lib/Math.js"></script>
		<script type = "text/javascript" src="formula.js"> </script>
		<link rel="stylesheet" type="text/css" href="./css/style.css">
	</head>
	<body style="color: rgb(102, 102, 204); background-color: rgb(255, 255, 255);  background-repeat: no-repeat;" alink="#336666" link="#9999ff" vlink="#000099">
	 <div class="" style="text-align:center; "> <h1>TxJsonFormula</h1>
	 	<table >
			   <tbody>
				   <tr>
					   <td>
						  <button type="button" class="button user" id="user">User</button>
					   </td>      
				   </tr>  
				   <tr>      
						    
						<td>
							<button type="button" class="button admin" id="admin">admin</button>
						</td>   
							   
					</tr>    
					<tr>      
						    
						<td>
							<button type="button" class="button cancel" id="cancel">cancel</button>
						</td>   
							   
					</tr>    	
			   </tbody>   
		   </table>	 
	 </div>
	  
	<br><br> 

	   <div class='controls_bar cl_float_left ' id="Formula_container" style="width:100%; height:100%; text-align:center; ">
  
	   </div>
	 
		<script>
			var input_JSON = {
				"name" : "allocatedTime",
				"variables":[
					{
						"name":"cycleTime",
						"value":45,
						"unit": "s",
						"label": "Cycle Time"
					},
					{
						"name":"cycleCount",
						"value": 1,
						"label": "Cyle Count"
					},
					{
						"name":"constant",
						"value":10,
						"unit":""
					},
					{
						"name":"coefficient",
						"value":1.1
					}
				],

				"formula":"((cycleTime*cycleCount) + constant) * coefficient",

				"result": 
					{
						"value":0, 
						"unit":"mn",
						
					},

				"name": "hourly cost",
				"value":15,
				"unit":"euro/hr"
			}


			var formula = new TxFormula(input_JSON);
			$("#user").on('click',function() {

				formula.display("Formula_container");
				debugger;
				formula.calculate();
			 
			});

			$("#cancel").on('click',function() {
				 $("#Formula_container form").remove();
			});

			$("#admin").on('click',function(){
				formula.ParamVar("Formula_container");
			 	
			 
			});
			//formula.parse(input_JSON);
			
			 
			formula.calculate();
			
			

		</script>
		
		<br>
	</body>
</html>