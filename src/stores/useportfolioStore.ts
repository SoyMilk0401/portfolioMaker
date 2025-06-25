import { create } from "zustand";
import type { PortfolioData } from "@/types/portfolio";

const BIN_ID = "684b80a38561e97a502356d1";
const API_KEY = "$2a$10$orPFOczfPJeiWgfIpthaFeT/Z0ZuNtpanIDrNSlzXLy1I0ec2/aA2";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

interface PortfolioState {
  portfolios: PortfolioData[];
  loadAllPortfolios: () => Promise<void>;
  saveAllPortfolios: () => Promise<void>;
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
    const res = await fetch(`${BIN_URL}`, {
      method: 'GET',
      headers: { "X-Master-Key": API_KEY }
    });
    const { record } = await res.json();
    set({ portfolios: record.portfolios || [] });
  },

  saveAllPortfolios: async () => {
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
    const res = await fetch(`${BIN_URL}`, {
      method: 'GET',
      headers: { "X-Master-Key": API_KEY }
    });
    const { record } = await res.json();
    set({ portfolios: record.portfolios || [] });
    set((state) => ({ portfolios: [...state.portfolios, data] }));
    await get().saveAllPortfolios();
  },

  updatePortfolio: async (data) => {
    const res = await fetch(`${BIN_URL}`, {
      method: 'GET',
      headers: { "X-Master-Key": API_KEY }
    });
    const { record } = await res.json();
    set({ portfolios: record.portfolios || [] });
    set((state) => ({
      portfolios: state.portfolios.map((p) =>
        p.id === data.id ? data : p
      )
    }));
    await get().saveAllPortfolios();
  },

  removePortfolio: async (id) => {
    const res = await fetch(`${BIN_URL}`, {
      method: 'GET',
      headers: { "X-Master-Key": API_KEY }
    });
    const { record } = await res.json();
    set({ portfolios: record.portfolios || [] });
    set((state) => ({
      portfolios: state.portfolios.filter((p) => p.id !== id)
    }));
    await get().saveAllPortfolios();
  },

  loading: false,

  setLoading: (loading: boolean) => {
    set({ loading })
  }
}));
