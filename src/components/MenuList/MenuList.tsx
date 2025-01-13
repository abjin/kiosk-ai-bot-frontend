import styled from 'styled-components';
import { MenuItem } from '../../mocks/menuData';

interface MenuListProps {
  items: MenuItem[];
  category: string;
  onAddToCart: (item: MenuItem) => void;
}

const MenuList = ({ items, category, onAddToCart }: MenuListProps) => {
  const filteredItems = items.filter(item => item.category === category);

  return (
    <Container>
      <CategoryTitle>{category}</CategoryTitle>
      <GridContainer>
        {filteredItems.map(item => (
          <MenuCard key={item.id}>
            <MenuImage src={item.image} alt={item.name} />
            <MenuInfo>
              <MenuName>{item.name}</MenuName>
              <MenuDescription>{item.description}</MenuDescription>
              <MenuFooter>
                <MenuPrice>{item.price.toLocaleString()}원</MenuPrice>
                <AddToCartButton onClick={() => onAddToCart(item)}>
                  담기
                </AddToCartButton>
              </MenuFooter>
            </MenuInfo>
          </MenuCard>
        ))}
      </GridContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const MenuCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MenuImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const MenuInfo = styled.div`
  padding: 16px;
`;

const MenuName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
`;

const MenuDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

const MenuFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #2196f3;
  margin: 0;
`;

const AddToCartButton = styled.button`
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1976d2;
  }
`;

export default MenuList;
