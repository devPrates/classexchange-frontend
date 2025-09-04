import { create } from "zustand";

type CampusListState = {
  search: string;
  selectedId: string | null;
  setSearch: (v: string) => void;
  setSelectedId: (id: string | null) => void;
};

export const useCampusListStore = create<CampusListState>((set) => ({
  search: "",
  selectedId: null,
  setSearch: (v) => set({ search: v }),
  setSelectedId: (id) => set({ selectedId: id }),
}));
