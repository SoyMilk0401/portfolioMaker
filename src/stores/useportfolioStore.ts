import { create } from "zustand";
import type { PortfolioData } from "@/types/portfolio";

const API_URL = "http://localhost:3001/portfolios";

interface PortfolioState {
  portfolios: PortfolioData[];
  loadAllPortfolios: () => Promise<void>;
  getPortfolio: (id : string) => PortfolioData | undefined;
  addPortfolio: (data: PortfolioData) => Promise<void>;
  updatePortfolio: (data: PortfolioData) => Promise<void>;
  removePortfolio: (id: string) => Promise<void>;
  loading: boolean,
  setLoading: (loading: boolean) => void,
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],

  loadAllPortfolios: async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      set({ portfolios: data });
    } catch (error) {
      console.error(error);
      set({ portfolios: [] });
    }
  },

  getPortfolio: (id) => {
    return get().portfolios.find((p) => p.id === id);
  },

  addPortfolio: async (data) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add");
      
      const newPortfolio = await res.json();
      
      set((state) => ({ 
        portfolios: [...state.portfolios, newPortfolio] 
      }));
    } catch (error) {
      console.error(error);
    }
  },

  updatePortfolio: async (data) => {
    try {
      const res = await fetch(`${API_URL}/${data.id}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update");
      
      const updatedPortfolio = await res.json();

      set((state) => ({
        portfolios: state.portfolios.map((p) =>
          p.id === data.id ? updatedPortfolio : p
        )
      }));
    } catch (error) {
      console.error(error);
    }
  },

  removePortfolio: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      
      set((state) => ({
        portfolios: state.portfolios.filter((p) => p.id !== id)
      }));
    } catch (error) {
      console.error(error);
    }
  },

  loading: false,

  setLoading: (loading: boolean) => {
    set({ loading })
  }
}));