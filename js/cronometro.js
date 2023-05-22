/**
*     
* PPA em Rede - ES
*
* Scripts para implementar o cronômetro a ser utilizado na plenária
* da audiência presencial
*
* This script is applied to the
* structure and the main components
* about PPA em Rede - ES
*
* @project PPA em Rede - ES
* @version 1.0 22-04-2015
* @since 1.0
* @author Vagner Cordeiro <vagner.cordeiro@planejamento.es.gov.br>
* @license http://opensource.org/licenses/gpl-license.php GNU Public License
*
*/

$(function () {
    
    var hmsFinal;
    var cronoHandle;
    var restantems;
    var piscando = 0;
    var $tempo = $('#tempo');
    var blinkPhase = 800;
	var alerta01 = 30 * 1000;
	var alerta02 = 10 * 1000;
	var baseTime = new Date("2013-09-14T00:00:00");
    
    function getFinalTime(min, sec){
        // Calcular hora final
        var agora = new Date();
        var final = new Date(
                    agora.getTime()
                +   (min * 60 * 1000)
                +   (sec * 1000)
        );
        return final;
    }

    function avancarCronometro(){
        restantems = hmsFinal.getTime() - new Date().getTime();
        $tempo.val($.format.date(new Date(baseTime.getTime() + restantems) , 'mm:ss'));
        if (restantems < 1000)
        {
            $tempo.val($.format.date(baseTime , 'mm:ss'));
            $tempo.css('backgroundColor','#e73279');
            $tempo.css('color','#ffffff');
            clearInterval(cronoHandle);
            $('#divStopButton').hide();
            return;
        }
        if (restantems > alerta01)
        {
            $tempo.css('color','#2a8fbd');
        }
        else if (restantems > alerta02)
		{
            $tempo.css('color','#ffa500');
		}
		else
        {
			$tempo.css('color','#e73279');
        }
    }
    
    function iniciarCronometro() {
        $tempo.css('backgroundColor','#ffffff');
        $('#divStopButton').show();
        var tempoMin = $('#ctrtempomin').val();
        var tempoSec = $('#ctrtemposec').val();
        clearInterval(cronoHandle);
        hmsFinal = getFinalTime(parseInt(tempoMin), parseInt(tempoSec));
		restantems = hmsFinal.getTime() - new Date().getTime();
        $tempo.val($.format.date(new Date(baseTime.getTime() + restantems) , 'mm:ss'));
        cronoHandle = setInterval(avancarCronometro,1000);
        $('#divContinueButton').hide();
        if (piscando)
        {
            $tempo.piscar();
        }
    };

    function pararCronometro() {
        
        clearInterval(cronoHandle);
        restantems = hmsFinal.getTime() - new Date().getTime();
        $tempo.piscar();
        $('#divStopButton').hide();
        $('#divContinueButton').show();
        
    };
    
    function continuarCronometro() {
        var agora = new Date();
        $tempo.piscar();
        hmsFinal = new Date(agora.getTime() + restantems);
        cronoHandle = setInterval(avancarCronometro,1000);
        $('#divContinueButton').hide();
        $('#divStopButton').show();
    };
    
	function ocultarControles() {
		$(".linha-ctrl-tempo").hide();
	};
	
	function exibirControles() {
		$(".linha-ctrl-tempo").show();
	};
		
    $.fn.piscar = function() {
        if (piscando)
        {
            clearInterval(piscando);
            piscando = 0;
            $(this).show();
        }
        else
        {
            piscando = setInterval(function() {
                $tempo.fadeOut(blinkPhase, function(){
                    $tempo.fadeIn(blinkPhase);
                });
            },blinkPhase * 2.5);
        }
    };
    
	
    
	
    $('#startButton').click(iniciarCronometro);
    $('#stopButton').click(pararCronometro);
    $('#continueButton').click(continuarCronometro);
    $('.input-ctrl-tempo').change(function(){
        var valor = parseInt($(this).val());
        if (valor < 10)
        {
            $(this).val('0' + valor);
        }
        /*
		if (valor > 59)
        {
            $(this).val(59);
        }
        */
    });
	
	$("body").mouseleave(function(){ocultarControles();});
	$("body").mouseover(function(){exibirControles();});
	
	});
	