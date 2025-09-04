import { create } from "zustand";

type CursoListState = {
  search: string;
  selectedId: string | null;
  setSearch: (v: string) => void;
  setSelectedId: (id: string | null) => void;
};

export const useCursoListStore = create<CursoListState>((set) => ({
  search: "",
  selectedId: null,
  setSearch: (v) => set({ search: v }),
  setSelectedId: (id) => set({ selectedId: id }),
}));