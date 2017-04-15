$(document).ready(main);
            var contador = 1;
            function main(){

                $('.agregar').click(function(){                  
                                        
                    if(contador == 2){
                        $('#añadirproducto').animate({
                            right:'-100%'
                        });                 
                        contador = 1;
                    }else if(contador == 1){
                        $('#añadirproducto').animate({
                            right:'0'
                        });
                        $('#editardetalle').animate({
                            right:'-100%'
                        });                        
                        contador = contador+1;
                    }                                 
                });   
                
                $('#editar').click(function(){
                    if(contador == 1){
                        $('#editardetalle').animate({
                            right:'0'
                        });
                        $('#añadirproducto').animate({
                            right:'-100%'
                        });
                    }
                });          
                $('#close').click(function(){
                    if(contador == 1 || contador == 2){
                        $('#añadirproducto').animate({
                            right:'-100%'
                        });
                    }
                });          
                $('#closeB').click(function(){
                    if(contador == 1 || contador == 2){
                        $('#editardetalle').animate({
                            right:'-100%'
                        });
                    }
                });    				
            } 
//------------------------------------------------------------

//Función que detecta si el navegador en firefox utiliza el componente fecha de jquery 1.7.1 
//ya que no reconoce date de html5 o lo reconoce como text
$(function() {
	$fecha=$('#fecha, #fecha2, #fecha3, #fecha4');
	//alert($fecha); //alert($fecha[0].type);
	if ($fecha[0].type!="date"){
		$fecha.datepicker();
	}//$( "#id_of_the_component" ).datepicker({ dateFormat: 'yy-mm-dd'}); 
});

/*Inicio de metodos add, del, seleccionar, reordenar para la tabla Detalle Registro de Productos*/
	var nomProduct = $("#txt_nomProduct").val();
	var umProduct = $("#txt_umProduct").val();
	var cantidadProduct = $("#txt_cantProduct").val();
	var precioProduct = $("#txt_precioProduct").val();
	var totalProduct = cantidadProduct*precioProduct;
	
	var trcopy;
	var editbutton = "bt_edit";
	var deletebutton = "bt_del";
	var updatebutton = "bt_update";
	var cancelbutton = "cancel";
	var table = "tabla_rc7";
	var columns = new Array("t_rc7_cantidadProduct","t_rc7_precioProduct");
	var inputs = ':checked,:selected,:text,textarea,select';
	var inputType = new Array("text","text");
	var editing = 0;
	
	var cancelImage = "../imagen/back.png"
	var updateImage = "../imagen/save.png"
	
	$(function(){	
		$('.bt_add').click(function(){
			obtenerDatos();
			if(nomProduct!=""){	
				//obtenerDatos();
				agregar();
			}else{
				//obtenerDatos();
			}			
		});				
	});
	
	function obtenerDatos(){
		nomProduct = $("#txt_nomProduct").val();
		umProduct = $("#txt_umProduct").val();
		cantidadProduct = $("#txt_cantProduct").val();
		precioProduct = $("#txt_precioProduct").val();
		totalProduct = cantidadProduct*precioProduct;
	}
	
	var cont=0;
	var id_fila_selected=[];	
	function agregar(){	
			cont++;
			var fila='<tr class="selected" id="'+cont+'">'+
					'<td class="t_rc7_cont">'+cont+'</td>'+
					'<td class="t_rc7_nomProduct">'+nomProduct+'</td>'+
					'<td class="t_rc7_umProduct">'+umProduct+'</td>'+
					'<td class="t_rc7_cantidadProduct">'+cantidadProduct+'</td>'+
					'<td class="t_rc7_precioProduct">S/.'+precioProduct+'</td>'+
					'<td class="t_rc7_totalProduct">S/.'+totalProduct+'</td>'+
					'<td><div style="margin-left: 42px;"><a href="javascript:;" class="bt_edit" id="'+cont+'"><img  class="img_icon" src="../imagen/edit.png" title="Editar Producto"></a>'+
						'<a href="javascript:;" class="bt_del" id="'+cont+'"><img class="img_icon" src="../imagen/remove.png" title="Eliminar Producto"></a>'+
						'</div></td></tr>';
			$('#t_rc7').append(fila);
			
			$("#txt_nomProduct").val("");
			$("#txt_umProduct").val("");
			$("#txt_cantProduct").val("");
			$("#txt_precioProduct").val("");/*reordenar();*/					
	}
	/*
	function eliminar(id_fila){
		
		for(var i=0; i<id_fila.length; i++){
			$('#'+id_fila[i]).remove();
		}
		reordenar();
	}*//*$('#'+id_fila).remove(); reordenar();*/

	function reordenar(){
		var num=0;
		$('#t_rc7 tbody tr').each(function(){
			$(this).find('td').eq(0).text(num);
			num++;
		});		
		cont=num;//actualiza el contador
		--cont;
	}
	
	function seleccionar(id_fila){
		id_fila_selected.push(id_fila);
	}

$(document).on("click","."+editbutton,function(){
	var id = $(this).attr("id");
		if(id && editing == 0){			
			var html;
			/*capturo la primera columna de la fila=id*//*html += "<td>"+$("."+table+" tr[id="+id+"] td:first-child").html()+"</td>";*//*html += "<td>"+$("."+table+" tr[id="+id+"] :nth-child(-n+3)").html()+"</td>";*/						
			html += '<td class="t_rc7_cont">'+$("."+table+" tr[id="+id+"] td:eq(0)").html()+"</td>";
			html += '<td class="t_rc7_nomProduct">'+$("."+table+" tr[id="+id+"] td:eq(1)").html()+"</td>";
			html += '<td class="t_rc7_umProduct">'+$("."+table+" tr[id="+id+"] td:eq(2)").html()+"</td>";
			for(i=0;i<columns.length;i++){
				//Buscar el valor dentro del TD y lo coloca como VALUE en el campo de entrada	
				var val = $(document).find("."+table+" tr[id="+id+"] td[class='"+columns[i]+"']").html();
				input = createInput(i,val);
				html +='<td>'+input+'</td>';
			}
			html += '<td class="t_rc7_totalProduct">'+$("."+table+" tr[id="+id+"] td:eq(5)").html()+"</td>";//columnda 6
			html += '<td><div style="margin-left: 42px;"><a href="javascript:;" id="'+id+'" class="'+updatebutton+'"><img class="img_icon" src="'+updateImage+
			'"></a> <a href="javascript:;" id="'+id+'" class="'+cancelbutton+'"><img class="img_icon" src="'+cancelImage+'"></a></div></td>';					
			// Before replacing the TR contents, make a copy so when user clicks on 
			trcopy = $("."+table+" tr[id="+id+"]").html();	
			$("."+table+" tr[id="+id+"]").html(html);
			// set editing flag
			editing = 1;
		}
});

/*inicio Funcion que crea los cajas de texto para ubicarlas en las columnas editables de alguna tabla*/
createInput = function(i,str){
	str = typeof str !== 'undefined' ? str : null;
	if(inputType[i] == "text"){
		input = '<input type="'+inputType[i]+'" name='+columns[i]+' id='+columns[i]+' value="'+str.replace("S/.", "")+'" >';
	}		
	return input;
}
/*fin Funcion que crea los cajas de texto para ubicarlas en las columnas editables de alguna tabla*/

// Save button click on complete row update event
	$(document).on("click","."+updatebutton,function(){
		id = $(this).attr("id");		
		cantidad = $("."+table+" tr[id='"+id+"']").find("#t_rc7_cantidadProduct").val();
		precio = $("."+table+" tr[id='"+id+"']").find("#t_rc7_precioProduct").val();
		total = cantidad*precio;
		$("."+cancelbutton).trigger("click");
		$("tr[id='"+id+"'] td[class=t_rc7_cantidadProduct]").html(cantidad);
		$("tr[id='"+id+"'] td[class=t_rc7_precioProduct]").html("S/."+precio);
		$("tr[id='"+id+"'] td[class=t_rc7_totalProduct]").html("S/."+total);
		
		// clear editing flag
		editing = 0;
	});

/*inicio Funcion que cancela la accion de edición de las celdas de alguna tabla*/
	$(document).on("click","."+cancelbutton,function(){
		var id = $(this).attr("id");
		$("."+table+" tr[id='"+id+"']").html(trcopy);
		editing = 0;
	});
/*fin Funcion que cancela la accion de edición de las celdas de alguna tabla*/

/*inicio Funcion que elimina la fila seleccionada de alguna tabla*/
	$(document).on("click","."+deletebutton,function(){
		var id = $(this).attr("id");//obtiene el valor del id de la celda o fila
		if(id){
			if(confirm("¿Está seguro de eliminar el registro?")){
				$("."+table+" tr[id='"+id+"']").remove();
				reordenar();
			}				
		}
	});
/*fin Funcion que elimina la fila seleccionada de alguna tabla*/

/*inicio Funcion que inicializa el dialog modal*/
$(function() {
    	$('a[rel*=leanModal]').leanModal({ top : 200, closeButton: ".modal_close" });		
});
/*fin Funcion que inicializa el dialog modal*/