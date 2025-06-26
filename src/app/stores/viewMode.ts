import { create } from 'zustand';

type ViewMode = 'grid' | 'table';

interface ViewStore {
  view: ViewMode;
  setView: (view: ViewMode) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  view: 'grid',
  setView: (view) => set({ view }),
}));