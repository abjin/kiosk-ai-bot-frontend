import { useState } from 'react';
import styled from 'styled-components';
import { MenuItem } from '../../mocks/menuData';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: number, change: number) => void;
  onRemoveItem: (itemId: number) => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <CartButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '닫기' : `장바구니 (${totalItems})`}
      </CartButton>

      {isOpen && (
        <CartContainer>
          <CartHeader>
            <h3>장바구니</h3>
          </CartHeader>

          <ItemsContainer>
            {items.length === 0 ? (
              <EmptyCart>장바구니가 비어있습니다</EmptyCart>
            ) : (
              items.map((item) => (
                <CartItemCard key={item.id}>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>{(item.price * item.quantity).toLocaleString()}원</ItemPrice>
                  </ItemInfo>
                  <ItemControls>
                    <QuantityButton onClick={() => onUpdateQuantity(item.id, -1)}>-</QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton onClick={() => onUpdateQuantity(item.id, 1)}>+</QuantityButton>
                    <RemoveButton onClick={() => onRemoveItem(item.id)}>삭제</RemoveButton>
                  </ItemControls>
                </CartItemCard>
              ))
            )}
          </ItemsContainer>

          {items.length > 0 && (
            <CartFooter>
              <TotalAmount>
                총 주문금액: {totalAmount.toLocaleString()}원
              </TotalAmount>
              <OrderButton>주문하기</OrderButton>
            </CartFooter>
          )}
        </CartContainer>
      )}
    </>
  );
};

const CartButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #1976d2;
    transform: translateY(-2px);
  }
`;

const CartContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  padding: 16px;
  background: #2196f3;
  color: white;
  border-radius: 12px 12px 0 0;

  h3 {
    margin: 0;
    font-size: 18px;
  }
`;

const ItemsContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyCart = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;
`;

const CartItemCard = styled.div`
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.span`
  font-weight: 500;
`;

const ItemPrice = styled.span`
  color: #2196f3;
  font-weight: 600;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: #2196f3;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    background: #1976d2;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  margin-left: auto;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #ff5252;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #d32f2f;
  }
`;

const CartFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: right;
  color: #2196f3;
`;

const OrderButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2196f3;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1976d2;
  }
`;

export default Cart;
