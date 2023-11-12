export default async function Detalhes({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `http://localhost:3000/api/detalhes/${params.slug}`,
    {}
  );

  const data = await res.json();

  console.log(data);
  return (
    <div className="w-1/2 mx-auto flex flex-col h-screen p-20 bg-gray-100">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <label className="text-gray-500">Razão Social</label>
          <p>{data.razao_social}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">CNPJ</label>
          <p>{data.cnpj}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">CEP</label>
          <p>{data.cep}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Logradouro</label>
          <p>{data.logradouro}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Bairro</label>
          <p>{data.bairro}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Município</label>
          <p>{data.municipio}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">UF</label>
          <p>{data.uf}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">DDD</label>
          <p>{data.ddd}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Telefone</label>
          <p>{data.telefone}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">E-mail</label>
          <p>{data.email}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Capital Social</label>
          <p>{data.capital_social}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Situação Cadastral</label>
          <p>{data.situacao_cadastral}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Data Situação Cadastral</label>
          <p>{data.data_situacao_cadastral}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Data Situação Especial</label>
          <p>{data.data_situacao_especial}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">Descrição Porte</label>
          <p>{data.descricao_porte}</p>
        </div>
      </div>
    </div>
  );
}
