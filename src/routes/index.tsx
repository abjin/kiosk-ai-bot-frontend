import { useState } from 'react';
import styled from 'styled-components';
import { menuItems, MenuItem } from '../mocks/menuData';
import MenuList from '../components/MenuList/MenuList';
import ChatBot from '../components/ChatBot/ChatBot';
import Cart from '../components/Cart/Cart';

interface CartItem extends MenuItem {
  quantity: number;
}

const categories = Array.from(new Set(menuItems.map((item) => item.category)));

function Routes() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === menuItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: number, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <Container>
      <Header>
        <Title>🍔 Kiosk AI Bot 🍔</Title>
      </Header>

      <CategoryNav>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            selected={category === selectedCategory}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryNav>

      <Main>
        <MenuList
          items={menuItems}
          category={selectedCategory}
          onAddToCart={addToCart}
        />
      </Main>

      <ChatBot onAddToCart={addToCart} />
      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: max-content;
  min-height: 100vh;
  background-color: #1a1a1a;
`;

const Header = styled.header`
  background-color: #424242;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`;

const CategoryNav = styled.nav`
  display: flex;
  gap: 12px;
  padding: 20px;
  background: #2d2d2d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 2px;
  }
`;

const CategoryButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: ${(props) => (props.selected ? '#424242' : '#2d2d2d')};
  color: ${(props) => (props.selected ? '#e0e0e0' : '#9e9e9e')};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${(props) => (props.selected ? '#4a4a4a' : '#363636')};
    color: #e0e0e0;
  }
`;

const Main = styled.main`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 40px;
`;

export default Routes;
