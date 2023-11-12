import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: any }) {
  const params = new URLSearchParams();

  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];
    if (value) {
      params.append(key, value);
    }
  });

  const paramString = params.toString();
  const queryUrl = `http://localhost:3000/api/dados${paramString ? `?${paramString}` : ""}`;

  const response = await axios.post(queryUrl);
  const searchQuery = searchParams.query?.toString().toLowerCase();
  const data = response.data;

  return (
    <div className="w-1/2 mx-auto flex flex-col h-screen p-20">
      <div className="w-full py-10 flex space-x-3">
        <form  className="flex space-x-3" action={`${params ? `?${params}` : "" }`} >
          <Input
            name="termo"
            defaultValue={searchQuery?.toString()}
            type="text"
            placeholder="Filter termo..."
          />
          <Input
            name="uf"
            defaultValue={searchQuery?.toString()}
            type="text"
            placeholder="Filter uf..."
          />
          <Input
            name="municipio"
            defaultValue={searchQuery?.toString()}
            type="text"
            placeholder="Filter municipio..."
          />
          <div className="flex items-center space-x-2">
            <Switch name="somente_matriz" defaultValue={searchQuery?.toString()} />
            <Label>Somente Matriz</Label>
          </div>
          <Button>Filter</Button>
        </form>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                CNPJ
              </th>
              <th scope="col" className="py-3 px-6">
                CNPJ Root
              </th>
              <th scope="col" className="py-3 px-6">
                Branch Number
              </th>
              <th scope="col" className="py-3 px-6">
                Company Name
              </th>
              <th scope="col" className="py-3 px-6">
                Trade Name
              </th>
              <th scope="col" className="py-3 px-6">
                Opening Date
              </th>
              <th scope="col" className="py-3 px-6">
                Registration Status
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Number
              </th>
              <th scope="col" className="py-3 px-6">
                Neighborhood
              </th>
              <th scope="col" className="py-3 px-6">
                City
              </th>
              <th scope="col" className="py-3 px-6">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.cnpj}>
                
                <td className="py-4 px-6"><Link href={`/consultar/detalhes/${item.cnpj}`}>{item.cnpj}</Link></td>
                
                <td className="py-4 px-6">{item.cnpj_raiz}</td>
                <td className="py-4 px-6">{item.filial_numero}</td>
                <td className="py-4 px-6">{item.razao_social}</td>
                <td className="py-4 px-6">{item.nome_fantasia}</td>
                <td className="py-4 px-6">{item.data_abertura}</td>
                <td className="py-4 px-6">{item.situacao_cadastral}</td>
                <td className="py-4 px-6">{item.logradouro}</td>
                <td className="py-4 px-6">{item.numero}</td>
                <td className="py-4 px-6">{item.bairro}</td>
                <td className="py-4 px-6">{item.municipio}</td>
                <td className="py-4 px-6">{item.uf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
