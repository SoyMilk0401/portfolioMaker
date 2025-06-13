import { create } from "zustand";
import type { PortfolioData } from "@/types/portfolio";

const BIN_ID = "684b80a38561e97a502356d1";
const API_KEY = "$2a$10$orPFOczfPJeiWgfIpthaFeT/Z0ZuNtpanIDrNSlzXLy1I0ec2/aA2";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

interface PortfolioState {
  portfolios: PortfolioData[];
  loadAll: () => Promise<void>;
  saveAll: () => Promise<void>;
  getPortfolio: (id : string) => PortfolioData | undefined;
  addPortfolio: (data: PortfolioData) => Promise<void>;
  updatePortfolio: (data: PortfolioData) => Promise<void>;
  removePortfolio: (id: string) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],

  loadAll: async () => {
    const res = await fetch(`${BIN_URL}`, {
      headers: { "X-Master-Key": API_KEY }
    });
    const { record } = await res.json();
    set({ portfolios: record.portfolios || [] });
  },

  saveAll: async () => {
    const portfolios = get().portfolios;
    await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY
      },
      body: JSON.stringify({ portfolios })
    });
  },

  getPortfolio: (id) => {
    return get().portfolios.find((p) => p.id === id);
  },

  addPortfolio: async (data) => {
    set((state) => ({ portfolios: [...state.portfolios, data] }));
    await get().saveAll();
  },

  updatePortfolio: async (data) => {
    set((state) => ({
      portfolios: state.portfolios.map((p) =>
        p.id === data.id ? data : p
      )
    }));
    await get().saveAll();
  },

  removePortfolio: async (id) => {
    set((state) => ({
      portfolios: state.portfolios.filter((p) => p.id !== id)
    }));
    await get().saveAll();
  },
}));
