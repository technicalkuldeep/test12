const API_URL = "http://localhost:5000/api/plans";

export async function getPlans() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return response.json();
}

export async function createPlan(plan: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });

  if (!response.ok) {
    throw new Error("Failed to create plan");
  }

  return response.json();
}

export async function updatePlanApi(id: string, plan: any) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });

  if (!response.ok) {
    throw new Error("Failed to update plan");
  }

  return response.json();
}

export async function deletePlanApi(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete plan");
  }

  return response.json();
}