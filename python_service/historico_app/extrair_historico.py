import numpy
import re
import PyPDF2
from historico_app import historico_para_json

WARNING = '\033[31m'
RESET = '\033[0m'


class PDFHistoricoService:
    """
    Realiza a análise de históricos PDF e envia para um json.
    Atributos:
        caminho_pdf (str): caminho do histórico
        historico (str): Contém o histórico do aluno
        situacao_keywords (dict): Armazena as keywords da situação do aluno. 
    """
    def __init__(self, caminho_pdf):
        self.caminho_pdf = caminho_pdf
        self.historico = {
            "Aluno": "",
            "Matrícula": "",
            "materias": []
        }
        self.situacao_keywords = [
            "APRM","APR", "CANC", "DISP", "MATRICULADO", "REC",
            "REPMF","REPF", "REP", "TRANCADO", "TRANS", "INCORP", "CUMPRIU"
        ]


    def extrair_texto_pdf(self):
        """
        Extrai o texto do pdf e armazena em "texto_completo"
        Returns:
        texto_completo(str): Contém toda o PDF convertido em string. Requer processamento para formatação devida.
        """
        texto_completo = ""

        try:
            with open(self.caminho_pdf, 'rb') as arquivo:
                leitor_pdf = PyPDF2.PdfReader(arquivo)
                num_paginas = len(leitor_pdf.pages)
                print(f"Total de páginas: {num_paginas}")

                for num_pagina in range(num_paginas):
                    pagina = leitor_pdf.pages[num_pagina]
                    texto_pagina = pagina.extract_text()

                    texto_completo += f"\n--- Página {num_pagina + 1} ---\n"
                    texto_completo += texto_pagina

                print(f"\nTotal de caracteres extraídos: {len(texto_completo)}")

        except FileNotFoundError:
            print(f"erro: Arquivo '{self.caminho_pdf}' não encontrado.")
            return None
        except Exception as e:
            print(f"erro ao processar o pdf: {str(e)}")
            return None

        return texto_completo


    def processar_dados_do_pdf(self, mat):
        """
        Realiza o processamento do cabeçalho
        Args:
            mat (str): Texto contido no PDF.
        Returns:
            l (str): Matriz bidimensional que atrela uma matéria a seu período de início.
            O intuito é organizar a formatação.
        """
        print("\n---------\n")

        matricula_index = re.search(r"Matrícula:\s*(\d+)", mat)
        if matricula_index:
            matricula = matricula_index.group(1)
            print("Matrícula: ", matricula)
        else:
            matricula = "Erro ao obter matrícula"

        nome_index = re.search(r"Nome:\s*(.+)", mat)
        if nome_index:
            nome = nome_index.group(1)
            nome = nome.removesuffix("Dados Pessoais")
            print("Nome: ", nome)
        else:
            nome = "Erro ao obter nome"

        pdf_title = "Componentes Curriculares Cursados/Cursando"
        Mindex = mat.find(pdf_title) + len(pdf_title)
        if Mindex == -1:
            raise ValueError("Cabeçalho não encontrado no texto extraído.")

        mat = mat[Mindex:]
        Mindex = mat.find("Componentes Curriculares Obrigatórios Pendentes")
        mat = mat[:Mindex]

        table_list = re.split(r'(20\d{2}\.\d)', mat)
        print("--------------------------")

        l = numpy.array_split(table_list, len(table_list) / 2)
        l.pop(0)

        self.historico["Aluno"] = nome
        self.historico["Matrícula"] = matricula

        #for i in range(len(l)): # Printa as matérias contidas em l
        #    print(l[i]) 

        return l


    def materias_parser(self, l):
        """
        Faz o parsing individual de cada matéria, organiza no dicionário Historico_Materia e adiciona a lista "materias" da classe.
        Args:
            l (str): Lista de matérias contidas na string.
        Returns:
            l (str): Matriz bidimensional que atrela uma matéria a seu período de início.
            O intuito é organizar a formatação.
        """
        print("\n-----------------------------\n")

        for i in range(len(l)):
            try:
                periodo = str(l[i][0])
                j = re.split(r"\n|\s+--", l[i][1], maxsplit=1)
                materia = j[0]
                materia = materia.removeprefix(" ")
                j = j[1]

                try:
                    j = j.rsplit(")", maxsplit=1)
                    professor = j[0] + ")"
                    j = j[1]
                except:
                    print(WARNING + "Possível erro ao encontrar um professor... Tentando formatação alternativa" + RESET)
                    professor = "N/A"
                    j = j[0]

                try:
                    index = j.rfind("\n")
                    while index != -1:
                        temp = j[index + 1:]
                        if len(j) < 40:
                            j = j[:index] + temp
                        else:
                            j = j[:index]
                        index = j.rfind("\n")
                except:
                    print(WARNING + "Erro ao tentar formatar a String..." + RESET)

                situacao = "N/A"

                try:
                    for kw in self.situacao_keywords:
                        regex = r"\s*".join(list(kw))
                        m = re.search(regex, j)
                        if m:
                            situacao = kw
                            j = re.split(kw, j)
                            turma = j[0]
                            j = j[1]
                            break
                    if situacao == "N/A":
                        print(WARNING + "Erro ao obter situacao!" + RESET)
                except Exception as e:
                    print(WARNING + f"Erro ao obter situacao e/ou turma! ({e})" + RESET)
                    situacao = "situacao não encontrada"
                    turma = "turma não encontrada"

                try:
                    j = j.lstrip()
                    j = j.split(" ")
                    if j[0] == '':
                        j.pop(0)
                    id = j[0]
                    ch = j[1]
                    j.pop(0)
                    j.pop(0)
                except:
                    print(WARNING + "Erro ao tentar obter o ID ou ch." + RESET)
                    id = "ID não encontrado"
                    ch = "ch não encontrado"

                try:
                    if len(j[0]) > 5:
                        j1 = re.split(r'(?<=\d{2},\d)', j[0], maxsplit=1)
                        frequencia = j1[0]
                        media = j1[1]
                    else:
                        frequencia = j[0]
                        media = j[1]
                        j.pop(0)
                    j.pop(0)
                except:
                    print(WARNING + "Erro de frequencia ou formatação" + RESET)
                    frequencia = "frequencia não encontrada"
                    media = "nota não encontrada"

                try:
                    if len(j) == 2:
                        componente = j[0]
                        j.pop(0)
                    else:
                        componente = "N/A"
                    hora_aula = j[0]
                except:
                    print(WARNING + "Erro ao obter componente/hora_aula." + RESET)
                    componente = "componente não encontrada"
                    hora_aula = "Hora/aula não encontrada"

                historico_materia = {
                    "Matéria": materia,
                    "Período": periodo,
                    "Professor": professor,
                    "id": id,
                    "Horas de aula": hora_aula,
                    "CH": ch,
                    "Turma": turma,
                    "Frequência": frequencia,
                    "Média": media,
                    "Situação": situacao,
                    "Componente": componente
                }

                self.historico["materias"].append(historico_materia)

            except:
                historico_materia = WARNING + ("Erro inesperado ao ler os dados. Dados lidos incorretamente:\n" + str(l[i])) + RESET

            print(historico_materia)


    def executar(self):
        """
        Faz a execução passo-a-passo do script e por fim converte o dicionário historico para um json.
        Returns:
            historico (dict): Dicionário contendo o histórico de um aluno.
        """
        mat = self.extrair_texto_pdf()
        if not mat:
            return None

        l = self.processar_dados_do_pdf(mat)
        self.materias_parser(l)

        historico_para_json.converter_historico(self.historico)
        return self.historico



