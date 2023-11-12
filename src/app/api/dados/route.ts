import { NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    const data = [];
    const { searchParams } = new URL(req.url)
    const termo = searchParams.get('termo')
    const atividade_principal = searchParams.get('atividade_principal')
    const natureza_juridica = searchParams.get('natureza_juridica')
    const uf = searchParams.get('uf')
    const municipio = searchParams.get('municipio')
    const bairro = searchParams.get('bairro')
    const cep = searchParams.get('cep')
    const ddd = searchParams.get('ddd')
    const lteD = searchParams.get('lteD')
    const gteD = searchParams.get('gteD')
    const lteC = searchParams.get('lteC')
    const gteC = searchParams.get('gteC')
    const somente_mei = searchParams.get('somente_mei')
    const somente_matriz = searchParams.get('somente_matriz')
    const excluir_mei = searchParams.get('excluir_mei')
    const com_email = searchParams.get('com_email')
    const incluir_atividade_secundaria = searchParams.get('incluir_atividade_secundaria')
    const com_contato_telefonico = searchParams.get('com_contato_telefonico')
    const somente_fixo = searchParams.get('somente_fixo')
    const somente_celular = searchParams.get('somente_celular')
    const somente_filial = searchParams.get('somente_filial')
    




    let page = 1;
    let hasData = true;

      for (let page = 1; page <= 10 && hasData; page++) { 
        const res = await fetch('https://cnpj.rafaelfranco.com', {
          next: { revalidate: 60 },
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "query": {
                "termo": termo ? [termo] : [],
                "atividade_principal": 
                  atividade_principal ? [atividade_principal] : []
                ,
                "natureza_juridica": 
                  natureza_juridica ? [natureza_juridica] : []
                ,
                "uf": 
                  uf ? [uf] : []
                ,
                "municipio": 
                  municipio ? [municipio] : []
                ,
                "bairro": 
                  bairro ? [bairro] : []
                ,
                "situacao_cadastral": "ATIVA",
                "cep": 
                  cep ? [cep] : []
                ,
                "ddd": 
                  ddd ? [ddd] : []
                
            },
            "range_query": {
                "data_abertura": {
                    "lte": lteD ? lteD : null,
                    "gte": gteD ? gteD : null
                },
                "capital_social": {
                    "lte": lteC ? lteC : null,
                    "gte": gteC ? gteC : null
                }
            },
            "extras": {
                "somente_mei": somente_mei ? true : false,
                "excluir_mei": excluir_mei ? true : false,
                "com_email":  com_email ? true : false,
                "incluir_atividade_secundaria": incluir_atividade_secundaria ? true : false,
                "com_contato_telefonico": com_contato_telefonico ? true : false,
                "somente_fixo": somente_fixo ? true : false,
                "somente_celular": somente_celular ? true : false,
                "somente_matriz": somente_matriz ? true : false,
                "somente_filial": somente_filial ? true : false
            },
            "page": page
          }),
        });      
        const pageData = await res.json();

        if (pageData.data && pageData.data.cnpj) {
            // console.log(`Page ${page}:`, pageData.data.cnpj);
            data.push(...pageData.data.cnpj);
        } else {
            // console.log(`No CNPJs found or end of data reached at page: ${page}`);
            hasData = false;

            break;
          }
      }
      
    //   console.log(data.length);
      return Response.json(data);
    }
