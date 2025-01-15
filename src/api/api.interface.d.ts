interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface GetAiCompletionsResponse {
  recommendedItems: MenuItem[];
  description: string;
}
