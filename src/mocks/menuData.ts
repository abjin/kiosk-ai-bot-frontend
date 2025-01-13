export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "클래식 버거",
    price: 8900,
    description: "100% 순쇠고기 패티와 신선한 야채가 어우러진 기본에 충실한 버거",
    image: "https://via.placeholder.com/150",
    category: "버거"
  },
  {
    id: 2,
    name: "치즈 버거",
    price: 9900,
    description: "부드러운 체다치즈가 녹아있는 클래식 버거",
    image: "https://via.placeholder.com/150",
    category: "버거"
  },
  {
    id: 3,
    name: "프렌치 프라이",
    price: 4500,
    description: "바삭하고 고소한 감자튀김",
    image: "https://via.placeholder.com/150",
    category: "사이드"
  },
  {
    id: 4,
    name: "치킨 너겟",
    price: 5500,
    description: "바삭한 치킨 너겟 6조각",
    image: "https://via.placeholder.com/150",
    category: "사이드"
  },
  {
    id: 5,
    name: "콜라",
    price: 2500,
    description: "시원한 콜라",
    image: "https://via.placeholder.com/150",
    category: "음료"
  },
  {
    id: 6,
    name: "레모네이드",
    price: 3500,
    description: "상큼한 레모네이드",
    image: "https://via.placeholder.com/150",
    category: "음료"
  }
];
