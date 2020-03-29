$('#req-get').click(function (e) { 
    let uri = $('#form-data').val();
    let param = $('#form-params').val();
    $('#status').text('Evento: Carregando...');
    $.get(uri, param, function (data, status, xhr) {
        $('.api-content-result > pre > code').text(data);
        $('#caracter').text('Caracteres: '+data.length);
        $('#phrases').text('Palavras: '+data.replace(/(\r\n|\n|\r)/g, ' ').trim().split(/ /g).length);
        $('#status').text('Evento: Completo');
    }).fail(function(er) {
        $('.api-content-result > pre > code').text('Erro: '+er.status);
        $('#status').text('Evento: '+er.status);
    });
});

$('#req-post').click(function (e) { 
    let uri = $('#form-data').val();
    let param = $('#form-params').val();
    $('#status').text('Evento: Carregando...');
    $.post(uri, param,function (data, status, xhr) {
        $('.api-content-result > pre>  code').text(data);
        $('#caracter').text('Caracteres: '+data.length);
        $('#phrases').text('Palavras: '+data.replace(/(\r\n|\n|\r)/g, ' ').trim().split(/ /g).length);
        $('#status').text('Evento: Completo');
    }).fail(function(er) {
        $('.api-content-result > pre > code').text('Erro: '+er.status);
        $('#status').text('Evento: '+er.status);
    });
});

$('#remove-space').click(function (e) { 
    let data = $('.api-content-result').text();
    data = data.replace(/ /g, '');
    $('.api-content-result > pre > code').text(data);
    $('#caracter').text('Caracteres: '+data.length);
    $('#phrases').text('Palavras: '+data.replace(/(\r\n|\n|\r)/g, ' ').trim().split(/ /g).length);
    $('#status').text('Evento: Espaços removidos');
});

$('#remove-row').click(function (e) { 
    let data = $('.api-content-result').text();
    data = data.replace(/(\r\n|\n|\r)/gm, '');
    $('.api-content-result > pre > code').text(data);
    $('#caracter').text('Caracteres: '+data.length);
    $('#phrases').text('Palavras: '+data.replace(/(\r\n|\n|\r)/g, ' ').trim().split(/ /g).length);
    $('#status').text('Evento: Quebras de linha removidas');
});


$('#decode-c').click(function (e) { 
    let data = $('.api-content-result').text();
    data = decodeURIComponent(data);
    $('.api-content-result > pre > code').text(data);
    $('#caracter').text('Caracteres: '+data.length);
    $('#phrases').text('Palavras: '+data.replace(/(\r\n|\n|\r)/g, ' ').trim().split(/ /g).length);
    $('#status').text('Evento: Decodificado com sucesso');
});

$(window).on('error', function (e) {
    $('#status').text('Evento: '+e.originalEvent.message);
});

let expand = true;
let expressionT = '';
let dataContent = null;
let isLoop = false;
let fullM = null;
let newValues = '';

$('#search').click(function (e) {
    if (expand === true) {

        $('#status').text('Evento: Regulares ativo');

        $('.api-content-search-result').css('height', '100%');
        $('.divider').show('fast');

        // Configura o valor da expressão
        dataContent = $('#search-b').val();
        if(dataContent === '') {
            dataContent = null;
        }

        // Armazena o valor da expressão
        expressionT = dataContent;

        // Configura variavel de repetição
        isLoop = true;

        expand = false;
    }else {

        $('#status').text('Evento: Regulares inativo');

        $('.api-content-search-result').css('height', '0%');
        $('.divider').hide('fast');

        // Configura variavel de repetição
        isLoop = false;
        expand = true;
    }
});

$('#search-b').hover(function () {
    // Configura variavel de repetição
    isLoop = false;
    $('#status').text('Evento: Criando expressão regular');
}, function () {
    // Configura variavel de repetição
    $('#status').text('Evento: Aplicando expressão regular');
    isLoop = true;
});

function matchResult(expression) {
    
    // Atualiza localmente a expressão
    let refreshExpressionT = $('#search-b').val();
    if (refreshExpressionT === '') {
        refreshExpressionT = null;
    }

    // Configura globalmente a expressão
    expressionT = refreshExpressionT;

    // Recupera o conteúdo a ser analizado
    let data = $('.api-content-result').text();

    if(isLoop === true) {

        // Aplica a procura
        expression = new RegExp(expression, 'g');
        data = data.match(expression);

        if(data !== null) {

            $('#matches').text('Matches: '+data.length);

            $.each(data, function (indexInArray, valueOfElement) { 
                newValues = data[indexInArray]+"\n"+newValues;
            });
    
            $('.api-content-search-result > .result-s > pre > code').text(newValues);
            newValues = '';
    
            isLoop = false;

            $('#status').text('Evento: Expressão aplicada');

        }else {
            $('.api-content-search-result > .result-s > pre > code').text('[NULL] Não resolvido');
            isLoop = false;

            $('#status').text('Evento: Expressão regular nula');
            $('#matches').text('Matches: 0');

        }

    }

    setTimeout(function() {
        matchResult(expressionT);
    }, 1000);

} matchResult(expressionT);

