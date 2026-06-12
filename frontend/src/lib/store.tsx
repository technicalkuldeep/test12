import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Plan } from "./mock-data";
import { useLocalStorage } from "@/hooks/use-local-storage";

import {
  getPlans,
  createPlan,
  updatePlanApi,
  deletePlanApi,
} from "./api";

type StoreCtx = {
  plans: Plan[];

  addPlan: (p: Omit<Plan, "id">) => Promise<void>;

  updatePlan: (
    id: string,
    p: Partial<Plan>
  ) => Promise<void>;

  deletePlan: (id: string) => Promise<void>;

  compare: string[];

  toggleCompare: (id: string) => void;

  clearCompare: () => void;

  recentlyViewed: string[];

  pushRecent: (id: string) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plans, setPlans] = useState<Plan[]>([]);

  const [compare, setCompare] =
    useLocalStorage<string[]>(
      "gs:compare",
      []
    );

  const [recentlyViewed, setRecent] =
    useLocalStorage<string[]>(
      "gs:recent",
      []
    );

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await getPlans();

      setPlans(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPlan = useCallback(
    async (p: Omit<Plan, "id">) => {
      try {
        const created = await createPlan(p);

        setPlans((prev) => [
          created,
          ...prev,
        ]);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const updatePlan = useCallback(
    async (
      id: string,
      p: Partial<Plan>
    ) => {
      try {
        const updated =
          await updatePlanApi(id, p);

        setPlans((prev) =>
          prev.map((x) =>
            x.id === id ? updated : x
          )
        );
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const deletePlan = useCallback(
    async (id: string) => {
      try {
        await deletePlanApi(id);

        setPlans((prev) =>
          prev.filter((x) => x.id !== id)
        );
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const toggleCompare = useCallback(
    (id: string) =>
      setCompare((prev) =>
        prev.includes(id)
          ? prev.filter(
              (x) => x !== id
            )
          : prev.length >= 4
          ? prev
          : [...prev, id]
      ),
    [setCompare]
  );

  const clearCompare = useCallback(
    () => setCompare([]),
    [setCompare]
  );

  const pushRecent = useCallback(
    (id: string) =>
      setRecent((prev) =>
        [
          id,
          ...prev.filter(
            (x) => x !== id
          ),
        ].slice(0, 6)
      ),
    [setRecent]
  );

  const value = useMemo(
    () => ({
      plans,
      addPlan,
      updatePlan,
      deletePlan,
      compare,
      toggleCompare,
      clearCompare,
      recentlyViewed,
      pushRecent,
    }),
    [
      plans,
      addPlan,
      updatePlan,
      deletePlan,
      compare,
      toggleCompare,
      clearCompare,
      recentlyViewed,
      pushRecent,
    ]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error(
      "useStore must be used within StoreProvider"
    );
  }

  return ctx;
}