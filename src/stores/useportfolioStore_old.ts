// import { create } from "zustand";
// import type { PortfolioData } from "@/types/portfolio";

// const STORAGE_PREFIX = "portfolio-";

// function saveToLocalStorage(data: PortfolioData) {
//   localStorage.setItem(`${STORAGE_PREFIX}${data.id}`, JSON.stringify(data));
// }

// function removeFromLocalStorage(id: string) {
//   localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
// }

// function loadAllPortfolios(): PortfolioData[] {
//   return Object.keys(localStorage)
//     .filter((key) => key.startsWith(STORAGE_PREFIX))
//     .map((key) => {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) as PortfolioData : undefined;
//     })
//     .filter((p): p is PortfolioData => !!p);
// }

// interface PortfolioState {
//   portfolios: PortfolioData[];
//   addPortfolio: (data: PortfolioData) => void;
//   updatePortfolio: (id: string, data: PortfolioData) => void;
//   removePortfolio: (id: string) => void;
//   getPortfolio: (id: string) => PortfolioData | undefined;
//   loadFromStorage: () => void;
// }

// export const usePortfolioStore_old = create<PortfolioState>((set, get) => ({
//   portfolios: loadAllPortfolios(),

//   addPortfolio: (data) => {
//     saveToLocalStorage(data);
//     set((state) => ({
//       portfolios: [...state.portfolios, data],
//     }));
//   },

//   updatePortfolio: (id, data) => {
//     saveToLocalStorage(data);
//     set((state) => ({
//       portfolios: state.portfolios.map((p) =>
//         p.id === id ? { ...data } : p
//       ),
//     }));
//   },

//   removePortfolio: (id) => {
//     removeFromLocalStorage(id);
//     set((state) => ({
//       portfolios: state.portfolios.filter((p) => p.id !== id),
//     }));
//   },

//   getPortfolio: (id) => {
//     return get().portfolios.find((p) => p.id === id);
//   },

//   loadFromStorage: () => {
//     set({ portfolios: loadAllPortfolios() });
//   },
// }));
