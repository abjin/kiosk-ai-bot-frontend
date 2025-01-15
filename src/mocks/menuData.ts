export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface AIResponse {
  recommendedItems: MenuItem[];
  description: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: '클래식 버거',
    price: 8900,
    description:
      '100% 순쇠고기 패티와 신선한 야채가 어우러진 기본에 충실한 버거',
    image:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fgmeviphoto%2Fgmeviphoto1302%2Fgmeviphoto130200004%2F17847453-%25ED%2596%2584%25EB%25B2%2584%25EA%25B1%25B0.jpg&type=sc960_832',
    category: '버거',
  },
  {
    id: 2,
    name: '치즈 버거',
    price: 9900,
    description: '부드러운 체다치즈가 녹아있는 클래식 버거',
    image:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fgmeviphoto%2Fgmeviphoto1302%2Fgmeviphoto130200004%2F17847453-%25ED%2596%2584%25EB%25B2%2584%25EA%25B1%25B0.jpg&type=sc960_832',
    category: '버거',
  },
  {
    id: 3,
    name: '프렌치 프라이',
    price: 4500,
    description: '바삭하고 고소한 감자튀김',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMDNfMjk1%2FMDAxNzI3OTI4OTA0NzI0.zae8HIzVBEejn3Q__Q-Z0LGdGg61LBCdJQZcVoN15Zwg.pGTGO0aP5Wfm2rV9V_Uu-BLMAZaCunxNca4rtLdyT8Ug.PNG%2Fimage.png&type=sc960_832',
    category: '사이드',
  },
  {
    id: 4,
    name: '치킨 너겟',
    price: 5500,
    description: '바삭한 치킨 너겟 6조각',
    image:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fshop-phinf.pstatic.net%2F20240105_111%2F17044225309291wRdQ_JPEG%2F105558314643017326_2082127128.jpg&type=a340',
    category: '사이드',
  },
  {
    id: 5,
    name: '콜라',
    price: 2500,
    description: '시원한 콜라',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAyMThfOTkg%2FMDAxNjEzNjA3NzMwNzk0.o8zbR-rHQidHOdQdnLYRsE6C4KaQktGWlhRg764Xkzsg.jVPWws_0-H9TBINFlDsNUmBVTDBIQ1v3ThIfmey943Yg.JPEG.sctop1255%2Fpc0030975358_l.jpg&type=a340',
    category: '음료',
  },
  {
    id: 6,
    name: '레모네이드',
    price: 3500,
    description: '상큼한 레모네이드',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140901_290%2Fbongs1021_1409557529875NqFMo_JPEG%2Fh_G106276.JPG&type=a340',
    category: '음료',
  },
];

export const mockResponse: AIResponse = {
  recommendedItems: [
    {
      id: 3,
      name: '프렌치 프라이',
      price: 4500,
      description: '바삭하고 고소한 감자튀김',
      image:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMDNfMjk1%2FMDAxNzI3OTI4OTA0NzI0.zae8HIzVBEejn3Q__Q-Z0LGdGg61LBCdJQZcVoN15Zwg.pGTGO0aP5Wfm2rV9V_Uu-BLMAZaCunxNca4rtLdyT8Ug.PNG%2Fimage.png&type=sc960_832',
      category: '사이드',
    },
    {
      id: 4,
      name: '치킨 너겟',
      price: 5500,
      description: '바삭한 치킨 너겟 6조각',
      image:
        'https://search.pstatic.net/common/?src=https%3A%2F%2Fshop-phinf.pstatic.net%2F20240105_111%2F17044225309291wRdQ_JPEG%2F105558314643017326_2082127128.jpg&type=a340',
      category: '사이드',
    },
  ],
  description:
    '프렌치 프라이는 바삭하고 고소하여 술과 함께 즐기기 좋은 안주입니다. 또한 치킨 너겟은 바삭한 식감이 특징으로, 맥주나 다른 술과 잘 어울리는 대표적인 안주입니다. 이 두 가지 메뉴는 술을 즐길 때 함께하면 매우 만족스러운 조합입니다.',
};
