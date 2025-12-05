import { create } from "zustand";
import type { PortfolioData } from "@/types/portfolio";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "http://localhost:8080/api/portfolios";

interface PortfolioState {
  portfolios: PortfolioData[];
  myPortfolios: PortfolioData[];
  loadAllPortfolios: () => Promise<void>;
  loadMyPortfolios: () => Promise<void>;
  getPortfolio: (id: string) => PortfolioData | undefined;
  addPortfolio: (data: PortfolioData) => Promise<string | number>;
  updatePortfolio: (data: PortfolioData) => Promise<void>;
  removePortfolio: (id: string) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  myPortfolios: [],
  loading: false,

  setLoading: (loading: boolean) => set({ loading }),

  loadAllPortfolios: async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("데이터 로딩 실패");
      const data = await res.json();
      set({ portfolios: data });
    } catch (error) {
      console.error(error);
      set({ portfolios: [] });
    }
  },

  loadMyPortfolios: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/my`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("내 포트폴리오 로딩 실패");
      const data = await res.json();
      set({ myPortfolios: data });
    } catch (error) {
      console.error(error);
      set({ myPortfolios: [] });
    }
  },

  getPortfolio: (id) => {
    return get().portfolios.find((p) => String(p.id) === id) || 
           get().myPortfolios.find((p) => String(p.id) === id);
  },

  addPortfolio: async (data) => {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("로그인이 필요합니다.");

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("생성 실패");
    
    const newId = await res.json(); 
    await get().loadAllPortfolios();
    await get().loadMyPortfolios();
    return newId;
  },

  updatePortfolio: async (data) => {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("로그인이 필요합니다.");

    const res = await fetch(`${BASE_URL}/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("수정 실패");
    await get().loadAllPortfolios();
    await get().loadMyPortfolios();
  },

  removePortfolio: async (id) => {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error("로그인이 필요합니다.");

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { 
        "Authorization": `Bearer ${token}` 
      },
    });

    if (!res.ok) throw new Error("삭제 실패");
    await get().loadAllPortfolios();
    await get().loadMyPortfolios();
  },
}));