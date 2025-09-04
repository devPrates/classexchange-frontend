"use client";

import { useCampusListStore } from "@/store/campus-store";
import { useCampusQuery } from "@/hooks/use-campus";

export default function ProfessoresPage() {
  const search = useCampusListStore((s) => s.search);
  const setSearch = useCampusListStore((s) => s.setSearch);
  const selectedId = useCampusListStore((s) => s.selectedId);
  const setSelectedId = useCampusListStore((s) => s.setSelectedId);

  const { data, isLoading, isError, refetch } = useCampusQuery();

  if (isLoading) return <p>Carregando…</p>;
  if (isError) return (
    <p>
      Falha ao carregar.{" "}
      <button onClick={() => refetch()}>Tentar novamente</button>
    </p>
  );

  const list = (data ?? []).filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-4">
      <header className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome…"
          className="border rounded px-3 py-2 w-full max-w-sm"
        />
      </header>

      <ul className="divide-y rounded border">
        {list.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between p-3 cursor-pointer"
            onClick={() => setSelectedId(p.id === selectedId ? null : p.id)}
          >
            <div className="flex flex-col">
              <span className="font-medium">{p.nome}</span>
              <span className="text-sm opacity-70">
                {p.email}
              </span>
            </div>

            {selectedId === p.id && (
              <span className="text-xs px-2 py-1 border rounded">
                selecionado
              </span>
            )}
          </li>
        ))}

        {list.length === 0 && (
          <li className="p-3 text-sm opacity-70">
            Nenhum professor encontrado.
          </li>
        )}
      </ul>
    </section>
  );
}
