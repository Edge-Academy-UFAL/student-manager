caminho_pdf = "python_service/input/historico_d.pdf" #Insira o caminho aqui!
import numpy
import re
import PyPDF2
import historico_para_json
WARNING = '\033[31m'
RESET = '\033[0m'



def extrair_texto_pdf(caminho_pdf):
    """
    Extrai todo o texto de um arquivo PDF
    
    Args:
        caminho_pdf (str): Caminho para o arquivo PDF
    
    Returns:
        str: Texto extraído do PDF
    """
    texto_completo = ""
    
    try:
        with open(caminho_pdf, 'rb') as arquivo:

            # Cria um objeto leitor de PDF
            leitor_pdf = PyPDF2.PdfReader(arquivo)
            
            # Obtém o número total de páginas
            num_paginas = len(leitor_pdf.pages)
            print(f"Total de páginas: {num_paginas}")
            
            # Itera por todas as páginas
            for num_pagina in range(num_paginas):
                pagina = leitor_pdf.pages[num_pagina] # Extrai o texto da página
                texto_pagina = pagina.extract_text()
                
                # Adiciona ao texto completo
                texto_completo += f"\n--- Página {num_pagina + 1} ---\n"
                texto_completo += texto_pagina
            
            print(f"\nTotal de caracteres extraídos: {len(texto_completo)}")
            
    except FileNotFoundError:
        print(f"erro: Arquivo '{caminho_pdf}' não encontrado.")
        return None
    except Exception as e:
        print(f"erro ao processar o pdf: {str(e)}")
        return None
    
    return texto_completo

print ("\n---------\n")
mat = extrair_texto_pdf(caminho_pdf)
matricula_index = re.search(r"Matrícula:\s*(\d+)", mat) # Obtendo a matrícula 
if matricula_index:
    matricula = matricula_index.group(1)
    print("Matrícula: ",matricula)
else:
    matricula = "Erro ao obter matrícula"

nome_index = re.search(r"Nome:\s*(.+)", mat) # Obtendo o nome
if nome_index:
    Nome = nome_index.group(1)
    Nome = Nome.removesuffix("Dados Pessoais")
    print("Nome: ",Nome)
else:
    matricula = "Erro ao obter matrícula"
pdf_title = "Componentes Curriculares Cursados/Cursando"
Mindex = mat.find(pdf_title) + len(pdf_title) # Cortamos o texto até o início do histórico
if Mindex == -1:
    raise ValueError("Cabeçalho não encontrado no texto extraído.")

mat = mat[Mindex:]
Mindex = mat.find("Componentes Curriculares Obrigatórios Pendentes") # Cortamos os componentes curriculares pendentes.
mat = mat[:Mindex]
table_list = re.split(r'(20\d{2}\.\d)',mat)



print("--------------------------")
l = numpy.array_split(table_list, len(table_list)/2)
l.pop(0) #Remove a aba do ENADE.

Histórico = {
    "Aluno":Nome,
    "Matrícula": matricula,
    "materias":[]
}

for i in range(0,len(l)):
    print(l[i])


'''
Aqui armazenamos a lista de palavras-chave para a variável "situacao".
APR, APRM, CANC, DISP, MATR, REC, REP, REPF, REPMF, TRANC, TRANS, INCORP, CUMP
'''

situacao_keywords = ["APRM","APR", "CANC", "DISP", "MATRICULADO", "REC","REPMF","REPF", "REP", "TRANCADO", "TRANS", "INCORP", "CUMPRIU"]


print("\n-----------------------------\n")
for i in range(len(l)):
    try:
        periodo = str(l[i][0])
        j = re.split(r"\n|\s+--",l[i][1],maxsplit= 1)
        materia = j[0]
        materia = materia.removeprefix(" ")
        # Busca o professor.
        j = j[1]
        try:
            j = j.rsplit(")", maxsplit=1)
            professor = j[0] + ")"
            j = j[1]
            j = re.split(r"([\S]{1,2})",j,maxsplit=1)
            turma = j[1]
            j = j[2]
        except:
            print(WARNING + "Possível erro ao encontrar um professor... Tentando formatação alternativa" + RESET)
            professor = "N/A"
            turma = "--"
            j = j[0]

        # Removendo line breaks da string:
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
            print( WARNING + "Erro ao tentar formatar a String..." + RESET)
        # Obtém a situacao da materia:
 
        try:
            situacao = "N/A"
            for k in situacao_keywords:
                if k in j:
                    j = j.split(k)
                    situacao = k
        except:
            print(WARNING + "Erro ao obter situacao!" + RESET)
            situacao = "situacao não encontrada"
        
        # Obtém o ID da materia:

        try:
            j[1] = j[1].split(" ", maxsplit= 3) 
            j = j[1]
            if j[0] == '': #remove os espaços inúteis
                j.pop(0)
            id = j[0]
            ch = j[1]
            j.pop(0)
            j.pop(0)
        except:
            print(WARNING + "Erro ao tentar obter o ID ou ch." + RESET)
            id = "ID não encontrado"
            ch = "ch não encontrado"
        # Obtendo frequencia e realizando a separação de nota x frequencia:
        try:
            if len(j[0]) > 5:
                j = re.split(r'(?<=\d{2},\d)', j[0],maxsplit=1)
            frequencia = j[0]
            j.pop(0)
        except:
            print(WARNING + "Erro de frequencia ou formatação" + RESET)
            frequencia = "frequencia não encontrada"
        # FORMATANDO NOTA:
        try:
            j = j[0].split(" ")
            if j[0] == '': #remove os espaços inúteis
                j.pop(0)
            media = j[0]
        except: 
            print(WARNING + "Erro ao obter medias." + RESET)
            media = "media não encontrada"
        # Obtendo o tipo de componente:
        try:
            if (len(j) == 2):
                j.insert(1,"N/A")
            componente = j[1]
            hora_aula = j[2]
        except:
            print(WARNING + "Erro ao obter componente/hora_aula." + RESET)
            componente = "componente não encontrada"
            hora_aula = "Hora/aula não encontrada"
        Historico_materia = {
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
        Histórico["materias"].append(Historico_materia)
    except:
        Historico_materia = WARNING + ("Erro inesperado ao ler os dados. Dados lidos incorretamente:\n" +  str(l[i])) + RESET
    print(Historico_materia)


historico_para_json.converter_historico(Histórico)