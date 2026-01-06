import pytest
import re
import numpy
from unittest.mock import patch, MagicMock
from python_service.historico_app.schemas import Materia
from python_service.historico_app import historico_para_json
from python_service.historico_app.extrair_historico import PDFHistoricoService


@pytest.fixture
def service(tmp_path):
    """
    Fixture que instancia o serviço PDFHistoricoService
    utilizando um caminho temporário para um PDF falso.
    """
    caminho = tmp_path / "fake.pdf"
    return PDFHistoricoService(str(caminho))


def test_extrair_texto_pdf_file_not_found(service):
    """
    Testa o comportamento do método extrair_texto_pdf
    quando o arquivo PDF não existe.
    """
    result = service.extrair_texto_pdf()
    assert result is None


def test_extrair_texto_pdf_success(service, tmp_path):
    """
    Testa a extração de texto de um PDF válido utilizando
    mock do PyPDF2.PdfReader.
    """
    fake_pdf = tmp_path / "fake.pdf"
    fake_pdf.write_bytes(b"%PDF-1.4")

    mock_reader = MagicMock()
    mock_reader.pages = [MagicMock()]
    mock_reader.pages[0].extract_text.return_value = "Texto da página"

    with patch("PyPDF2.PdfReader", return_value=mock_reader):
        result = service.extrair_texto_pdf()
        assert "Texto da página" in result
        assert "--- Página 1 ---" in result


def test_processar_dados_do_pdf_success(service):
    """
    Testa o processamento correto dos dados do PDF,
    verificando a extração da matrícula, nome do aluno
    e retorno das matérias.
    """
    texto = """
    Matrícula: 12345
    Nome: João da Silva Dados Pessoais
    Componentes Curriculares Cursados/Cursando
    2022.1Matemática -- Prof X) TURMA1 APR 001 60 100 9,5 COMP 40
    Componentes Curriculares Obrigatórios Pendentes
    """
    result = service.processar_dados_do_pdf(texto)
    assert isinstance(result, list)
    assert service.historico["Aluno"] == "João da Silva"
    assert service.historico["Matrícula"] == "12345"


def test_processar_dados_do_pdf_missing_header(service):
    """
    Testa se o método processar_dados_do_pdf lança ValueError
    quando o texto não contém os cabeçalhos esperados.
    """
    texto = "Matrícula: 123 Nome: Fulano"
    with pytest.raises(ValueError):
        service.processar_dados_do_pdf(texto)


def test_materias_parser_success(service):
    """
    Testa o parser de matérias com uma entrada válida,
    verificando se a matéria é corretamente adicionada
    ao histórico.
    """
    l = [
        ["2022.1", "Matemática -- Prof X) TURMA1 APR 001 60 100 9,5 COMP 40"]
    ]
    service.materias_parser(l)
    assert len(service.historico["materias"]) == 1
    materia = service.historico["materias"][0]
    assert materia["Matéria"] == "Matemática"
    assert materia["Situação"] == "APR"


def test_materias_parser_error(service):
    """
    Testa o parser de matérias com uma entrada malformada,
    garantindo que nenhuma matéria inválida seja adicionada.
    """
    l = [["2022.1", None]]
    service.materias_parser(l)
    assert len(service.historico["materias"]) == 0


def test_executar_success(service):
    """
    Testa o fluxo completo de execução do serviço,
    mockando a extração do PDF e a conversão para JSON.
    """
    texto = """
    Matrícula: 12345
    Nome: João da Silva Dados Pessoais
    Componentes Curriculares Cursados/Cursando
    2023.1 CÁLCULO 3Dr. HILARIO ALENCAR DA SILVA (60h) M APRECOM017 60 100,0 8,0072
    """

    with patch.object(service, "extrair_texto_pdf", return_value=texto):
        with patch.object(historico_para_json, "converter_historico", return_value=None):
            result = service.executar()
            assert result["Aluno"] == "João da Silva"
            assert result["Matrícula"] == "12345"


def test_executar_fail(service):
    """
    Testa o comportamento do método executar quando
    a extração do texto do PDF falha.
    """
    with patch.object(service, "extrair_texto_pdf", return_value=None):
        result = service.executar()
        assert result is None
