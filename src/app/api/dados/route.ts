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

      for (let page = 1; page <= 9; page++) { 
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
                    "lte": null,
                    "gte": null
                },
                "capital_social": {
                    "lte": null,
                    "gte": null
                }
            },
            "extras": {
                "somente_mei": false,
                "excluir_mei": false,
                "com_email": false,
                "incluir_atividade_secundaria": false,
                "com_contato_telefonico": false,
                "somente_fixo": false,
                "somente_celular": false,
                "somente_matriz": false,
                "somente_filial": false
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
            break;
          }
      }
      
    //   console.log(data.length);
      return Response.json(data);
    }
