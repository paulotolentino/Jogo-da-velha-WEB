var rodada = 1;
var matriz = Array(3);
var nome1;
var nome2;

matriz['a'] = Array(3);
matriz['b'] = Array(3);
matriz['c'] = Array(3);

matriz['a'][1] = 0;
matriz['a'][2] = 0;
matriz['a'][3] = 0;

matriz['b'][1] = 0;
matriz['b'][2] = 0;
matriz['b'][3] = 0;

matriz['c'][1] = 0;
matriz['c'][2] = 0;
matriz['c'][3] = 0;

$(document).ready( function(){
	$('#btn-iniciar-jogo').click( function(){
		if ($('#nome1').val() == '') {
			alert('Apelido do jogador 1 não foi preenchido');
			return false;
		}
		if ($('#nome2').val() == '') {
			alert('Apelido do jogador 2 não foi preenchido');
			return false;
		}
		nome1 = $('#nome1').val()
		nome2 = $('#nome2').val()
		$('#nome_jogador1').html(nome1);
		$('#nome_jogador2').html(nome2);

		$('#palco_jogo').show();
		$('#pagina_inicial').hide();

	});

	$('#jogar-novamente').click( function(){
		location.reload();
	});

	$('.jogada').click( function(){
		var id = this.id;
		jogada(id);
	});

	function jogada(id_click){
		var icone = '';
		var ponto = '';

		if (rodada % 2 == 1) {
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		}else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;			
		}

		$('#'+id_click).css('background-image', icone);

		var linha_coluna = id_click.split('-');
		matriz[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica();		

		rodada++;
	}

	function verifica() {
		var pontos = 0;
		for (var i = 1; i <= 3; i++) {
			pontos += matriz['a'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 1; i <= 3; i++) {
			pontos += matriz['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 1; i <= 3; i++) {
			pontos += matriz['c'][i];
		}
		ganhador(pontos);

		for (var l = 1; l <= 3; l++) {

			pontos = 0;
			pontos += matriz['a'][l];
			pontos += matriz['b'][l];
			pontos += matriz['c'][l];
			ganhador(pontos);
		}

		pontos = 0;
		pontos = matriz['a'][1] + matriz['b'][2] + matriz['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz['c'][1] + matriz['b'][2] + matriz['a'][3];
		ganhador(pontos);

	}

	function ganhador(pontos) {
		if (pontos == -3) {
			alert(nome1 + ' ganhou!');
			$('.jogada').off();
		} else if (pontos == 3) {
			alert(nome2 + ' ganhou!');
			$('.jogada').off();
		}
	}
});